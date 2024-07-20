"use client"
import React from 'react'
import AttendanceTable from '@/components/attendanceTable/attendanceTable'
import DashboardCard from '@/components/dashbordCard/dashboardCard'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import AddData from '@/components/addData/addData'
import { fetchAttendance } from '../services/lectureFirestoreService'
import { useState,useEffect } from 'react'
import Link from "next/link"
import {Activity,ArrowUpRight,CircleUser,UserPlus,UserX,Menu,Package2,Search,GraduationCap,} from "lucide-react"
import {Avatar,AvatarFallback,AvatarImage,
  } from "@/components/ui/avatar"
  import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardHeader,CardTitle,
  } from "@/components/ui/card"
import { AdminBarChart } from '@/components/adminchart/adminBarchart'

import { getUserCounts } from '../services/adminFirestoreService'



// const cardData = [
//   {
//     "Cardtitile": "Total Present",
//     "Cardcontent": 0,
//     "Cardsubtext": "In today sessions",
//     bgColor: "bg-[#86EFAC]"
   
//   },
//   {
//     "Cardtitile": "Total Absent",
//     "Cardcontent":0,
//     "Cardsubtext": "In today sessions",
//    bgColor: "bg-[#FCD34D]", // Background color class
//     textColor: "text-white" 

//   },
//   {
//     "Cardtitile": "Upcoming Session",
//     "Cardcontent": "ICT-211",
//     "Cardsubtext": "2024-07-4 10:00 AM",
//     bgColor: "bg-[#93C5FD]", // Background color class
//     textColor: "text-white" 
//   },
//   {
//     "Cardtitile": "Number of Upcoming sessions Appointments",
//     "Cardcontent": "3",
//     "Cardsubtext": "Overview of Appointments",
//     bgColor: "bg-[#B270EC]", // Background color class
//     textColor: "text-white" 
//   }
// ];

const page = () => {
  const [cardData, setCardData] = useState([
    {
      "Cardtitile": "Total Students",
      "Cardcontent": 0,
      "Cardsubtext": "In today sessions",
      bgColor: "bg-[#86EFAC]"
    },
    {
      "Cardtitile": "Total Lecturers",
      "Cardcontent": 0,
      "Cardsubtext": "In today sessions",
      bgColor: "bg-[#FCD34D]"
    },
    {
      "Cardtitile": "Total Admins",
      "Cardcontent": 0,
      "Cardsubtext": "In today sessions",
      bgColor: "bg-[#93C5FD]"
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedCardData = await getUserCounts();
        setCardData(updatedCardData);
      } catch (error) {
        console.error('Error fetching user counts:', error);
      }
    };

    fetchData();
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col">
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">

    <DashboardCard cardData={cardData} />
  
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        
         <AdminBarChart />
          
        <div className="grid gap-6">
        <Card className="w-full max-w-[530px]">
          <CardHeader>
            <CardTitle>Upcoming Appointment</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
             
            </div>
          
          </CardContent>
        </Card>
        <Card className="w-full max-w-[530px]">
          <CardHeader>
            <CardTitle>New Session</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
     
          </CardContent>
        </Card>
        <AddData />
      </div>
      </div>
    </main>
  </div>
  )

}

export default page
