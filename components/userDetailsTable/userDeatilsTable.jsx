 "use client"
import React from 'react'
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { Card, CardHeader } from '../ui/card'
import { Avatar,AvatarImage,AvatarFallback } from '../ui/avatar'
import { Dialog,DialogClose,DialogContent ,DialogTrigger} from '../ui/dialog'
import { fetchUserDetails } from '@/app/services/adminFirestoreService'
import { useState,useEffect } from 'react'
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
    <CardHeader>
    <div>Recently create users </div> 
    <div><button onClick={handleViewAllClick}>View All</button>
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
      <TableRow>
        <TableHead>User Profile</TableHead>
        <TableHead >User Name</TableHead>
        <TableHead >UserId </TableHead>
        <TableHead >Course</TableHead>
        <TableHead >Department</TableHead>
        <TableHead >Adress</TableHead>
        <TableHead >Phone Number</TableHead>
        <TableHead >User Role</TableHead>
        
        
        
      </TableRow>
    </TableHeader>
    <TableBody className='text-[#6B7280] ' >
    {users.slice(0, 50).map(user => (
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
