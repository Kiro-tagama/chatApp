import { createContext, useState } from "react";
import { UserProps } from "./intefaces";
import { handleAuthApi } from "./api";

export const ContextArea= createContext({})

export function ContextProvider({children}:any) {
  const [userData, setUserData] = useState<UserProps|null>(null)

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

  
  return (
    <ContextArea.Provider value={{
      userData,
      handleAuthContext
    }}>
      {children}
    </ContextArea.Provider>
  );
}