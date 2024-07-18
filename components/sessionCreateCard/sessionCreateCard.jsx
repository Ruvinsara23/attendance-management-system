'use client' 
import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useUserContext } from '@/app/context/userContext'
import { useSessionsContext } from '@/app/context/sessionContext'
import { setDoc,doc,query,collection,getDocs,where} from 'firebase/firestore'
import { db } from '@/utils/firebase/firebaseUtils'
import { addSessions,addAttendance } from '@/app/services/lectureFirestoreService'


const defaultFormField={
 subjectName:'',
 subjectCode:'',
 date:'',
 time:''
}


const SessionCreateCard = () => {
   const [formField,setFormField]=useState(defaultFormField);
   const {subjectCode,subjectName,date,time} =formField; 
   const {currentUser}=useUserContext()
   const {setCurrentSessions}=useSessionsContext()
     

   const resetFormFields = () => {
    setFormField(defaultFormField);
  };

   const handleChange=(event)=>{
     const {name,value}=event.target

     setFormField({...formField,[name]:value})
   }

    const sessionId=`${subjectCode}${Date.now()}`

//    const addSessions=async()=>{
   
    
//       try {

        


//         await setDoc(doc(db, "sessions",sessionId  ), {
//           subjectName,
//           subjectCode,
//           date,
//           time,
//           status:true,
//           lecturerId: currentUser.userID,
//           createdAt: new Date(),
//         });
  
//         console.log("User document created in Firestore from session");
//       } catch (error) {
//         console.log("Error creating Session", error);
//       }


//    }


//    const addAttendance=async ()=>{

    
//     const subjectQuery = query(
//         collection(db, 'subjects'),
//         where('code', '==', subjectCode)
//       );
      
//       try {
//         const subjectSnapshot = await getDocs(subjectQuery);
//         let students ={} ;
        
//         if (subjectSnapshot.empty) {
//           console.log("No matching documents.");
//         } else {

//         let courseId;
//         subjectSnapshot.forEach((doc) => {
//          courseId= doc.data().courseId});
//          console.log("course Id",courseId)
//          const courseQuery = query(
//                     collection(db, 'courses'),
//                     where('id', '==',courseId))

//          const courseSnapshot = await getDocs(courseQuery);
//          let courseName;
//          courseSnapshot.forEach((doc) => {
//             courseName=doc.data().name})
//          console.log("Course name",courseName)


//          const studentQuery = query(
//                   collection(db, "users"),
//                   where("userRole", "==", "student"),
//                   where("course", "==", courseName)
//                 );
//                 const studentSnapshot = await getDocs(studentQuery);


             


//                 studentSnapshot.forEach((doc) => {
//                 students[doc.data().userID] = true
                      
//                     });
//                     console.log(students);
               

//         }
      
        
     
//         await setDoc(doc(db, "attendance", sessionId), {
//           courseCode: subjectCode,
//           lectureCode: currentUser.userID,
//           sessionId: sessionId,
//           attendance: students,
//           createdAt: new Date()
//         });
  
//         console.log("Attendance document created in Firestore");
//       } catch (error) {
//         console.log("Error creating attendance document", error);
//       }


//    } 
    


   const handleSubmit =async (event)=>{event.preventDefault();
   await setCurrentSessions(addSessions({sessionId, formField, lecturerId: currentUser.userID })) 
    console.log("session addSessions")
   await addAttendance({sessionId, formField, lecturerId: currentUser.userID })
   console.log(formField);

    resetFormFields()


   }

  return (
    <div>
    <form onSubmit={handleSubmit}>
    <Card>
    <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="student">Subject Name</Label>
            <Input type="text" id="Name"  name='subjectName' onChange={handleChange} value={subjectName} />
          </div>  
          <div>
            <Label htmlFor="subject">Subject Code</Label>
            <Input type="text" id="SubjectCode" name='subjectCode' value={subjectCode} onChange={handleChange}  />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" name='date' value={date} onChange={handleChange}  />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input type="time" id="time" name='time' value={time} onChange={handleChange}  />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Create Session</Button>
        </div>
    </CardContent>
  </Card>
  </form>
    </div>
  )
}

export default SessionCreateCard;
