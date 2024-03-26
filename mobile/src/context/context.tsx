import { createContext, useEffect, useState } from "react";
import { MessageProps, UserProps } from "./intefaces";
import { getChatsList, getMenssagesList, handleAuthApi, testConnection } from "./api";

export const ContextArea= createContext({})

interface ChatProps{
  chatId:string
  content: MessageProps[]
}

export function ContextProvider({children}:any) {
  const [userData, setUserData] = useState<UserProps|null>(null)
  const [chatList, setChatList] = useState<ChatProps[]>([])

  async function handleAuthContext(type: "login"|"register"|"delete",data: UserProps){
    if (type === "login"){
      const res = await handleAuthApi(type, data)
      setUserData(res)
    }
    if (type === "register"){
      await handleAuthApi(type, data)
      const res = await handleAuthApi("login", data)
      setUserData(res)
    }
    if (type === "delete"){
      await handleAuthApi(type, data)
      setUserData(null)
    }
  }

  useEffect(() => {
    testConnection()
    if (userData !== null) {
      async function getChatData() {
        const chatIds = await getChatsList(userData.id);
        const chatDataPromises = chatIds.map(async (chatId: string) => {
          const messages = await getMenssagesList(chatId);
          return { chatId, messages };
        });
        const chatData = await Promise.all(chatDataPromises);
        setChatList([...chatList,chatData]);
        
      }
      getChatData()
    }
  },[])

  return (
    <ContextArea.Provider value={{
      userData,
      handleAuthContext
    }}>
      {children}
    </ContextArea.Provider>
  );
}