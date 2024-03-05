import { createContext } from "react";

const ContextArea= createContext({})

export function ContextProvider({children}:any) {
  
  return (
    <ContextArea.Provider value={{}}>
      {children}
    </ContextArea.Provider>
  );
}