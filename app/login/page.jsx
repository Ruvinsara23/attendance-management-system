"use client"  
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { signInWithGooglePopup } from '@/firebaseUtils'
import { signInWithEmail,auth, db } from '../../utils/firebase/firebaseUtils'
import { doc, getDoc } from "firebase/firestore"
import { useUserContext } from '../context/userContext'

const defaultFormField={
  'email':"",
  'password':"",
}


const page = () => {
  const router = useRouter()
  const [formField, setformField] = useState(defaultFormField);
  const {email,password}=formField;
  const {setCurrentUser}=useUserContext ()
  
  const handleChange = (e) =>{
    const {name,value}=e.target

    setformField({...formField,[name]:value})
  } 
                              

  const handleLogin = async(event) => {
    event.preventDefault()

    try {
      const userCredential = await signInWithEmail(email, password);
      const user = userCredential.user;

     console.log("This is from login",userCredential)
 
    
      
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setCurrentUser({ ...user, ...userData });
        const userRole = userData.userRole;
            console.log(userRole);
        if (userRole === 'admin') {
          router.push("/adminDashboard");
        } else if (userRole === 'student') {
          router.push("/studentDashboard");
        } else if (userRole === 'lecturer') {
          router.push("/lectureDashboard");
        } else {
          router.push("/404");
        }
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }
      


  // const handleLoginWithGoogle=async()=>{

  //   const response=await signInWithGooglePopup();
  //   console.log(response);

  // }

  

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className=" text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name='email'
                value={email}
                onChange={handleChange} 
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required  onChange={handleChange} name='password' value={password}/>
            </div>
            <Button type="submit" className="w-full bg-[#B270EC]" onClick={handleLogin}>
              Login
            </Button>
          
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Contact Admin
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/login.svg"
          alt="Image"
          width="1920"
          height="1000"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default page
