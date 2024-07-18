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
    "Cardsubtext": "In today sessions"
  },
  {
    "Cardtitile": "Total Absent",
    "Cardcontent":0,
    "Cardsubtext": "In today sessions"
  },
  {
    "Cardtitile": "Upcoming Session",
    "Cardcontent": "ICT-211",
    "Cardsubtext": "2024-07-4 10:00 AM"
  },
  {
    "Cardtitile": "Number of Upcoming sessions Appointments",
    "Cardcontent": "3",
    "Cardsubtext": "Overview of Appointments"
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
        <Card className="w-full max-w-[530px]">
          <CardHeader>
            <CardTitle>Upcoming Appointment</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
              <Avatar className="border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-medium">John Doe</div>
                <div className="text-muted-foreground">ICT-211</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-500">Confirmed</div>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] items-center gap-4">
              <CalendarIcon className="h-6 w-6 text-muted-foreground" />
              <div>
                <div className="font-medium">June 29, 2024</div>
                <div className="text-muted-foreground">3:00 PM - 4:00 PM</div>
              </div>
            </div>
            <Button variant="outline" className="justify-self-end">
              Cancel Appointment
            </Button>
          </CardContent>
        </Card>
        <Card className="w-full max-w-[530px]">
          <CardHeader>
            <CardTitle>New Session</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-[auto_1fr] items-center gap-4">
              <CalendarIcon className="h-6 w-6 text-muted-foreground" />
              <div>
                <div className="font-medium">June 30, 2024</div>
                <div className="text-muted-foreground">3:00 PM - 4:00 PM</div>
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">ICT-211</SelectItem>
                <SelectItem value="english">ICT-231</SelectItem>
                <SelectItem value="science">ICT-291</SelectItem>
                <SelectItem value="history">ICT-311</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full">Schedule Session</Button>
          </CardContent>
        </Card>
        <AddData />
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