import React, { useState } from 'react'
import { useUserContext } from '@/app/context/userContext';
import {Package2,CircleUser,} from "lucide-react"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'; 
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage,AvatarFallback } from '../ui/avatar';



const NavDropDown = () => {
  // const [currentUser,setcurrentUser]=useState()
    const {signOut}=useUserContext()

    


   const handleLogout = async () => {
    try {
      await signOut();
      alert("Logged out successfully!");
    } catch (error) {
     console.log(error.message);
    }
      };



  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="" size="icon" className="rounded-full">
          <Avatar className='' >
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem  ><Button type='submit' onClick={handleLogout}>Logout</Button></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}

export default NavDropDown
