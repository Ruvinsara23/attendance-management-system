
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

const navLinks = [
    { href: '/adminDashboard', text: 'Dashboard', className: '' },
    { href: '/adminDashboard/userManagement', text: 'Users', className: 'text-muted-foreground' },
    { href: '/adminDashboard/attendance', text: 'Attendance', className: 'text-muted-foreground' },
    // { href: '/adminDashboard/', text: 'Courses', className: 'text-muted-foreground' },
    // { href: '/adminDashboard/profile', text: 'Profile', className: 'text-muted-foreground' },
  ];
  

const AdminHeader = () => {
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
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-[#FBF6FE]  px-4 md:px-6">
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
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href} className="text-muted-foreground hover:text-foreground">
              {link.text}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 bg-[#FBF6FEb]">
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

export default AdminHeader;
