"use client"
import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useUserContext } from '@/app/context/userContext'
import { useState,useEffect } from 'react'
import { updateUserProfileDetails } from '@/app/services/lectureFirestoreService'
import { updateUserDetails } from '@/app/services/adminFirestoreService'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const defaultFormFields = {
  userName: '',
  userRole: '',
  userID: '',
  department: '',
  course: '',
  dateOfBirth: '',
  address: '',
  email: '',
  phoneNumber: '',
  academicYear: '',
  qrCodeUrl: '',
  photoUrl: ''
};


const Userprofile = ({onSave}) => {
  const{currentUser}=useUserContext()
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Initialize form fields with currentUser data
    if (currentUser) {
      const { userName, userRole, userID, department, course, dateOfBirth, address, email, phoneNumber, academicYear, qrCodeUrl, photoUrl } = currentUser;
      setFormFields({
        userName,
        userRole,
        userID,
        department,
        course,
        dateOfBirth,
        address,
        email,
        phoneNumber,
        academicYear,
        qrCodeUrl,
        photoUrl
      });
    }
  }, [currentUser]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields(prevFields => ({
      ...prevFields,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, `users/${currentUser.userID}/${image.name}`);
      await uploadBytes(storageRef, image);
      const photoUrl = await getDownloadURL(storageRef);
      updatedData.photoUrl = photoUrl;
    }
    // Create an object with only the fields that have changed
    const updatedData = Object.keys(formFields).reduce((acc, key) => {
      if (formFields[key] !== currentUser[key]) {
        acc[key] = formFields[key];
      }
      return acc;

      
    }, {});

    // Ensure that userRole and userID are preserved
    updatedData.userRole = currentUser.userRole;
    updatedData.userID = currentUser.userID;

    // Update user details in Firestore
    const result = await updateUserProfileDetails(currentUser.userID, updatedData);
    if (result.success) {
      alert('User details updated successfully');
    } else {
      alert(`Failed to update user details: ${result.error}`);
    }}


  return (
    <form onSubmit={handleSubmit}>
    <div className='flex min-h-screen w-full flex-col justify-center align-baseline'>
   <div className='flex m-7 align-middle justify-center '>
   <img className="w-20 h-20 rounded-full mr-4" src="/Ellipse 2a.png" alt="Rounded avatar" />
   <label className="btn btn-outline">
   Change Profile picture
   <input type="file" onChange={handleImageChange} hidden />
 </label> 
   </div>
   <div className="grid gap-6">
   <p className="text-muted-foreground text-lg font-medium">Personal Information</p>
   <div className="grid grid-cols-2 gap-6">
     <div className="grid gap-2">
       <label className="text-muted-foreground">First Name</label>
       <input
         type="text"
         name="userName"
         value={formFields.userName.split(' ')[0] || ''}
         onChange={handleChange}
         className="input"
       />
     </div>
     <div className="grid gap-2">
       <label className="text-muted-foreground">Last Name</label>
       <input
         type="text"
         name="userName"
         value={formFields.userName.split(' ')[1] || ''}
         onChange={handleChange}
         className="input"
       />
     </div>
     <div className="grid gap-2">
       <label className="text-muted-foreground">Date of Birth</label>
       <input
         type="date"
         name="dateOfBirth"
         value={formFields.dateOfBirth}
         onChange={handleChange}
         className="input"
       />
     </div>
     <div className="grid gap-2">
       <label className="text-muted-foreground">Department</label>
       <input
         type="text"
         name="department"
         value={formFields.department}
         onChange={handleChange}
         className="input"
       />
     </div>
     <div className="grid gap-2">
       <label className="text-muted-foreground">Course</label>
       <input
         type="text"
         name="course"
         value={formFields.course}
         onChange={handleChange}
         className="input"
       />
     </div>
     <div className="grid gap-2">
       <label className="text-muted-foreground">User ID</label>
       <input
         type="text"
         name="userID"
         value={formFields.userID}
         disabled
         className="input"
       />
     </div>
   </div>
 </div>
 <div className="grid gap-6 mt-6">
   <p className="text-muted-foreground text-lg font-medium">Contact Information</p>
   <div className="grid grid-cols-2 gap-4">
     <div className="grid gap-2">
       <label className="text-muted-foreground">Address</label>
       <input
         type="text"
         name="address"
         value={formFields.address}
         onChange={handleChange}
         className="input"
       />
     </div>
     <div className="grid gap-2">
       <label className="text-muted-foreground">Phone</label>
       <input
         type="text"
         name="phoneNumber"
         value={formFields.phoneNumber}
         onChange={handleChange}
         className="input"
       />
     </div>
     <div className="grid gap-2">
       <label className="text-muted-foreground">Email</label>
       <input
         type="email"
         name="email"
         value={formFields.email}
         onChange={handleChange}
         className="input"
       />
     </div>
   </div>
 </div>

   
    </div>
    <button type="submit" className="mt-4 btn">Save Changes</button>
    </form>
  )
}

export default Userprofile
