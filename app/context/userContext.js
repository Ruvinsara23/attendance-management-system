"use client"
import { useContext, createContext,useState,useEffect } from "react";
import { onAuthStateChangedListner } from "@/utils/firebase/firebaseUtils";
import { logout } from "@/utils/firebase/firebaseUtils";
import { auth } from "@/utils/firebase/firebaseUtils";
import { useRouter } from "next/navigation";
const UserContext =createContext({
    currentUser:null,
    setCurrentUser:()=>null,
    signOut: () => Promise.resolve(),
})

export const UserProvider =({children})=>{
    const [currentUser,setCurrentUser]=useState(null)
    const router=useRouter()
         const value={currentUser,setCurrentUser}
         
         
         useEffect(()=>{
            const unsubscribe=  onAuthStateChangedListner((user)=>{
              setCurrentUser(user)
            })
              
            return () => unsubscribe()
          },[])   

          const signOut = async () => {
            try {
              router.push('/login');
              await logout(auth);
               
              setCurrentUser(null);// Redirect to login page after logout
            } catch (error) {
              console.error('Error logging out:', error);
            }
          };
    return (
        
        <UserContext.Provider value={{setCurrentUser, currentUser,signOut}}>{children}</UserContext.Provider>
    )
}



export const useUserContext=()=>{

    return useContext(UserContext )
    
}