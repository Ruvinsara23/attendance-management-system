"use client"

import React from 'react'
import { useState,useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import SessionCreateCard from '@/components/sessionCreateCard/sessionCreateCard'
import DisplayCard from '@/components/displayCard/displayCard'
import { collection, getDocs,query,where } from 'firebase/firestore';
import { db } from '@/utils/firebase/firebaseUtils'
import { ScrollArea,ScrollBar } from '@/components/ui/scroll-area'
import { useUserContext } from '@/app/context/userContext'
import { fetchSessions,fetchSessionsHistory } from '@/app/services/lectureFirestoreService'
import { useSessionsContext } from '@/app/context/sessionContext'



const  Sessions = () => {
    const [sessions, setSessions] = useState([]);
 
    const {currentUser}=useUserContext()
    const {currentSessions, setCurrentSessions}=useSessionsContext()



    
    const fetchAndSetSessions = async () => {
      const sessionsData = await fetchSessions({lecturerId:currentUser.userID});
      setSessions(sessionsData);
    };




    useEffect(() => {



    
      if (currentUser) {
        fetchAndSetSessions();
      
      }
    }, [currentUser,currentSessions]);
      
      // const fetchSessions = async () => {
      //   const sessionQuery=query(collection(db,'sessions'),
      //     where('lecturerId','==',currentUser.userID) )

      //   const querySnapshot = await getDocs( sessionQuery);
  
      //   const sessionsData = [];
      //   querySnapshot.forEach((doc) => {
      //     sessionsData.push({ id: doc.id, ...doc.data() });
      //   });
  
      //   setSessions(sessionsData);
      // };

   

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold mb-6">Session Management</h1>
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Upcoming Sessions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      
      {sessions.filter(session => session.status === true).map(session => (
        <DisplayCard key={session.id} session={session} className="mr-4" onStatusUpdate={fetchAndSetSessions}  />
      ))}
      </div>


    </section>
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Session History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sessions.filter(session => session.status === false).map(session => (
        <DisplayCard key={session.id} session={session} showActions={false} className="mr-4" />
      ))}
      </div>
    </section>
    <section>
      <h2 className="text-2xl font-bold mb-4">Create New Session</h2>
     <SessionCreateCard />
    </section>

    
  </div>
  )
}

export default  Sessions;
// 