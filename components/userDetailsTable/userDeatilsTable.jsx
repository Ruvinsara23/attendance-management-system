 "use client"
import React from 'react'
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Avatar,AvatarImage,AvatarFallback } from '../ui/avatar'
import { Dialog,DialogClose,DialogContent ,DialogTrigger} from '../ui/dialog'
import { fetchUserDetails } from '@/app/services/adminFirestoreService'
import { useState,useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '../ui/button'
import EditableUserDetailsTable from '../editableUserDetailsTable/editableUserDetails'

const UserDeatilsTable = () => {
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    useEffect(() => {
        const fetchAndSetUserDetails = async () => {
          const { usersData, departmentsData } = await fetchUserDetails ();
          console.log(departmentsData,"departments")
          setUsers(usersData);
          setDepartments  (departmentsData.reduce((acc, dept) => {
            acc[dept.id] = dept.name;
            return acc;
          }, {}));
        };
    
        fetchAndSetUserDetails();
      }, []);


const handleDialogClose = () => {
        setIsDialogOpen(false);
      };
    
const handleViewAllClick = () => {
    setIsDialogOpen(true);
  };
  return (
    <Card className='custom-scrollbar overflow-x-auto overflow-y-auto h-auto max-h-[850px]'>
    <CardHeader className="flex flex-row items-center ">
    <div className="grid gap-2">
   <CardTitle>User Deatils Table</CardTitle> 
   <CardDescription>This card displays details of users who have been recently created.</CardDescription></div>
   <Button onClick={handleViewAllClick} className="ml-auto gap-1">
   View All<ArrowUpRight className="h-4 w-4" />
 </Button>
    <div>
    <Dialog open={isDialogOpen} onOpenChange={handleDialogClose} className="bg-white rounded-lg max-w-7xl w-full p-6 overflow-auto mr-7 max-h-[900px]">
    <DialogTrigger asChild>
    </DialogTrigger>
   
    <DialogContent className="bg-white rounded-lg max-w-fit  p-10 overflow-auto custom-scrollbar max-h-[700px] ">
      <EditableUserDetailsTable users={users} departments={departments} />
    </DialogContent>
  </Dialog></div>
    

    </CardHeader>

    <Table className='font-semibold bg-white max-h-96  ' >
    <TableHeader>
      <TableRow className='text-[#1F2937] m-5' >
        <TableHead className='text-[#1F2937]'>User Profile</TableHead>
        <TableHead className='text-[#1F2937]'>User Name</TableHead>
        <TableHead className='text-[#1F2937]'>UserId </TableHead>
        <TableHead className='text-[#1F2937]'>Course</TableHead>
        <TableHead className='text-[#1F2937]'>Department</TableHead>
        <TableHead className='text-[#1F2937]'>Adress</TableHead>
        <TableHead className='text-[#1F2937]'>Phone Number</TableHead>
        <TableHead className='text-[#1F2937]'>User Role</TableHead>
        
        
        
      </TableRow>
    </TableHeader>
    <TableBody className='text-[#6B7280] ' >
    {users.slice(0, 10).map(user => (
        <TableRow key={user.id}>
          <TableCell>
            <Avatar>
              <AvatarImage src={user.photoUrl} alt={user.userName} />
              <AvatarFallback>{(user.userName && user.userName[0])}</AvatarFallback>
            </Avatar>
          </TableCell>
          <TableCell>{user.userName}</TableCell>
          <TableCell>{user.userID}</TableCell>
          <TableCell>{user.course || 'Unknown Course'}</TableCell>
          <TableCell>{departments[user.department]}</TableCell>
          <TableCell>{user.address || 'N/A'}</TableCell>
          <TableCell>{user.phoneNumber || 'N/A'}</TableCell>
          <TableCell>{user.userRole}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
 
    
  </Card>

  )
}

export default UserDeatilsTable
