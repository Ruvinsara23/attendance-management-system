"use client"

import Link from "next/link"
import {Avatar,AvatarFallback,AvatarImage,} from "@/components/ui/avatar"
import {Card,CardContent,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card"
import TimeTable from "@/components/timeTable/timeTable"
import SubjectTable from "@/components/subjectTable/subjecttable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { fetchLecTimetable } from "@/app/services/lectureFirestoreService"
import { useEffect,useState } from "react"



const timeTableData=[{
  "courseTitle": "Introduction to Computer Science",
  "courseCode": "ICT-101-1",
  "date": "Monday 10:00-11:30",
  "lectureName": "Dr. John Doe",
  "lectureEmail": "johndoe@example.com"
},
{
  "courseTitle": "Data Structures",
  "courseCode": "ICT-202-1",
  "date": "Tuesday 13:00-14:30",
  "lectureName": "Prof. Jane Smith",
  "lectureEmail": "janesmith@example.com"
},
{
  "courseTitle": "Web Development",
  "courseCode": "ICT-211-1",
  "date": "Wednesday 09:00-10:30",
  "lectureName": "Ms. Emily Johnson",
  "lectureEmail": "emilyjohnson@example.com"
},
{
  "courseTitle": "Database Systems",
  "courseCode": "ICT-303-1",
  "date": "Thursday 11:00-12:30",
  "lectureName": "Dr. Richard Roe",
  "lectureEmail": "richardroe@example.com"
},
{
  "courseTitle": "Software Engineering",
  "courseCode": "ICT-404-1",
  "date": "Friday 14:00-15:30",
  "lectureName": "Prof. Mary Davis",
  "lectureEmail": "marydavis@example.com"
},
{
  "courseTitle": "Network Security",
  "courseCode": "ICT-505-1",
  "date": "Monday 15:00-16:30",
  "lectureName": "Mr. George Miller",
  "lectureEmail": "georgemiller@example.com"
},
{
  "courseTitle": "Artificial Intelligence",
  "courseCode": "ICT-606-1",
  "date": "Wednesday 11:00-12:30",
  "lectureName": "Dr. Anna Brown",
  "lectureEmail": "annabrown@example.com"
},
{
  "courseTitle": "Machine Learning",
  "courseCode": "ICT-707-1",
  "date": "Friday 09:00-10:30",
  "lectureName": "Prof. Michael Wilson",
  "lectureEmail": "michaelwilson@example.com"
}]


const LectureCoursesPage = () => {
const [timeTable,setTimetable]=useState([]);

const fetchAndSetLecTimetable=async()=>{
  const lecTimeTableData=await fetchLecTimetable();
  setTimetable(lecTimeTableData);
  console.log("timetable details from courses",lecTimeTableData)


}

useEffect(()=>{

  fetchAndSetLecTimetable()

},[])





    return (
      <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            className="xl:col-span-2 border-black" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Time table</CardTitle>
                <CardDescription>
                Lorem Ipsum is simply dummy text of the printing . 
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
            <TimeTable  timeTable={timeTable}/>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Subject List</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
        <SubjectTable />
      </CardContent>
           </Card>
        </div>
        </main>
        </div>
    );
  };
  
  export default LectureCoursesPage;