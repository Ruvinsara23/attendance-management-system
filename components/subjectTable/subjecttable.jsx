import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@/components/ui/table';
import React from 'react';

const subjects = [
  {
    subject: "Introduction to Computer Science",
    subjectCode: "ICT-101-1",
    department: "Computer Science"
  },
  {
    subject: "Data Structures",
    subjectCode: "ICT-202-1",
    department: "Software Engineering"
  },
  {
    subject: "Web Development",
    subjectCode: "ICT-211-1",
    department: "Information Technology"
  },
  {
    subject: "Database Systems",
    subjectCode: "ICT-303-1",
    department: "Computer Science"
  },
  {
    subject: "Software Engineering",
    subjectCode: "ICT-404-1",
    department: "Software Engineering"
  },
  {
    subject: "Network Security",
    subjectCode: "ICT-505-1",
    department: "Cyber Security"
  },
  {
    subject: "Artificial Intelligence",
    subjectCode: "ICT-606-1",
    department: "Artificial Intelligence"
  },
  {
    subject: "Machine Learning",
    subjectCode: "ICT-707-1",
    department: "Data Science"
  }
];


const SubjectTable = ({timeTable}) => {
  return (
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Course Title</TableHead>
        <TableHead >Subject Code</TableHead>
        <TableHead >Department </TableHead>
      
        
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
            {item.departmentId}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  );
};

export default SubjectTable;