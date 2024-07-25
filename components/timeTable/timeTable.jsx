"use client" 

import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,
    
  } from "@/components/ui/table"



 
const TimeTable = ({ timeTable}) => {
  


    return (
      <Table className='font-semibold bg-white ' >
        <TableHeader>
          <TableRow>
            <TableHead>Course Title</TableHead>
            <TableHead >Course Code</TableHead>
            <TableHead >Date </TableHead>
            <TableHead >Time</TableHead>
            
            
          </TableRow>
        </TableHeader>
        <TableBody className='text-[#6B7280]' >
          { timeTable.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="font-medium">{item.subjectName}</div>
              </TableCell>
              <TableCell >
                {item.subjectCode}
              </TableCell>
              <TableCell >
                
                  {item.day}
                
              </TableCell>
              <TableCell >
                {item.time}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  
  export default TimeTable;