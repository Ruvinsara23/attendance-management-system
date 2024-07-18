// components/AddPredefinedData.js
import { useState } from 'react';

import { setDoc,doc,query,collection,getDocs,where} from 'firebase/firestore'
import { db } from '@/utils/firebase/firebaseUtils'


const AddPredefinedData = () => {
//   const departments =[
//     {
//       "id": "ict",
//       "name": "Information Communication Technology",
//       "shortName": "ICT"
//     },
//     {
//       "id": "ba",
//       "name": "Business Administration",
//       "shortName": "BA"
//     },
//     {
//       "id": "eng",
//       "name": "Engineering",
//       "shortName": "ENG"
//     },
//     {
//       "id": "hs",
//       "name": "Health Sciences",
//       "shortName": "HS"
//     }
//   ]
  
//   const courses =[
//     {
//       "id": "ict_course_1",
//       "departmentId": "ict",
//       "name": "Information Communication Technology"
//     },
//     {
//       "id": "ict_course_2",
//       "departmentId": "ict",
//       "name": "Network Engineering"
//     },
//     {
//       "id": "ict_course_3",
//       "departmentId": "ict",
//       "name": "Software Development"
//     },
//     {
//       "id": "ict_course_4",
//       "departmentId": "ict",
//       "name": "Data Science"
//     },
//     {
//       "id": "ba_course_1",
//       "departmentId": "ba",
//       "name": "Finance"
//     },
//     {
//       "id": "ba_course_2",
//       "departmentId": "ba",
//       "name": "Marketing"
//     },
//     {
//       "id": "ba_course_3",
//       "departmentId": "ba",
//       "name": "Human Resources"
//     },
//     {
//       "id": "ba_course_4",
//       "departmentId": "ba",
//       "name": "Operations Management"
//     },
//     {
//       "id": "eng_course_1",
//       "departmentId": "eng",
//       "name": "Mechanical Engineering"
//     },
//     {
//       "id": "eng_course_2",
//       "departmentId": "eng",
//       "name": "Electrical Engineering"
//     },
//     {
//       "id": "eng_course_3",
//       "departmentId": "eng",
//       "name": "Civil Engineering"
//     },
//     {
//       "id": "eng_course_4",
//       "departmentId": "eng",
//       "name": "Chemical Engineering"
//     },
//     {
//       "id": "hs_course_1",
//       "departmentId": "hs",
//       "name": "Nursing"
//     },
//     {
//       "id": "hs_course_2",
//       "departmentId": "hs",
//       "name": "Public Health"
//     },
//     {
//       "id": "hs_course_3",
//       "departmentId": "hs",
//       "name": "Pharmacy"
//     }
//   ]
  

//   const subjects =[
//     {
//       "code": "ICT-101-3",
//       "name": "Introduction to ICT",
//       "year": 1,
//       "courseId": "ict_course_1"
//     },
//     {
//       "code": "ICT-102-4",
//       "name": "Computer Fundamentals",
//       "year": 1,
//       "courseId": "ict_course_1"
//     },
//     {
//       "code": "ICT-103-3",
//       "name": "Basic Programming",
//       "year": 1,
//       "courseId": "ict_course_1"
//     },
//     {
//       "code": "ICT-201-3",
//       "name": "Data Structures",
//       "year": 2,
//       "courseId": "ict_course_1"
//     },
//     {
//       "code": "ICT-202-4",
//       "name": "Operating Systems",
//       "year": 2,
//       "courseId": "ict_course_1"
//     },
//     {
//       "code": "ICT-203-3",
//       "name": "Database Systems",
//       "year": 2,
//       "courseId": "ict_course_1"
//     },
//     {
//       "code": "ICT-301-3",
//       "name": "Network Security",
//       "year": 3,
//       "courseId": "ict_course_1"
//     },
//     {
//       "code": "ICT-302-4",
//       "name": "Software Engineering",
//       "year": 3,
//       "courseId": "ict_course_1"
//     },
//     {
//       "code": "ICT-303-3",
//       "name": "Web Development",
//       "year": 3,
//       "courseId": "ict_course_1"
//     },
//     {
//       "code": "ICT-401-3",
//       "name": "Advanced Networking",
//       "year": 4,
//       "courseId": "ict_course_1"
//     },
//     {
//       "code": "ICT-402-4",
//       "name": "Cloud Computing",
//       "year": 4,
//       "courseId": "ict_course_1"
//     },
//     {
//       "code": "ICT-403-3",
//       "name": "Project Management",
//       "year": 4,
//       "courseId": "ict_course_1"
//     },
//     {
//       "code": "NE-101-3",
//       "name": "Introduction to Networks",
//       "year": 1,
//       "courseId": "ict_course_2"
//     },
//     {
//       "code": "NE-102-4",
//       "name": "Network Protocols",
//       "year": 1,
//       "courseId": "ict_course_2"
//     },
//     {
//       "code": "NE-103-3",
//       "name": "Network Devices",
//       "year": 1,
//       "courseId": "ict_course_2"
//     },
//     {
//       "code": "NE-201-3",
//       "name": "Wireless Networks",
//       "year": 2,
//       "courseId": "ict_course_2"
//     },
//     {
//       "code": "NE-202-4",
//       "name": "Routing and Switching",
//       "year": 2,
//       "courseId": "ict_course_2"
//     },
//     {
//       "code": "NE-203-3",
//       "name": "Network Troubleshooting",
//       "year": 2,
//       "courseId": "ict_course_2"
//     },
//     {
//       "code": "NE-301-3",
//       "name": "Advanced Networking",
//       "year": 3,
//       "courseId": "ict_course_2"
//     },
//     {
//       "code": "NE-302-4",
//       "name": "Network Security",
//       "year": 3,
//       "courseId": "ict_course_2"
//     },
//     {
//       "code": "NE-303-3",
//       "name": "Cloud Networking",
//       "year": 3,
//       "courseId": "ict_course_2"
//     },
//     {
//       "code": "NE-401-3",
//       "name": "Network Management",
//       "year": 4,
//       "courseId": "ict_course_2"
//     },
//     {
//       "code": "NE-402-4",
//       "name": "Network Automation",
//       "year": 4,
//       "courseId": "ict_course_2"
//     },
//     {
//       "code": "NE-403-3",
//       "name": "Network Project",
//       "year": 4,
//       "courseId": "ict_course_2"
//     },
//     {
//       "code": "SD-101-3",
//       "name": "Introduction to Programming",
//       "year": 1,
//       "courseId": "ict_course_3"
//     },
//     {
//       "code": "SD-102-4",
//       "name": "Object-Oriented Programming",
//       "year": 1,
//       "courseId": "ict_course_3"
//     },
//     {
//       "code": "SD-103-3",
//       "name": "Data Structures and Algorithms",
//       "year": 1,
//       "courseId": "ict_course_3"
//     },
//     {
//       "code": "SD-201-3",
//       "name": "Web Development",
//       "year": 2,
//       "courseId": "ict_course_3"
//     },
//     {
//       "code": "SD-202-4",
//       "name": "Mobile App Development",
//       "year": 2,
//       "courseId": "ict_course_3"
//     },
//     {
//       "code": "SD-203-3",
//       "name": "Database Management",
//       "year": 2,
//       "courseId": "ict_course_3"
//     },
//     {
//       "code": "SD-301-3",
//       "name": "Software Engineering",
//       "year": 3,
//       "courseId": "ict_course_3"
//     },
//     {
//       "code": "SD-302-4",
//       "name": "DevOps",
//       "year": 3,
//       "courseId": "ict_course_3"
//     },
//     {
//       "code": "SD-303-3",
//       "name": "Cloud Computing",
//       "year": 3,
//       "courseId": "ict_course_3"
//     },
//     {
//       "code": "SD-401-3",
//       "name": "Advanced Software Development",
//       "year": 4,
//       "courseId": "ict_course_3"
//     },
//     {
//       "code": "SD-402-4",
//       "name": "Machine Learning",
//       "year": 4,
//       "courseId": "ict_course_3"
//     },
//     {
//       "code": "SD-403-3",
//       "name": "Capstone Project",
//       "year": 4,
//       "courseId": "ict_course_3"
//     },
//     {
//       "code": "DS-101-3",
//       "name": "Introduction to Data Science",
//       "year": 1,
//       "courseId": "ict_course_4"
//     },
//     {
//       "code": "DS-102-4",
//       "name": "Statistics for Data Science",
//       "year": 1,
//       "courseId": "ict_course_4"
//     },
//     {
//       "code": "DS-103-3",
//       "name": "Data Visualization",
//       "year": 1,
//       "courseId": "ict_course_4"
//     },
//     {
//       "code": "DS-201-3",
//       "name": "Data Mining",
//       "year": 2,
//       "courseId": "ict_course_4"
//     },
//     {
//       "code": "DS-202-4",
//       "name": "Machine Learning",
//       "year": 2,
//       "courseId": "ict_course_4"
//     },
//     {
//       "code": "DS-203-3",
//       "name": "Big Data",
//       "year": 2,
//       "courseId": "ict_course_4"
//     },
//     {
//       "code": "DS-301-3",
//       "name": "Deep Learning",
//       "year": 3,
//       "courseId": "ict_course_4"
//     },
//     {
//       "code": "DS-302-4",
//       "name": "AI Ethics",
//       "year": 3,
//       "courseId": "ict_course_4"
//     },
//     {
//       "code": "DS-303-3",
//       "name": "Natural Language Processing",
//       "year": 3,
//       "courseId": "ict_course_4"
//     },
//     {
//       "code": "DS-401-3",
//       "name": "Advanced Data Science",
//       "year": 4,
//       "courseId": "ict_course_4"
//     },
//     {
//       "code": "DS-402-4",
//       "name": "AI and Robotics",
//       "year": 4,
//       "courseId": "ict_course_4"
//     },
//     {
//       "code": "DS-403-3",
//       "name": "Data Science Capstone",
//       "year": 4,
//       "courseId": "ict_course_4"
//     }
//   ]
   ;

  const [loading, setLoading] = useState(false);

//   const addDataToFirestore = async (collectionName, data) => {
//     const promises = data.map((item) =>
//       addDoc(collection(db, collectionName), item)
//     );
//     await Promise.all(promises);
//   };

  const handleAddData = async () => {

    const subjectQuery = query(
        collection(db, 'subjects'),
        where('code', '==', "ICT-101-3")
      );
      
      try {
        const subjectSnapshot = await getDocs(subjectQuery);
        
        if (subjectSnapshot.empty) {
          console.log("No matching documents.");
        } else {

        let courseId;
        subjectSnapshot.forEach((doc) => {
         courseId= doc.data().courseId});
         console.log("course Id",courseId)
         const courseQuery = query(
                    collection(db, 'courses'),
                    where('id', '==',courseId))

         const courseSnapshot = await getDocs(courseQuery);
         let courseName;
         courseSnapshot.forEach((doc) => {
            courseName=doc.data().name})
         console.log("Course name",courseName)


         const studentQuery = query(
                  collection(db, "users"),
                  where("userRole", "==", "student"),
                  where("course", "==", courseName)
                );
                const studentSnapshot = await getDocs(studentQuery);
                let students ={} ;
                studentSnapshot.forEach((doc) => {
                    students[doc.data().userID] = true
                      
                    });
                    console.log(students);
               

        }
      } catch (error) {
        console.error("Error getting subject documents: ", error);
      }
    
    // try {

    //     const subjectQuery = query(
    //         collection(db, 'subjects'),
    //         where('code', '==', "DS-402-4")
            
    //       );
         
    //       const subjectSnapshot = await getDocs(subjectQuery);
    //       console.log("from subject query",)
    
    //     //   if (subjectSnapshot.empty) {
    //     //     console.error('No matching course found for the subject name.');
    //     //     return;
    //     //   }

    //     //   const courseQuery = query(
    //     //     collection(db, 'courses'),
    //     //     where('id', '==', subjectSnapshot.forEach(()=>{
    //     //         doc.courseId 
    //     //         console.log("from coursequery",courseQuery)
    //     //     }))

            
    //     //   );
    //     //   const courseSnapshot = await getDocs(courseQuery);
    
    
    //     //   let courseName;
    //     //   courseSnapshot.forEach((doc) => {
    //     //     courseName= doc.data().name;
    //     //     console.log(courseName)
    //     //   });
    
        
    //     // const q = query(
    //     //   collection(db, "Users"),
    //     //   where("userRole", "==", "student"),
    //     //   where("course", "==", courseName)
    //     // );
    //     // const querySnapshot = await getDocs(q);
  
      
    //     // const students = {};
    //     // querySnapshot.forEach((doc) => {
    //     //   students[doc.id] = true;
    //     // });
    // console.log(students);
     
    //     // await setDoc(doc(db, "Attendance", sessionId), {
    //     //   courseCode: subjectCode,
    //     //   lectureCode: currentUser.userID,
    //     //   sessionId: sessionId,
    //     //   attendance: students,
    //     //   createdAt: new Date()
    //     // });
  
    //     console.log("Attendance document created in Firestore");
    //   } catch (error) {
    //     console.log("Error creating attendance document", error);
    //   }
 
  };

  return (
    <div>
      <h1>Add Predefined Data to Firestore</h1>
      <button onClick={handleAddData} disabled={loading}>
        {loading ? 'Adding Data...' : 'Add Data'}
      </button>
    </div>
  );
};

export default AddPredefinedData;
