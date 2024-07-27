"use client"
import React from 'react'

import { Label } from "@/components/ui/label"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useState,useEffect } from 'react'
import { CalendarDaysIcon, Calendar } from "@/components/ui/calendar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { fetchAttendanceForAdmin } from '@/app/services/adminFirestoreService'
import AttendanceTable from '@/components/attendanceTable/attendanceTable'
import { useUserContext } from '@/app/context/userContext'





const page = () => {
    const [attendanceData,setAttendanceData  ]=useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [subject, setSubject] = useState('All');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');
  const {currentUser}=useUserContext()

  useEffect(() => {
    if(currentUser){

      const fetchAndSetAttendance = async () => {
        const data = await fetchAttendanceForAdmin ();
        setAttendanceData(data);
        console.log(data, "attendance");
      };
      fetchAndSetAttendance();
    }
    

    
  }, []);

  useEffect(() => {
    filterData();
  }, [attendanceData, dateRange, subject, department, status]);

  const filterData = () => {
    let data = [...attendanceData];
   console.log("data before filter",data)
    if (dateRange[0] && dateRange[1]) {
      const [startDate, endDate] = dateRange;
      data = data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }
  
    if (subject && subject !== 'All') {
      data = data.filter(item => item.subjectCode === subject);
    }
  
    if (department && department !== 'All') {
      data = data.filter(item => item.department === department);
    }
  
    if (status && status !== 'All') {
      data = data.filter(item => {
        const hasStatus = Object.values(item.attendance).includes(status === 'present');
        return hasStatus ? item : null;
      }).map(item => {
        const filteredAttendance = Object.fromEntries(
          Object.entries(item.attendance).filter(([studentId, attended]) => {
            if (status === 'present') {
              return attended === true; // Filter for present
            } else if (status === 'absent') {
              return attended === false; // Filter for absent
            }
            return true; // For 'all' status
          })
        );
        return { ...item, attendance: filteredAttendance };
      });
    }
  
    console.log("This is from report ", data);
    setFilteredData(data);
  };

 

  const downloadReport = () => {
    // Implement download report logic
  };

  const uniqueSubjects = ['All', ...new Set(attendanceData.map(item => item.subjectCode))];
const uniqueDepartments = ['All', ...new Set(attendanceData.map(item => item.department))];


  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Attendance Report</h1>
        <p className="text-muted-foreground">
          Generate a detailed report of employee attendance based on your selected filters.
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
                  Select date range
                  <div className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="range" onSelect={setDateRange} />
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
            <Label htmlFor="department">Department</Label>
            <Select onValueChange={setDepartment}>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {uniqueDepartments.map(department => (
                  <SelectItem key={department} value={department}>{department}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Attendance Details</h2>
 <AttendanceTable attendanceData={filteredData} /> 
      </div>
      <div className="flex justify-end mt-6">
        <Button variant="outline" onClick={downloadReport}>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>
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