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



const  lecAppoinment = () => {
  const [appointments,setAppointments]=useState([])

  const fetchAndSetappointments = async () => {
    const appointmentsData = await fetchAppointment();
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
    <section className="mb-8">
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
      <h2 className="text-2xl font-bold mb-4">Create New Appointment</h2>
      <Card>
        <CardContent className="p-4">
          <form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="student">Student</Label>
                <Select id="student">
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    <SelectItem value="michael-johnson">Michael Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select id="subject">
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Math</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input type="date" id="date" />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input type="time" id="time" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Create Appointment</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  </div>
  )
}

export default  lecAppoinment
