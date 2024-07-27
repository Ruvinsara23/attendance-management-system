"use client"
 import AppointmentForm  from "@/components/appointmentForm/appointmentForm";
import AppointmentCard from "@/components/appointmentCard/appointmentCard";

import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react";
import { fetchAppointment,updateAppointmentStatus,getLecturers } from "@/app/services/studentFirestoreService";
import AppointmentCardTest from "@/components/appointmentCard/testAppointmentCard";
import { useUserContext } from "@/app/context/userContext";



const StdAppointmentPage = () => {
   const [appointments,setAppointments]=useState([])
   const {currentUser}=useUserContext()

   const userId=currentUser.userID



   const fetchAndSetappointments = async () => {
    const appointmentsData = await fetchAppointment({userId,userRole:'studentId'});
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
  <h2 className="text-2xl font-semibold  text-[#374151] mb-4">Upcoming Appointment</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 
  
  {appointments.filter(appointment=>appointment.status==='pending'||appointment.status==='accept').map((appointment) => (
    <AppointmentCard key={appointment.id} appointment={appointment} updateStatus={updateStatus} isStudent={false} />
    
  ))}
   </div>


 </section>

 <section className="mb-8">
  <h2 className="text-2xl font-semibold  text-[#374151]  mb-4"> Appointment History</h2>
  
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 content-end gap-4">
 {appointments.filter(appointment=>appointment.status==='cancel'||appointment.status==='complete').map((appointment) => (
  <AppointmentCard key={appointment.id} appointment={appointment} showActions={false} isStudent={false}/>
))}
   
</div>
 
 
 </section>
      
      <section>
        <h2 className="text-2xl font-semibold  text-[#374151]  mb-4">Create New Appointment</h2>
       <AppointmentForm  onAppointmentCreated={fetchAndSetappointments } currentUser={currentUser} />
      </section>
    </div>


    );
  };
  
  export default StdAppointmentPage;
  

  // {appointments.map((appointment) => (
  //   <AppointmentCard key={appointment.id} appointment={appointment} />
  // ))}
 
//   <section className="mb-8">
//   <h2 className="text-2xl font-bold mb-4">Upcoming Appointment</h2>

//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 
  
//   </div>


// </section>
// <section className="mb-8">
//   <h2 className="text-2xl font-bold mb-4">AppointmentHistory</h2>
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//   <AppointmentCard />
//   </div>
// </section>

// {appointments.filter(appointment=>appointment.status==='pending'||appointment.status==='accept').map((appointment) => (
//   <AppointmentCard key={appointment.id} appointment={appointment} updateStatus={updateStatus} isStudent={false} />
  
// ))}