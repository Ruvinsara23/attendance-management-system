import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useUserContext } from '@/app/context/userContext'



const UserDetails = () => {
 const {currentUser}=useUserContext()
 const fullName = currentUser.userName;
 const [firstName, lastName] = fullName.split(' ');

    return (
      <div className="flex min-h-screen w-full flex-col justify-center">
      <div className="flex place-items-center m-4 align-middle justify-center flex-wrap">
        <img className="w-20 h-20 rounded-full mr-4" src="/Ellipse 2a.png" alt="Rounded avatar" />
        <div className="flex-none align-middle justify-center">
          <h2 className="text-sm font-medium leading-none"><strong>{currentUser.userName}</strong></h2>
          <h5>{currentUser.email}</h5>
        </div>
      </div>
      <div className="grid gap-8 w-[720px] p-20">
        <div className="grid gap-6">
          <p className="text-muted-foreground text-lg font-medium">Personal Information</p>
          <div className="grid grid-cols-2 mr-5 gap-6">
            <div className="grid gap-2">
              <p className="text-muted-foreground">First Name</p>
              <p>{firstName}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-muted-foreground">Last Name</p>
              <p>{lastName}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-muted-foreground">Date of Birth</p>
              <p>{currentUser.dateOfBirth}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-muted-foreground">Department</p>
              <p>{currentUser.department}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-muted-foreground">Course</p>
              <p>{currentUser.userRole}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-muted-foreground">User ID</p>
              <p>{currentUser.userID}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <p className="text-muted-foreground text-lg font-medium">Contact Information</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <p className="text-muted-foreground">Address</p>
              <p>{currentUser.address}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-muted-foreground">Phone</p>
              <p>{currentUser.phoneNumber}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-muted-foreground">Email</p>
              <p>{currentUser.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
  
  export default UserDetails ;


