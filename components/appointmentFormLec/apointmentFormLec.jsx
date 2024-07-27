"use client"
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState ,useEffect} from "react"
import { addAppointment } from "@/app/services/studentFirestoreService"
import { fetchStudents } from "@/app/services/lectureFirestoreService"




const defaultFormFields={
    lecturer:'',
    lecturerId:'',
    date:'',
    time:'',
    subject:'',
    message:'',
    studentId:'',
    studentName:''
    
    }

const ApointmentFormLec = ({currentUser,onAppointmentCreated}) => {
    const [student,setStudent]=useState([])
    const [formFields,setFormFields]=useState(defaultFormFields)
    const {studentName,studentId,date,time,subject,message,lecturer,lecturerId}=formFields
  

    useEffect(() => {
        const fetchAndSetStudents = async () => {
          const studentsData = await fetchStudents();
          setStudent(studentsData);
        };
    
        fetchAndSetStudents();
      }, []);
    
   
   
    useEffect(() => {
    
        if (currentUser) {
            setFormFields((prevFields) => ({
              ...prevFields,
              lecturer: currentUser.userName,
              lecturerId: currentUser.userID
            }));
          }
        
 
   }, [currentUser])
    
    const handleChange=(event)=>{
     const {name,value}=event.target
     setFormFields({...formFields,[name]:value})
     console.log(formFields)
    }
   
    const handleSelectChange = (value, name) => {
        const { studentName, studentId } = JSON.parse(value);
    setFormFields({ ...formFields, studentName, studentId });}
   
   const resetFormFields = () => {
    setFormFields({
        ...defaultFormFields,
        lecturer: currentUser.userName,
        lecturerId: currentUser.userID
    });


   };


   const appointmentId=`${currentUser.userID}${Date.now()}`
   const handleSubmit=(event)=>{
     event.preventDefault()
     
     addAppointment({formFields,appointmentId})
     resetFormFields()
     onAppointmentCreated ()
   }
   
   


  return (  
    <form onSubmit={handleSubmit} >
    <Card className='border-black p-4'>
    <div className="flex flex-wrap">
    <div className="flex-col">
      <CardHeader >
        <CardTitle>Make a Appoinment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 ">
        <div className="space-y-2">
          <Label htmlFor="student-name">Lecturer Name</Label>
          <Input id="student-name" placeholder="Enter student name" name='studentName'  value={currentUser.userName}  readOnly />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-enroll">Lecturer ID</Label>
          <Input id="student-enroll" placeholder="Enter enrollment number" name='studentId'  value={currentUser.userID}  readOnly/>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" name='date'  onChange={handleChange} value={date}  />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input type="time" id="time" name='time'   onChange={handleChange} value={time} />
          </div>
        </div>
          </div>
        </div>
      </CardContent>
      </div>
      <div className="flex-col">
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="role">Student's Name</Label>
          <Select onValueChange={(value) => handleSelectChange(value, 'student')}>
            <SelectTrigger id="role" name='student' >
              <SelectValue placeholder="select lecturer from your department" />
            </SelectTrigger>
            <SelectContent>
            {student.map((student) => (
              <SelectItem key={student.id} value={JSON.stringify({ studentName: student.userName, studentId: student.userID })}>{student.userName}</SelectItem>
            ))}
</SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Enter subject" name='subject' onChange={handleChange} value={subject}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">message</Label>
          <Textarea id="content" placeholder="You are a..." className="min-h-[100px]"  name='message' onChange={handleChange} value={message}/>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" >Submit</Button>
      </CardFooter>
      </div>
      </div>
    </Card>
    </form>
  )
}

export default ApointmentFormLec
