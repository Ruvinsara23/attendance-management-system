
import Link from 'next/link';
import React from 'react';
import NavBar from '../navBar/navBar';
import SearchBar from '../searchBar/SearchBar';
import { Button } from "@/components/ui/button"
import {Sheet,
    SheetTrigger,
    SheetContent, } from '../ui/sheet';
import {
    Package2,
    CircleUser,
  } from "lucide-react"
import { logout } from '@/utils/firebase/firebaseUtils';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'; 
import { useUserContext } from '@/app/context/userContext';
import { LayoutDashboard, CircleUserRound, CalendarCheck2, LibraryBig } from 'lucide-react'



const navLinks = [
    { href: '/studentDashboard', text: 'Dashboard', className: '',icon:LayoutDashboard, },
    // { href: '/studentDashboard/qrcode', text: 'QRcode', className: 'text-muted-foreground' },
    { href: '/studentDashboard/appointment', text: 'Appointment', className: 'text-muted-foreground',icon:CalendarCheck2, },
    { href: '/studentDashboard/courses', text: 'Courses', className: 'text-muted-foreground',icon:LibraryBig, },
    { href: '/studentDashboard/profile', text: 'Profile', className: 'text-muted-foreground',icon:CircleUserRound, },
  ];

  // const iconMap={
  //   LayoutDashboard,
  //   CalendarCheck2,
  //   LibraryBig,
  //   CircleUserRound,
   
   
  //  }
  

const StudentHeader = () => {
 const {setCurrentUser}=useUserContext()

 const handleLogout = async () => {
  try {
    await logout();
    setCurrentUser(null);
    alert("Logged out successfully!");
  } catch (error) {
   console.log(error.message);
  }
};


//  console.log(,"This is user after log out");
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b  px-4 md:px-6 bg-[#f4e9fa]">
    <NavBar data={navLinks} />
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Package2 className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 md:w-auto">
        <nav className="grid gap-6 text-lg font-medium">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
            <CircleUser className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {navLinks.map((link, index) => {
            const IconComponent = link.icon;
            return(
            <Link key={index} href={link.href} className="text-muted-foreground hover:text-foreground">
            {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
              {link.text}
            </Link>
          )})}
        </nav>
      </SheetContent>
    </Sheet>
    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <SearchBar />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
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
    </div>
  </header>
  );
};

export default StudentHeader;
