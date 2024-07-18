import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { addAppointment } from "@/app/services/studentFirestoreService"

const defaultFormFields={
studentName:'',
studentId:'',
date:'',
time:'',
subject:'',
message:'',
lecturer:''

}
const TestIT =()=> {
 const [formFields,setFormFields]=useState(defaultFormFields)
 const {studentName,studentId,date,time,subject,message,lecturer}=formFields



 
 const handleChange=(event)=>{
  const {name,value}=event.target
  setFormFields({...formFields,[name]:value})
  console.log(formFields)
 }

 const handleSelectChange = (value, name) => {
  setFormFields({ ...formFields, [name]: value })
}

const resetFormFields = () => {
  setFormFields(defaultFormFields);
};
const appointmentId=`${studentId}${Date.now()}`
const handleSubmit=()=>{
  
    addAppointment({formFields,appointmentId})
  resetFormFields()

}





  return (
    <form onSubmit={handleSubmit}>
    <Card className="w-[720px]" >
      <CardHeader>
        <CardTitle>Make a Appoinment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="student-name">Student Name</Label>
          <Input id="student-name" placeholder="Enter student name" name='studentName' onChange={handleChange} value={studentName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-enroll">Student Enrollment Number</Label>
          <Input id="student-enroll" placeholder="Enter enrollment number" name='studentId' onChange={handleChange} value={studentId} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
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
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="role">Lecture's Name</Label>
          <Select onValueChange={(value) => handleSelectChange(value, 'lecturer')}>
            <SelectTrigger id="role" name='lecturer' >
              <SelectValue placeholder="lec 1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem  name="lecturer 1"  value="Lecturer 1">lec 1</SelectItem>
              <SelectItem name="lecturer 3"  value="Lecturer 3" >lec 2</SelectItem>
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
    </Card>
    </form>
  )
}

export default TestIT 


