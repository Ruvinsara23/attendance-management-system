"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {

  ArrowUpRight,
  
} from "lucide-react"
import Link from "next/link"
import UserDetails from "../userProfileCard/userDetails"
import Userprofile from "../userProfileCard/userprofile"
import { useState } from "react"







const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(true)
  

  const handleEdit = () => {
    setIsEditing(false)
  }
  

  const handleSave = () => {
    setIsEditing(true);
  };

    return (
    <div className='flex min-h-screen w-full '>
    <main className="flex flex-1  flex-wrap gap-10 p-4 md:gap-8 md:p-8 justify-center align-middle">
    {isEditing ?(
    <Card className="max-w-[620px]">
    <CardHeader className="flex flex-row items-center">
       <div className="grid gap-4">
         <CardTitle>User profile</CardTitle>
         <CardTitle><Button onClick={handleEdit}>Edit user</Button></CardTitle>
  
       </div>
     </CardHeader>
     <CardContent>
     <UserDetails />
     </CardContent>
   </Card>
  ) :(
    <Card className="max-w-[620px]">
    <CardHeader className="flex flex-row items-center">
            <div className="grid gap-4">
              <CardTitle>Edit your profile</CardTitle>
              <CardDescription>
               You can update  your  profile.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
          <Userprofile onSave={handleSave} />
          </CardContent>
        </Card>
      )}
        </main>

    </div>
    );
  };
  
  export default UserProfilePage;