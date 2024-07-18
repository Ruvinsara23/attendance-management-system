"use client" 

import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,
    
  } from "@/components/ui/table"



 
const TimeTable = ({ timeTable}) => {
  


    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Title</TableHead>
            <TableHead >Course Code</TableHead>
            <TableHead >Date </TableHead>
            <TableHead >Lecture Name</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
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