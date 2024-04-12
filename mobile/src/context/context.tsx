import { ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { MessageProps, UserProps } from "./intefaces";
import { baseAuth, getChatsList, getMenssagesList, testConnection } from "./api";
import { useToast } from '@gluestack-ui/themed';
import { MyToast } from '../components/Toast'
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PropsChat{
  chatId:string
  content: MessageProps[]
}

interface PropsContext{
  userData: UserProps|null
  chatList: PropsChat[]
  handleAuthContext:(type: "login"|"register"|"delete",data: UserProps)=> void
  getChatData: ()=> void
  logout: ()=> void
}

// @ts-ignore
export const ContextArea= createContext<PropsContext>({})

export function ContextProvider({children}:{children:ReactNode}) {
  const [userData, setUserData] = useState<UserProps|null>(null)
  const [chatList, setChatList] = useState<PropsChat[]|null>()

  const toast = useToast()

  async function handleAuthContext(type: "login"|"register"|"delete",data: UserProps){
    try {
      const method = {
        login: "get",
        register: "post",
        delete: "delete"
      }

      const url = type === "login" ? `${baseAuth[type]}/${data.password}/${data.email}` : baseAuth[type]
      
      // @ts-ignore
      await axios[method[type]](url, type === "login" ? null : data)
      .then(async (res: { data: SetStateAction<UserProps | null>; })=>{
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

  function logout() {
    setUserData(null)
    AsyncStorage.removeItem('@userData')
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
  
  async function getStorageUser() {
    const jsonValue = await AsyncStorage.getItem('@userData')
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
      getChatData,
      logout
    }}>
      {children}
    </ContextArea.Provider>
  );
}