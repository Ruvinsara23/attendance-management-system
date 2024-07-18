import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'



const UserDetails = () => {
    return (
      <div className='flex min-h-screen w-full flex-col justify-center '>
     <div className='flex place-items-center m-7 align-middle justify-center flex-wrap '>
     <img className="w-20 h-20 rounded-full mr-4" src="/Ellipse 2a.png" alt="Rounded avatar" />
    <div className='flex-none align-middle justify-center '>
    <h2 className="text-sm font-medium leading-none"><strong>Jane Smith</strong></h2>
    <h5>janesmith@example.com</h5>

    </div>
     </div>
     <div>
     <h3 className="text-sm font-medium leading-none"><strong>Personal Infromation</strong></h3>
     <div className='flex m-[16px] '>
     <div className='flex-wrap m-[30px]  '>
     <div className='mb-[16px] flex flex-col '><Label className="text-[18px] font-medium leading-none mb-2" >First name</Label>
     <Label className="text-[16px] text-muted-foreground" >Jane</Label></div>
     <div className='mb-[16px] flex flex-col '>
     <Label className="text-[18px] font-medium leading-none mb-2" >Date of Birt</Label>
     <Label className="text-[16px] text-muted-foreground" >2000/04 /20</Label></div>
     <div>
     </div>
     </div>
     <div className='flex-wrap m-[24px]'>
     <div className='mb-[16px] flex flex-col '>
     <Label className="text-[18px] font-medium leading-none mb-2" >Last Name</Label>
     <Label className="text-[16px] text-muted-foreground" > Smith </Label></div>
     <div>
     </div>
     <div className='mb-[16px] flex flex-col '>
     <Label className="text-[18px] font-medium leading-none mb-2" >Phone Number</Label>
     <Label className="text-[16px] text-muted-foreground" > 0765432566 </Label></div>
     </div>
     </div>
     </div>
     <div>
     <h3 className="text-sm font-medium leading-none"><strong>Personal Location</strong></h3>
     <div><div className='m-[28px] ml-[38px] max-w-[480px]'><Label >Address</Label>
     <Input placeholder="N0 123, Kaluthara rd, Mathugama"></Input ></div></div>
     <div className='flex m-[16px] '>
     <div>
     </div>
     <div className='flex-wrap m-[24px]  '>
     <div className='mb-[16px]'><Label >NO</Label>
     <Input placeholder="N0 123"></Input></div>
     <div>
     <Label>Province</Label>
     <Input placeholder="western"></Input> 
     </div>
     
     </div>
     <div className='flex-wrap m-[24px]'>
     <div className='mb-[16px]'>
     <Label>City</Label>
     <Input placeholder=" Mathugama"></Input>
     </div>
     <div>
     <Label>Postal code</Label>
     <Input placeholder="123"></Input>
     </div>
     </div>
     </div>
     </div>
      </div>
    )
  }
  
  export default UserDetails ;


