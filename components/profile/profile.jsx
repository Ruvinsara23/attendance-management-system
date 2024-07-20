"use client"
import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"


const defaltFrom=[

]


export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-06-15",
    department: "Computer Science",
    course: "Bachelor of Science",
    userId: "12345678",
    address: "123 Main St, Anytown USA",
    phone: "+1 (555) 555-5555",
  })
  const handleEdit = () => {
    setIsEditing(true)
  }
  const handleSave = () => {
    setIsEditing(false)
  }


  return (
    <div className="bg-gradient-to-br  from-[#5c6ac4] to-[#b56cea] rounded-xl shadow-2xl  max-w-3xl mx-auto my-12 md:my-16 lg:my-20  w-full">
    <div className="flex justify-end p-7 ">

   <div className="rounded-md bg-white flex items-center pl-2 ">
    <Pencil  className=""/>
    <Button variant="outline" onClick={handleEdit} className="border-none">
    Edit
  </Button>
  </div>
    </div>
      <div className="flex flex-col items-center p-12">
        <div className="bg-white rounded-full shadow-md p-4">
          <Avatar className="h-32 w-32">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
        {isEditing ? (
            <h2 className="text-4xl font-bold text-white mt-6">
            {formData.firstName} {formData.lastName}
          </h2>
        ) : (
          <h2 className="text-4xl font-bold text-white mt-6">
            {formData.firstName} {formData.lastName}
          </h2>
        )}
        {isEditing ? (
            <p className="text-white/80 text-lg">Student</p>
        ) : (
          <p className="text-white/80 text-lg">Student</p>
        )}
      </div>
      <div className="bg-white rounded-b-xl p-8 grid gap-6">
        {isEditing ? (
          <div className="grid gap-6">
            <div className="grid gap-4">
              <p className="text-muted-foreground text-lg font-medium">Personal Information</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <p className="text-muted-foreground">First Name</p>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <p className="text-muted-foreground">Last Name</p>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <p className="text-muted-foreground">Date of Birth</p>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <p className="text-muted-foreground">Department</p>
                  <Input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <p className="text-muted-foreground">Course</p>
                  <Input
                    type="text"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <p className="text-muted-foreground">User ID</p>
                  <Input
                    type="text"
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <p className="text-muted-foreground text-lg font-medium">Contact Information</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <p className="text-muted-foreground">Address</p>
                  <Input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <p className="text-muted-foreground">Phone</p>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleSave}>
                Save
              </Button>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 w-[720px] p-20">
            <div className="grid gap-6">
              <p className="text-muted-foreground text-lg font-medium">Personal Information</p>
              <div className="grid grid-cols-2 mr-5 gap-6">
                <div className="grid gap-2">
                  <p className="text-muted-foreground">First Name</p>
                  <p>{formData.firstName}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-muted-foreground">Last Name</p>
                  <p>{formData.lastName}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-muted-foreground">Date of Birth</p>
                  <p>{formData.dateOfBirth}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-muted-foreground">Department</p>
                  <p>{formData.department}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-muted-foreground">Course</p>
                  <p>{formData.course}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-muted-foreground">User ID</p>
                  <p>{formData.userId}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <p className="text-muted-foreground text-lg font-medium">Contact Information</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <p className="text-muted-foreground">Address</p>
                  <p>{formData.address}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-muted-foreground">Phone</p>
                  <p>{formData.phone}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-muted-foreground">Phone</p>
                  <p>{formData.phone}</p>
                </div>
              </div>
            </div>
           
          </div>
        )}
      </div>
    </div>
  )
}