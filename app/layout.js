"use client"
import { useEffect,useState } from "react";
import { usePathname,useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import StudentHeader from "@/components/header/studentHeader";
import LectureHeader from "@/components/header/lectureHeader";
import {UserProvider,useUserContext } from "./context/userContext";
import { SessionProvider } from "./context/sessionContext";
import AdminHeader from "@/components/header/adminHeder";


const inter = Inter({ subsets: ["latin"] });





const getHeader = (pathname) => {
  if (pathname.startsWith('/lectureDashboard')) {
    return <LectureHeader />;
  } else if (pathname.startsWith('/studentDashboard')) {
    return <StudentHeader />;
  }
 else if(pathname.startsWith('/adminDashboard')) {
  return <AdminHeader />;
}
  return null;
};

const AuthenticatedLayout = ({ children }) => {
  const { currentUser} = useUserContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if ( !currentUser) {
      router.push('/login');
    }
  }, [ currentUser, router]);



  const header = getHeader(pathname, currentUser?.userRole);

  return (
    <div>
      {header}
      <main>{children}</main>
    </div>
  );}


export default function RootLayout({ children }) {
  // const pathname = usePathname();
  // const header = getHeader(pathname ,currentUser?.userRole);

  return (
    <html lang="en">
    
    <UserProvider> 
    <SessionProvider>
    
      <body className={inter.className}>
      <AuthenticatedLayout>
      {children}
      </AuthenticatedLayout>
      </body>
      </SessionProvider>
      </UserProvider>
      
    </html>
  );
}
