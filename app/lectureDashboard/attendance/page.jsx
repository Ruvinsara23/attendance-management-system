"use client"
import React from 'react'

import { Label } from "@/components/ui/label"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useState,useEffect } from 'react'
import { CalendarDaysIcon, Calendar } from "@/components/ui/calendar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { fetchAttendance } from '@/app/services/lectureFirestoreService'
import AttendanceTable from '@/components/attendanceTable/attendanceTable'
import { Card } from '@/components/ui/card'
import { useUserContext } from '@/app/context/userContext'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { setDate } from 'date-fns'




const page = () => {
    const [attendanceData,setAttendanceData  ]=useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [subject, setSubject] = useState('All');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');
  const {currentUser}=useUserContext()
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchAndSetAttendance = async () => {
      const data = await fetchAttendance({lecturerId: currentUser.userID});
      setAttendanceData(data);
      console.log(data, "attendance");
    };

    fetchAndSetAttendance();
  }, []);

  useEffect(() => {
    filterData();
  }, [attendanceData,dateRange, subject, department, status,searchTerm,selectedDate]);

  const filterData = () => {
    let data = [...attendanceData];

    
    if (selectedDate) {
      const filterDate = selectedDate
      console.log("selected",selectedDate)
      console.log("filter date",filterDate)
      data = data.filter(item => {
        const itemDate = new Date(item.createdAt);
        return itemDate === filterDate;
      });
    }
    


    if (subject && subject !== 'All') {
      data = data.filter(item => item.subjectCode === subject);
    }

    // if (department && department !== 'All') {
    //   data = data.filter(item => item.department === department);
    // }

    if (status && status !== 'All') {
        data = data.map(item => {
            const filteredAttendance = Object.fromEntries(
                Object.entries(item.attendance).filter(([studentId, attended]) => {
                    if (status === 'present') {
                        return attended === true;
                    } else if (status === 'absent') {
                        return attended === false;
                    }
                    return true;
                })
            );
            return { ...item, attendance: filteredAttendance };
        });
       
    
    }


   if (searchTerm) {
    data = data.filter(item => {
      return item.attendance && Object.keys(item.attendance).some(studentId => 
        studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }).map(item => {
      const filteredAttendance = Object.fromEntries(
        Object.entries(item.attendance).filter(([studentId, attended]) => 
          studentId.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      return { ...item, attendance: filteredAttendance };
    });
  }
 console.log("This is from report ",data)
    setFilteredData(data);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  

  const downloadReport = () => {
    const doc = new jsPDF();
    const data = filteredData;
    const studentWiseData = {};


    data.forEach(item => {
      for (const studentId in item.attendance) {
        if (!studentWiseData[studentId]) {
          studentWiseData[studentId] = [];
        }
        studentWiseData[studentId].push({
          subjectCode: item.subjectCode,
          status: item.attendance[studentId] ? 'Present' : 'Absent',
          date: (item.createdAt).toLocaleDateString(),
        });
      }
    });

    const tableRows = [];
    for (const studentId in studentWiseData) {
      studentWiseData[studentId].forEach(record => {
        tableRows.push([studentId, record.subjectCode, record.status, record.date, record.time]);
      });
    }

    
    autoTable(doc, {
      head: [['Student ID', 'Subject Code', 'Status', 'Date']],
      body: tableRows
    });

    doc.save('attendance_report.pdf');
  };

  const uniqueSubjects = ['All', ...new Set(attendanceData.map(item => item.subjectCode))];
  const uniqueDepartments = ['All', ...new Set(attendanceData.map(item => item.department))];
       
         


  return (

    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 ">
    <Card className='border-[#6418C3] p-7'>
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Attendance Report</h1>
        <p className="text-muted-foreground">
          Generate a detailed report of students attendance based on your selected filters.
        </p>
      </div>
      <div className="bg-card p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date-range">Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start font-normal">
   
                  <div className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="range" onSelect={setSelectedDate} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select onValueChange={setSubject}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {uniqueSubjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border rounded p-2 w-full"
                placeholder="Search by student ID"
              />
            </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="bg-card p-6 rounded-lg shadow-sm ">
        <h2 className="text-xl font-semibold mb-4">Attendance Details</h2>
        <AttendanceTable attendanceData={filteredData} />
      </div>
      <div className="flex justify-end mt-6">
        <Button type="submit" onClick={downloadReport}>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>
      </Card>
    </div>
);

}
export default page


function DownloadIcon(props) {
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
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
    )
  }
  
  
  function XIcon(props) {
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
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )
  }



//   <Table>
//   <TableHeader>
//     <TableRow>
//       <TableHead>Employee</TableHead>
//       <TableHead>Department</TableHead>
//       <TableHead>Date</TableHead>
//       <TableHead>Clock-in</TableHead>
//       <TableHead>Clock-out</TableHead>
//       <TableHead className="text-right">Total Hours</TableHead>
//     </TableRow>
//   </TableHeader>
//   <TableBody>
//     <TableRow>
//       <TableCell className="font-medium">John Doe</TableCell>
//       <TableCell>Engineering</TableCell>
//       <TableCell>2023-06-01</TableCell>
//       <TableCell>09:00 AM</TableCell>
//       <TableCell>05:30 PM</TableCell>
//       <TableCell className="text-right">8.5 hrs</TableCell>
//     </TableRow>
//     <TableRow>
//       <TableCell className="font-medium">Jane Smith</TableCell>
//       <TableCell>Sales</TableCell>
//       <TableCell>2023-06-02</TableCell>
//       <TableCell>08:30 AM</TableCell>
//       <TableCell>06:00 PM</TableCell>
//       <TableCell className="text-right">9.5 hrs</TableCell>
//     </TableRow>
//     <TableRow>
//       <TableCell className="font-medium">Bob Johnson</TableCell>
//       <TableCell>HR</TableCell>
//       <TableCell>2023-06-03</TableCell>
//       <TableCell>10:00 AM</TableCell>
//       <TableCell>04:45 PM</TableCell>
//       <TableCell className="text-right">6.75 hrs</TableCell>
//     </TableRow>
//   </TableBody>
// </Table>