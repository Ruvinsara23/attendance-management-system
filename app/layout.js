"use client"
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import StudentHeader from "@/components/header/studentHeader";
import LectureHeader from "@/components/header/lectureHeader";
import {UserProvider } from "./context/userContext";
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


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const header = getHeader(pathname);

  return (
    <html lang="en">
    <UserProvider> 
    <SessionProvider>
      <body className={inter.className}>
     
      {header}<main>{children}</main>
       
      </body>
      </SessionProvider>
      </UserProvider>
      
    </html>
  );
}
