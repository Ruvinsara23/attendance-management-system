"use client"
import React from 'react'
import { useEffect,useState } from 'react'
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,

  UserPlus,
  UserX,
  Menu,
  Package2,
  Search,
  GraduationCap,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
  import AttendanceTable from '@/components/attendanceTable/attendanceTable'
  import { Input } from "@/components/ui/input"
import Calendar from '@/components/calender/calender'
import CalendarIn from '@/components/calender/calender'
import NavBar from '@/components/navBar/navBar'
import Header from '@/components/header/studentHeader'
import DashboardCard from '@/components/dashbordCard/dashboardCard'
import { fetchStuAttendance,fetchQRCode } from '../services/studentFirestoreService'
import { useRef } from 'react'
import { useUserContext } from '../context/userContext'


const cardData = [

  {
    "Cardtitile": "Total Present",
    "Cardcontent": 0,
    "Cardsubtext": "this semester",
      icon:"UserRoundPlus",
     bgColor: "bg-[#86EFAC]", 
     textColor: "text-white" 
  },
  {
    "Cardtitile": "Total Absent",
    "Cardcontent": 0,
    "Cardsubtext": "this semester",
     icon:"UserRoundMinus",
    bgColor: "bg-[#FCD34D]", 
    textColor: "text-white" 
  },
  {
    "Cardtitile": "Upcoming Session",
    "Cardcontent": "ICT-211",
    "Cardsubtext": "4-date",
    icon:"CalendarPlus",
    bgColor: "bg-[#93C5FD]", 
    textColor: "text-white" 
  },
  {
    "Cardtitile": "Number of Appointments",
    "Cardcontent": "3",
    "Cardsubtext": "Overview of Appointments",
     icon:"CalendarCheck2",
    bgColor: "bg-[#B270EC]",
    textColor: "text-white"
  }
];



  const exampleData = [
    {
      studentName: 'Introduction to Programming',
      subjectCode: 'ICT-201-1',
      attendanceStatus: 'Present',
      dateTime: '2024-06-21 10:00 AM',
    },
    {
      studentName: 'Data Structures',
      subjectCode: 'ICT-201-3',
      attendanceStatus: 'Present',
      dateTime: '2024-06-21 11:00 AM',
    },
    {
      studentName: 'Algorithms',
      subjectCode: 'ICT-205-1',
      attendanceStatus: 'Present',
      dateTime: '2024-06-22 09:00 AM',
    },
    {
      studentName: 'Operating Systems',
      subjectCode: 'ICT-251-3',
      attendanceStatus: 'Present',
      dateTime: '2024-06-22 10:00 AM',
    },
    {
      studentName: 'Database Systems',
      subjectCode: 'ICT-221-2',
      attendanceStatus: 'Absent',
      dateTime: '2024-06-23 01:00 PM',
    },
    {
      studentName: 'Computer Networks',
      subjectCode: 'ICT-281-4',
      attendanceStatus: 'Present',
      dateTime: '2024-06-23 02:00 PM',
    },
  ];

  


const studentDashboard = () => {
  const [attendanceData,setAttendanceData  ]=useState([])
  const [counts, setCounts] = useState({ totalCount: 0, absentCount: 0 });
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [subjects, setSubjects] = useState([])
  const imgRef = useRef(null);
  const {currentUser}=useUserContext()

  // const fetchAndSetStuAttendance=async()=>{
  //   const attendanceData=await  fetchStuAttendance()
  //   setAttendanceData(attendanceData)
  //   console.log(attendanceData," fromstu")
  
  //   };

  const userId = currentUser.userID;

  const fetchAndSetStuAttendance = async () => {
    const data = await fetchStuAttendance(userId);
    setAttendanceData(data);
    const uniqueSubjects = [...new Set(data.map(item => item.subjectCode))];
    setSubjects(uniqueSubjects);
  };

    const fetchAndSetQrCode=async()=>{
      const qrCodeUrl=await fetchQRCode(userId)
      setQrCodeUrl(qrCodeUrl)
    }
  

    const calculateAttendanceCounts=async()=>{
      let presentCount = 0;
      let absentCount = 0;
    const attendanceData=await fetchStuAttendance(userId)
   
    console.log(attendanceData,"attendance")
    //  [
    //   { attendance: { "student1": false, "student2": true }, courseID: "course1" },
    //   { attendance: { "student3": true, "student4": false }, courseID: "course2" },
    //   { attendance: { "student5": true, "student6": true }, courseID: "course3" }
    // ];
    
    attendanceData.forEach(entry => {
        const { attendance } = entry;
        const attendanceValue = attendance[`${userId}`];

        if (attendanceValue === true) {
            presentCount++;
        } else {
            absentCount++;
        }
    });

    console.log(`Total Present for ${userId} :`, presentCount);
    console.log(`Total Absent for ${userId} :`, absentCount);

    return { presentCount, absentCount };
};

  
    
  
  const updateCardData = async () => {
    const { presentCount, absentCount } = await calculateAttendanceCounts();
    cardData[0].Cardcontent = presentCount;
    cardData[1].Cardcontent = absentCount;
    console.log(cardData, "after add");
  };
  

  const handleDownload = () => {
    if (imgRef.current) {
      const link = document.createElement('a');
      link.href = imgRef.current.src;
      link.download = 'qrcode.png';
      link.click();
    }
  }
    useEffect(()=>{
      fetchAndSetQrCode(userId);
      fetchAndSetStuAttendance()
      updateCardData()
    },[counts])

    const getFilteredData = () => {
      return attendanceData.filter(entry => {
        // Apply subject filter
        if (subjectFilter && entry.subjectCode !== subjectFilter) return false;
  
        // Apply status filter for the specific student
        const studentId = userId;  // Change this to the desired student ID
        if (statusFilter === "Present" && entry.attendance[studentId] !== true) return false;
        if (statusFilter === "Absent" && entry.attendance[studentId] !== false) return false;
  
        return true;
      });
    };
  

   
  return (
    <div className="flex min-h-screen w-full flex-col">
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">

      <DashboardCard counts={counts} cardData={cardData} />
  
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card
          className="xl:col-span-2 border-[#6418C3] shadow-xl" x-chunk="dashboard-01-chunk-4" 
        >
          <CardHeader className="flex flex-row items-center ">
            <div className="grid gap-2">
              <CardTitle>Attendance</CardTitle>
              <CardDescription>
                Recent attendance from you.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="#">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="custom-scrollbar overflow-x-auto overflow-y-auto">
          <div className="mb-4 flex gap-4">
                <select onChange={(e) => setSubjectFilter(e.target.value)} className="p-2 border rounded">
                  <option value="">All Subjects</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
                </select>
                <select onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border rounded">
                  <option value="">All Statuses</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
          <AttendanceTable attendanceData={getFilteredData ()} studentIdFilter={userId}
              />
          </CardContent>
        </Card>
        <Card className="border-[#6418C3] p-14 pt-6 shadow-xl" x-chunk="dashboard-01-chunk-5" >
          <CardHeader>
            <CardTitle>QR Code</CardTitle>
            <CardDescription>
            Download your QR code here
              </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-8 ">

          {qrCodeUrl ? <img ref={imgRef} src={qrCodeUrl} alt="User QR Code" className='w-full h-full' /> : <p>Loading QR Code...</p>}
          </CardContent>
          <CardFooter>
          <Button className="w-full" onClick={handleDownload}>Download </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  </div>
  )
}

export default studentDashboard
