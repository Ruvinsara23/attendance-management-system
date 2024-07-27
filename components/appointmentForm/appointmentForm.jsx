  'use client'
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
import { getLecturers } from "@/app/services/studentFirestoreService"


const defaultFormFields={
studentName:'',
studentId:'',
date:'',
time:'',
subject:'',
message:'',
lecturer:'',
 lecturerId:''

}
const  AppointmentForm =({onAppointmentCreated,currentUser })=> {
  const [lecturers,setLecturers]=useState([])
 const [formFields,setFormFields]=useState(defaultFormFields)
 const {studentName,studentId,date,time,subject,message,lecturer,lecturerId}=formFields


 useEffect(() => {
  const fetchLecturers = async () => {
    const lecturersData = await getLecturers();
    setLecturers(lecturersData);
  };

  fetchLecturers();
}, [])


useEffect(() => {
  if (currentUser) {
    setFormFields((prevFields) => ({
      ...prevFields,
      studentName: currentUser.userName,
      studentId: currentUser.userID
    }));
  }
}, [currentUser])
 
 const handleChange=(event)=>{
  const {name,value}=event.target
  setFormFields({...formFields,[name]:value})
  console.log(formFields)
 }

 const handleSelectChange = (value, name) => {
  const { lecturerName, lecturerId } = JSON.parse(value);
  setFormFields({ ...formFields, lecturer: lecturerName, lecturerId });
};

const resetFormFields = () => {
  setFormFields({
    ...defaultFormFields,
    studentName: currentUser.userName,
    studentId: currentUser.userID
  });
};

const appointmentId=`${studentId}${Date.now()}`


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
          <Label htmlFor="student-name">Student Name</Label>
          <Input id="student-name" name="studentName" value={studentName} readOnly />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-enroll">Student Enrollment Number</Label>
          <Input id="student-enroll" name="studentId" value={studentId} readOnly />
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
          <Label htmlFor="role">Lecture's Name</Label>
          <Select onValueChange={(value) => handleSelectChange(value, 'lecturer')}>
            <SelectTrigger id="role" name='lecturer' >
              <SelectValue placeholder="select lecturer from your department" />
            </SelectTrigger>
            <SelectContent>
            {lecturers.map((lecturer) => (
              <SelectItem key={lecturer.id} value={JSON.stringify({ lecturerName: lecturer.userName, lecturerId: lecturer.userID })}>
                {lecturer.userName}
              </SelectItem>
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

export default AppointmentForm

