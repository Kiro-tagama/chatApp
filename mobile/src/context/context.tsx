import { createContext, useEffect, useState } from "react";
import { MessageProps, UserProps } from "./intefaces";
import { getChatsList, getMenssagesList, testConnection } from "./api";
import { useToast } from '@gluestack-ui/themed';
import { MyToast } from '../components/Toast'
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ContextArea= createContext({})

interface ChatProps{
  chatId:string
  content: MessageProps[]
}

export function ContextProvider({children}:any) {
  const [userData, setUserData] = useState<UserProps|null>(null)
  const [chatList, setChatList] = useState<ChatProps[]>([])

  const toast = useToast()

  async function handleAuthContext(type: "login"|"register"|"delete",data: UserProps){
    const baseUrl = "https://improved-space-funicular-grw6qxq6pqg3wpgr-3000.app.github.dev/"
    const baseAuth = {
      login: baseUrl + "auth/login",        //get 
      register: baseUrl + "auth/register",  //post
      delete: baseUrl + "auth/deleteUser",  //delete
    }

    try {
      const method = {
        login: "get",
        register: "post",
        delete: "delete"
      }

      const url = type === "login" ? `${baseAuth[type]}/${data.password}/${data.email}` : baseAuth[type]
      
      // @ts-ignore
      await axios[method[type]](url, type === "login" ? null : data)
      .then(async res=>{
        if (type === "login") {
          const jsonData =JSON.stringify(res.data)
          await AsyncStorage.setItem('@userData', jsonData);
          setUserData(res.data)
        }
        if (type === "register") await handleAuthContext("login", data)
        if (type === "delete") {
          setUserData(null)
          await AsyncStorage.removeItem('@userData')
        }
      })
      .catch((err: { response: { data: { message: string; }; }; })=>{
        toast.show({
          placement: "top",
          render: ({ id }) => <MyToast id={id} type="error" message={err.response.data.message} />
        })
      });
  
    } catch (err) {
      return console.log(err)
    }
  }

  async function getChatData() {
    const chatIds = await getChatsList(userData?.id);
    const chatDataPromises = chatIds.map(async (chatId: string) => {
      const messages = await getMenssagesList(chatId);
      return { chatId, messages };
    });
    const chatData = await Promise.all(chatDataPromises);
    setChatList([...chatList,chatData]);
  }
  
  async function getStorageUser(params:type) {
    const jsonValue = await AsyncStorage.getItem('@userData')
    console.log(jsonValue);
    
    return setUserData(jsonValue != null ? JSON.parse(jsonValue) : null)
  }

  useEffect(() => {
    getStorageUser()
    testConnection()
    if (userData !== null) {
      getChatData()
    }
  },[])

  return (
    <ContextArea.Provider value={{
      userData,chatList,
      handleAuthContext,
      getChatData
    }}>
      {children}
    </ContextArea.Provider>
  );
}