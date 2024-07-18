"use client"
import Image from "next/image";
import TestIT from "@/components/addData/test";
import { setDoc,doc,collection,addDoc } from "firebase/firestore";

import { db } from "@/utils/firebase/firebaseUtils";
import { Button } from "@/components/ui/button";
import { getAttendance, } from "./services/lectureFirestoreService";
import { getAttendanceCountsByDepartment } from "./services/adminFirestoreService";





export default function Home() {
    const subjects = [
        {
            "code": "MKT-101-1",
            "courseId": "ba_course_2",
            "name": "Principles of Marketing",
            "year": 1
        },
        {
            "code": "MKT-201-2",
            "courseId": "ba_course_2",
            "name": "Consumer Behavior",
            "year": 2
        },
        {
            "code": "MKT-301-3",
            "courseId": "ba_course_2",
            "name": "Marketing Research",
            "year": 3
        },
        {
            "code": "MKT-401-4",
            "courseId": "ba_course_2",
            "name": "Digital Marketing Strategies",
            "year": 4
        },
        {
            "code": "NUR-101-1",
            "courseId": "hs_course_1",
            "name": "Fundamentals of Nursing",
            "year": 1
        },
        {
            "code": "NUR-201-2",
            "courseId": "hs_course_1",
            "name": "Anatomy and Physiology",
            "year": 2
        },
        {
            "code": "NUR-301-3",
            "courseId": "hs_course_1",
            "name": "Pharmacology",
            "year": 3
        },
        {
            "code": "NUR-401-4",
            "courseId": "hs_course_1",
            "name": "Advanced Nursing Practices",
            "year": 4
        },
        {
            "code": "CHE-101-1",
            "courseId": "eng_course_4",
            "name": "Introduction to Chemical Engineering",
            "year": 1
        },
        {
            "code": "CHE-201-2",
            "courseId": "eng_course_4",
            "name": "Thermodynamics",
            "year": 2
        },
        {
            "code": "CHE-301-3",
            "courseId": "eng_course_4",
            "name": "Chemical Reaction Engineering",
            "year": 3
        },
        {
            "code": "CHE-401-4",
            "courseId": "eng_course_4",
            "name": "Process Design and Simulation",
            "year": 4
        }

    ];


    // async function addMarketingSubjectsToRealtimeDB() {
    //     const subjectCollectionRef = collection(db, 'subjects')
    //     for (const subject of subjects) {
    //         try {
    //           const docRef = await addDoc(subjectCollectionRef, subject);
    //           console.log(`Subject ${subject.subjectCode} added with ID:`, docRef.id);
    //         } catch (error) {
    //           console.error('Error adding subject:', error);
    //         }
    //       }
    // }
    
    const handleSubmit=()=>{
        getAttendanceCountsByDepartment().then(result => {
            console.log("Department-wise Attendance Counts:", result);
          }).catch(error => {
            console.error("Error getting attendance counts by department:", error);
          });
        // addMarketingSubjectsToRealtimeDB(subjects);

    }


    return(
        <div>
    
        <button onClick={handleSubmit}>Click me</button>
        </div>
    
    )
   


//     const timetables = [
//       {
//         courseId: 'ICT-101',
//         departmentId: 'ICT',
//         schedule: [
//           { day: 'Monday', time: '09:00-10:30', subjectCode: 'ICT-101-1', subjectName: 'Introduction to ICT', lectureID: 'lec001' },
//           { day: 'Monday', time: '10:30-12:00', subjectCode: 'ICT-101-2', subjectName: 'Computer Networks', lectureID: 'lec001' },
//           { day: 'Tuesday', time: '10:00-11:30', subjectCode: 'ICT-101-3', subjectName: 'Data Management', lectureID: 'lec002' },
//           { day: 'Wednesday', time: '11:00-12:30', subjectCode: 'ICT-101-4', subjectName: 'Software Development', lectureID: 'lec003' },
//           { day: 'Thursday', time: '14:00-15:30', subjectCode: 'ICT-101-5', subjectName: 'Network Security', lectureID: 'lec003' },
//           { day: 'Friday', time: '13:00-14:30', subjectCode: 'ICT-101-6', subjectName: 'Cloud Computing', lectureID: 'lec005' }
//         ]
//       },
//       {
//         courseId: 'ICT-102',
//         departmentId: 'ICT',
//         schedule: [
//           { day: 'Monday', time: '11:00-12:30', subjectCode: 'ICT-102-1', subjectName: 'Advanced Software Development', lectureID: 'lec006' },
//           { day: 'Monday', time: '13:00-14:30', subjectCode: 'ICT-102-2', subjectName: 'Database Systems', lectureID: 'lec006' },
//           { day: 'Tuesday', time: '09:00-10:30', subjectCode: 'ICT-102-3', subjectName: 'Computer Science Basics', lectureID: 'lec003' },
//           { day: 'Wednesday', time: '14:00-15:30', subjectCode: 'ICT-102-4', subjectName: 'Network and Security', lectureID: 'lec008' },
//           { day: 'Thursday', time: '13:00-14:30', subjectCode: 'ICT-102-5', subjectName: 'Software Engineering', lectureID: 'lec009' },
//           { day: 'Friday', time: '10:00-11:30', subjectCode: 'ICT-102-6', subjectName: 'Web Development', lectureID: 'lec010' }
//         ]
//       },
//       {
//         courseId: 'ICT-103',
//         departmentId: 'ICT',
//         schedule: [
//           { day: 'Monday', time: '14:00-15:30', subjectCode: 'ICT-103-1', subjectName: 'Network Architecture', lectureID: 'lec011' },
//           { day: 'Monday', time: '15:30-17:00', subjectCode: 'ICT-103-2', subjectName: 'Cloud Computing', lectureID: 'lec011' },
//           { day: 'Tuesday', time: '13:00-14:30', subjectCode: 'ICT-103-3', subjectName: 'Web Development', lectureID: 'lec012' },
//           { day: 'Wednesday', time: '09:00-10:30', subjectCode: 'ICT-103-4', subjectName: 'Mobile App Development', lectureID: 'lec003' },
//           { day: 'Thursday', time: '11:00-12:30', subjectCode: 'ICT-103-5', subjectName: 'Cybersecurity', lectureID: 'lec014' },
//           { day: 'Friday', time: '14:00-15:30', subjectCode: 'ICT-103-6', subjectName: 'Big Data Analytics', lectureID: 'lec015' }
//         ]
//       },
//       {
//         courseId: 'ICT-104',
//         departmentId: 'ICT',
//         schedule: [
//           { day: 'Monday', time: '10:00-11:30', subjectCode: 'ICT-104-1', subjectName: 'Machine Learning', lectureID: 'lec016' },
//           { day: 'Monday', time: '11:30-13:00', subjectCode: 'ICT-104-2', subjectName: 'Artificial Intelligence', lectureID: 'lec016' },
//           { day: 'Tuesday', time: '14:00-15:30', subjectCode: 'ICT-104-3', subjectName: 'Big Data Analytics', lectureID: 'lec003' },
//           { day: 'Wednesday', time: '13:00-14:30', subjectCode: 'ICT-104-4', subjectName: 'Deep Learning', lectureID: 'lec018' },
//           { day: 'Thursday', time: '09:00-10:30', subjectCode: 'ICT-104-5', subjectName: 'Natural Language Processing', lectureID: 'lec003' },
//           { day: 'Friday', time: '11:00-12:30', subjectCode: 'ICT-104-6', subjectName: 'Data Mining', lectureID: 'lec020' }
//         ]
//       },
//       {
//         courseId: 'CS-101',
//         departmentId: 'CS',
//         schedule: [
//           { day: 'Monday', time: '08:00-09:30', subjectCode: 'CS-101-1', subjectName: 'Introduction to Computer Science', lectureID: 'lec021' },
//           { day: 'Monday', time: '09:30-11:00', subjectCode: 'CS-101-2', subjectName: 'Algorithms', lectureID: 'lec021' },
//           { day: 'Tuesday', time: '09:30-11:00', subjectCode: 'CS-101-3', subjectName: 'Data Structures', lectureID: 'lec022' },
//           { day: 'Wednesday', time: '11:30-13:00', subjectCode: 'CS-101-4', subjectName: 'Discrete Mathematics', lectureID: 'lec003' },
//           { day: 'Thursday', time: '14:30-16:00', subjectCode: 'CS-101-5', subjectName: 'Operating Systems', lectureID: 'lec024' },
//           { day: 'Friday', time: '10:30-12:00', subjectCode: 'CS-101-6', subjectName: 'Computer Networks', lectureID: 'lec025' }
//         ]
//       },
//       {
//         courseId: 'CS-102',
//         departmentId: 'CS',
//         schedule: [
//           { day: 'Monday', time: '09:30-11:00', subjectCode: 'CS-102-1', subjectName: 'Software Engineering', lectureID: 'lec026' },
//           { day: 'Monday', time: '11:00-12:30', subjectCode: 'CS-102-2', subjectName: 'Computer Networks', lectureID: 'lec026' },
//           { day: 'Tuesday', time: '10:00-11:30', subjectCode: 'CS-102-3', subjectName: 'Database Systems', lectureID: 'lec003' },
//           { day: 'Wednesday', time: '13:00-14:30', subjectCode: 'CS-102-4', subjectName: 'Artificial Intelligence', lectureID: 'lec028' },
//           { day: 'Thursday', time: '08:00-09:30', subjectCode: 'CS-102-5', subjectName: 'Human-Computer Interaction', lectureID: 'lec029' },
//           { day: 'Friday', time: '14:00-15:30', subjectCode: 'CS-102-6', subjectName: 'Data Mining', lectureID: 'lec003' }
//         ]
//       },
//       {
//         courseId: 'CS-103',
//         departmentId: 'CS',
//         schedule: [
//           { day: 'Monday', time: '11:00-12:30', subjectCode: 'CS-103-1', subjectName: 'Web Development', lectureID: 'lec031' },
//           { day: 'Monday', time: '13:00-14:30', subjectCode: 'CS-103-2', subjectName: 'Mobile App Development', lectureID: 'lec003' },
//           { day: 'Tuesday', time: '08:00-09:30', subjectCode: 'CS-103-3', subjectName: 'Cloud Computing', lectureID: 'lec032' },
//           { day: 'Wednesday', time: '09:00-10:30', subjectCode: 'CS-103-4', subjectName: 'Big Data', lectureID: 'lec003' },
//           { day: 'Thursday', time: '10:00-11:30', subjectCode: 'CS-103-5', subjectName: 'Machine Learning', lectureID: 'lec003' }
//         ]
//       }
//     ];
  
//     const uploadTimetables = async () => {
//       const collectionRef = collection(db, "timetables");
//       for (const timetable of timetables) {
//         await addDoc(collectionRef, timetable);
//       }
//       console.log("Timetables uploaded successfully!");
//     };
    
    

  
//  const handleSubmit=()=>{
  
//   uploadTimetables()
  
//  }

 

//   return (
//     <div>
//     <h1>Student atending system</h1>
//     <Button onClick={handleSubmit}>click</Button>
//     </div>
    
//   );
}
