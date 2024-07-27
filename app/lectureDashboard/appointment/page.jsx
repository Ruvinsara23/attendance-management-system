"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import AppointmentCard from '@/components/appointmentCard/appointmentCard'
import { fetchAppointment,updateAppointmentStatus } from '@/app/services/studentFirestoreService'
import { useState,useEffect } from 'react'
import ApointmentFormLec from '@/components/appointmentFormLec/apointmentFormLec'
import { useUserContext } from '@/app/context/userContext'



const  lecAppoinment = () => {
  const [appointments,setAppointments]=useState([])
  const {currentUser}=useUserContext()

  const fetchAndSetappointments = async () => {
    const appointmentsData = await fetchAppointment({userId:currentUser.userID,userRole:'lecturerId'});
    setAppointments(appointmentsData);
    console.log(appointmentsData )
  };

  const updateStatus = async (appointmentID, newStatus) => {
    await updateAppointmentStatus({ appointmentID, status: newStatus });
    fetchAndSetappointments();  
  };

  useEffect(()=>{
    
    fetchAndSetappointments()

   },[])


  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold mb-6">Appointment Management</h1>
    <section className="mb-8 ">
      <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {appointments.filter(appointment=>appointment.status==='pending'||appointment.status==='confirm').map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} updateStatus={updateStatus}  />
      ))}
       
      </div>
    </section>
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Appointment History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {appointments.filter(appointment=>appointment.status==='cancel'||appointment.status==='complete').map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} showActions={false}/>
      ))}  
      </div>
    </section>
    <section>
    <ApointmentFormLec currentUser={currentUser}  onAppointmentCreated={fetchAndSetappointments}/>
    </section>
  </div>
  )
}

export default  lecAppoinment
