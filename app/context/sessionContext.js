import { useContext, createContext,useState } from "react";

const SessionsContext =createContext({
    currentSessions:null,
    setCurrentSessions:()=>null
})

export const SessionProvider =({children})=>{
 
  const [currentSessions, setCurrentSessions] = useState(null);
         const value={currentSessions,setCurrentSessions}
    return (
        <SessionsContext.Provider value={value}>{children}</SessionsContext.Provider>
    )
}

export const useSessionsContext=()=>{

    return useContext(SessionsContext )
    
}