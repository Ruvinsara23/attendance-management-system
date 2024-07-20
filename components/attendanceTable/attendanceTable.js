"use client" 

import { Table,TableBody, TableCell,TableHead, TableHeader,TableRow } from "@/components/ui/table"

  import { Badge } from "../ui/badge";


  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); 
  };
 
const AttendanceTable = ({attendanceData,studentIdFilter}) => {
  console.log("from attendance table admin datad=aset ,",attendanceData)

    return (
      <div className="custom-scrollbar overflow-x-auto overflow-y-auto max-h-96"> 
      <Table >
        <TableHeader className='font-semibold bg-gradient-to-r from-pink-50 via-fuchsia-100 to-fuchsia-50 '>
          <TableRow className='text-[#1F2937] m-5'>
            <TableHead className='text-[#1F2937]'>Student Name</TableHead>
            <TableHead  className='text-[#1F2937]'>Subject Code</TableHead>
            <TableHead className='text-[#1F2937]' >Attendance Status</TableHead>
            <TableHead className='text-[#1F2937]' >Date and Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-[#6B7280]' >
   
        {attendanceData.map((attendance) => (
          Object.entries(attendance.attendance).map(([studentId, status]) => (
            (!studentIdFilter || studentId === studentIdFilter) &&   (
              <TableRow  key={`${attendance.id}-${studentId}`}  className="bg-gradient-to-r from-pink-50 via-fuchsia-100 to-fuchsia-50 border-[#EBCFFC]">
                <TableCell>
                  <div className="font-medium">{studentId}</div>
                </TableCell>
                <TableCell>{attendance.subjectCode}</TableCell>
                <TableCell>
                  <Badge className={`text-xs ${status ? ' bg-green-500/20 px-3 py-1 text-xs font-normal text-green-500' : 'bg-red-500/20 text-red-500'}`} variant="outline">
                    {status ? 'Present' : 'Absent'}
                  </Badge>
                </TableCell>
                <TableCell>{formatCreatedAt(attendance.createdAt)}</TableCell>
              </TableRow>
            )
          ))
        ))}
        </TableBody>
      </Table>
      </div>
    );
  };
  
  export default AttendanceTable;