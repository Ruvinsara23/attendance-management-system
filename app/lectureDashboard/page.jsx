"use client"
import React from 'react'
import Link from "next/link"
import {Activity,ArrowUpRight,CircleUser,UserPlus,UserX,Menu,Package2,Search,GraduationCap,} from "lucide-react"
import {Avatar,AvatarFallback,AvatarImage,
  } from "@/components/ui/avatar"
  import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardHeader,CardTitle,
  } from "@/components/ui/card"
  import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import CalendarIn from '@/components/calender/calender'
  import AttendanceTable from '@/components/attendanceTable/attendanceTable'
import DashboardCard from '@/components/dashbordCard/dashboardCard'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import AddData from '@/components/addData/addData'
import { fetchAttendance } from '../services/lectureFirestoreService'
import { useState,useEffect } from 'react'


const exampleData = [
  {
    studentName: 'Emily Johnson',
    subjectCode: 'ICT-201-1',
    attendanceStatus: 'Present',
    dateTime: '2024-06-21 10:00 AM',
  },
  {
    studentName: 'Michael Johnson',
    subjectCode: 'ICT-201-1',
    attendanceStatus: 'Absent',
    dateTime: '2024-06-21 11:00 AM',
  },
  {
    studentName: 'Michael Smith',
    subjectCode: 'ICT-201-1',
    attendanceStatus: 'Present',
    dateTime: '2024-06-22 09:00 AM',
  },
  {
    studentName: 'Sophia Williams',
    subjectCode: 'ICT-201-1',
    attendanceStatus: 'Present',
    dateTime: '2024-06-22 10:00 AM',
  },
  {
    studentName: 'Olivia Davis',
    subjectCode: 'ICT-201-1',
    attendanceStatus: 'Absent',
    dateTime: '2024-06-23 01:00 PM',
  },
  {
    studentName: 'Benjamin Miller',
    subjectCode: 'ICT-201-1',
    attendanceStatus: 'Present',
    dateTime: '2024-06-23 02:00 PM',
  },
];

const cardData = [
  {
    "Cardtitile": "Total Present",
    "Cardcontent": 0,
    "Cardsubtext": "In today sessions",
    icon:"UserRoundPlus",
    bgColor: "bg-[#86EFAC]", // Background color class
    textColor: "text-white"
  },
  {
    "Cardtitile": "Total Absent",
    "Cardcontent":0,
    "Cardsubtext": "In today sessions",
    icon:"UserRoundMinus",
    bgColor: "bg-[#FCD34D]", // Background color class
    textColor: "text-white"
  },
  {
    "Cardtitile": "Upcoming Session",
    "Cardcontent": "ICT-211",
    "Cardsubtext": "2024-07-4 10:00 AM",
    icon:"CalendarPlus",
    bgColor: "bg-[#93C5FD]", // Background color class
    textColor: "text-white"
  },
  {
    "Cardtitile": "Number of Upcoming sessions Appointments",
    "Cardcontent": "3",
    "Cardsubtext": "Overview of Appointments",
    icon:"CalendarCheck2",
    bgColor: "bg-[#B270EC]", // Background color class
    textColor: "text-white"
  }
];

const attendanceData = [
  { attendance: { "student1": false, "student2": true }, courseID: "course1" },
  { attendance: { "student3": true, "student4": false }, courseID: "course2" },
  { attendance: { "student5": true, "student6": true }, courseID: "course3" }
];


  


const LectureDashboard = () => {
 const [attendanceData,setAttendanceData  ]=useState([])
 const [counts, setCounts] = useState({ totalCount: 0, absentCount: 0 });
//  const [testAttendanceData,settestAttendanceData ]=useState([testAttendanceData])


 const fetchAndSetAttendance=async()=>{
  const attendanceData=await  fetchAttendance()
  setAttendanceData(attendanceData)
  console.log(attendanceData,"attendance")

  };

  
const calculateAttendanceCounts=async()=>{
    let totalCount = 0;
    let absentCount = 0;
  const attendanceData=await fetchAttendance()
 
  console.log(attendanceData,"attendance")
  //  [
  //   { attendance: { "student1": false, "student2": true }, courseID: "course1" },
  //   { attendance: { "student3": true, "student4": false }, courseID: "course2" },
  //   { attendance: { "student5": true, "student6": true }, courseID: "course3" }
  // ];
  
  // 

  attendanceData.forEach(entry => {
  
      const { attendance } = entry; {
            Object.values(attendance).forEach(attendanceValue => {
                if (attendanceValue===true) {
                  totalCount++;
                } else {
                  absentCount++;
                }
            });
        
          }
    });

   
    console.log(absentCount,"ab")
    return { absentCount, totalCount };
}

const updateCardData = async () => {
  const { totalCount, absentCount } = await calculateAttendanceCounts();
  cardData[0].Cardcontent = totalCount;
  cardData[1].Cardcontent = absentCount;
  console.log(cardData, "after add");
};



 useEffect(()=>{
  
  fetchAndSetAttendance()
  updateCardData()
 
;

 },[counts])

  return (
    <div className="flex min-h-screen w-full flex-col">
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">

    <DashboardCard counts={counts} cardData={cardData} />
  
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card
          className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
        >
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Attendance</CardTitle>
              <CardDescription>
                Today attendance form your classes.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="#">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
          <AttendanceTable attendanceData={attendanceData}/>
          </CardContent>
        </Card>
        <div className="grid gap-6">
        <Card className="w-full max-w-[530px] rounded-[16px] ">
          <CardHeader>
            <CardTitle>Upcoming Appointment And Sessions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <CalendarIn />
          </CardContent>
        </Card>
      </div>
      </div>
    </main>
  </div>
  )
}

export default LectureDashboard 
// <Card x-chunk="dashboard-01-chunk-5" >
//           <CardHeader>
//             <CardTitle>Calender</CardTitle>
//           </CardHeader>
//           <CardContent className="flex justify-center gap-8 ">
          
//           </CardContent>
//         </Card>
//
function CalendarIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </svg>
    )
  }