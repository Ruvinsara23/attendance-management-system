import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'


const Userprofile = () => {
  return (
    <div className='flex min-h-screen w-full flex-col justify-center align-baseline'>
   <div className='flex m-7 align-middle justify-center '>
   <img className="w-20 h-20 rounded-full mr-4" src="/Ellipse 2a.png" alt="Rounded avatar" />
   <Button variant="secondary" >Change Profile picture</Button>
   </div>
   <div>
   <h3>Personal Infromation</h3>
   <div className='flex m-[16px] '>
   <div className='flex-wrap m-[24px]  '>
   <div className='mb-[16px]'><Label >First name</Label>
   <Input></Input></div>
   <div>
   <Label>Date Of Birth</Label>
   <Input></Input> 
   </div>
   
   </div>
   <div className='flex-wrap m-[24px]'>
   <div className='mb-[16px]'>
   <Label>Last Name</Label>
   <Input></Input>
   </div>
   <div>
   <Label>Phone Number</Label>
   <Input></Input>
   </div>
   </div>
   </div>
   </div>
   <div>
   <h3>Personal Location</h3>
   <div><div className='m-[28px] ml-[38px] max-w-[480px]'><Label >Address</Label>
   <Input></Input></div></div>
   <div className='flex m-[16px] '>
   <div>
   </div>
   <div className='flex-wrap m-[24px]  '>
   <div className='mb-[16px]'><Label >NO</Label>
   <Input></Input></div>
   <div>
   <Label>Province</Label>
   <Input></Input> 
   </div>
   
   </div>
   <div className='flex-wrap m-[24px]'>
   <div className='mb-[16px]'>
   <Label>City</Label>
   <Input></Input>
   </div>
   <div>
   <Label>Postal code</Label>
   <Input></Input>
   </div>
   </div>
   </div>
   </div>
    </div>
  )
}

export default Userprofile
