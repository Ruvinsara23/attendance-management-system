
import { setDoc,doc,query,collection,getDocs,where, updateDoc,getDoc,} from 'firebase/firestore'

import { auth, db } from '@/utils/firebase/firebaseUtils'

import { signOut } from 'firebase/auth';


//  const sessionId=`${subjectCode}${Date.now()}`

 export const addSessions=async({sessionId,  formField, lecturerId })=>{
    const { subjectCode, subjectName,  date,
        time } = formField;
   
    
    try {

      


      await setDoc(doc(db, "sessions",sessionId), {
        subjectName,
        subjectCode,
        date,
        time,
        status:true,
        lecturerId,
        createdAt: new Date(),
      });

      console.log("User document created in Firestore from session");
    } catch (error) {
      console.log("Error creating Session", error);
    }


 }

 export const addAttendance = async ({ sessionId, formField, lecturerId }) => {
  const { subjectCode } = formField;

  const subjectQuery = query(
    collection(db, 'subjects'),
    where('code', '==', subjectCode)
  );

  try {
    const subjectSnapshot = await getDocs(subjectQuery);
    let students = {};

    if (subjectSnapshot.empty) {
      console.log("No matching documents.");
    } else {
      let courseId;
      subjectSnapshot.forEach((doc) => {
        courseId = doc.data().courseId;
      });
      console.log("Course Id", courseId);

      const courseQuery = query(
        collection(db, 'courses'),
        where('id', '==', courseId)
      );

      const courseSnapshot = await getDocs(courseQuery);
      let courseName;
      courseSnapshot.forEach((doc) => {
        courseName = doc.data().name;
      });
      console.log("Course name", courseName);

      const studentQuery = query(
        collection(db, "users"),
        where("userRole", "in", ["Student", "student"]),
        where("course", "==", courseName)
      );
      const studentSnapshot = await getDocs(studentQuery);

      studentSnapshot.forEach((doc) => {
        students[doc.data().userID] = false;
      });

      console.log("from add session", courseName, students);

      await setDoc(doc(db, "attendance", sessionId), {
        subjectCode: subjectCode,
        lectureCode: lecturerId,
        sessionId: sessionId,
        attendance: students,
        createdAt: new Date()
      });

      console.log("Attendance document created in Firestore");
    }
  } catch (error) {
    console.log("Error creating attendance document", error);
  }
}

// export const addAttendance=async ({sessionId,  formField, lecturerId })=>{
//     const { subjectCode, 
//    } = formField;

    
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
//                 students[doc.data().userID] = false
                      
//                     });
//                     console.log("from add session",courseName, students);
               

//         }
      
        
     
//         await setDoc(doc(db, "attendance", sessionId), {
//           subjectCode: subjectCode,
//           lectureCode: lecturerId ,
//           sessionId: sessionId,
//           attendance: students,
//           createdAt: new Date()
//         });
  
//         console.log("Attendance document created in Firestore");
//       } catch (error) {
//         console.log("Error creating attendance document", error);
//       }


//    } 

export const fetchSessions = async ({lecturerId}) => {
    const sessionQuery=query(collection(db,'sessions'),
      where('lecturerId','==',lecturerId),
      
     )

    const querySnapshot = await getDocs( sessionQuery);

    const sessionsData = [];
    querySnapshot.forEach((doc) => {
      sessionsData.push({ id: doc.id, ...doc.data() });
    });

    return sessionsData ;
  };

  export const updateSessionStatus = async ({ sessionID }) => {
    if (!sessionID) {
      throw new Error("Session ID is required to update session status.");
    }
  
    const sessionRef = doc(db, 'sessions', sessionID);
    try {
      await updateDoc(sessionRef, {
        status: false
      });
      console.log('Session status updated successfully');
    } catch (error) {
      console.error('Error updating session status:', error);
    }
  }


  export const fetchSessionsHistory = async ({lecturerId}) => {
    const sessionQuery=query(collection(db,'sessions'),
      where('lecturerId','==',lecturerId),
      where('status','==',false) )

    const querySnapshot = await getDocs( sessionQuery);

    const sessionsData = [];
    querySnapshot.forEach((doc) => {
      sessionsData.push({ id: doc.id, ...doc.data() });
    });

    return sessionsData ;
  };
 

  export const fetchAttendance=async({lecturerId})=>{
    console.log(lecturerId,"from fetch function")
    const attendanceQuery=query(collection(db,'attendance'),
    where('lectureCode',"==",lecturerId))

    const querySnapshot = await getDocs(  attendanceQuery);
    const attendanceData=[];
    querySnapshot.forEach((doc)=>{
      attendanceData.push({id:doc.id,...doc.data(),createdAt: doc.data().createdAt.toDate() })
    })
    console.log("from fuction",attendanceData)
    return attendanceData

   

  }

  export const fetchLecTimetable=async({lecturerId})=>{
    try {
      const timetablesCollection = collection(db, "timetables");
      const q = query(timetablesCollection);
      const querySnapshot = await getDocs(q);
  
      const lecturerTimetable = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.schedule.forEach(scheduleItem => {
          if (scheduleItem.lectureID === lecturerId) {
            lecturerTimetable.push({
              courseId: data.courseId,
              departmentId: data.departmentId,
              ...scheduleItem
            });
          }
        });
      });
  
      return lecturerTimetable;
    } catch (error) {
      console.error("Error retrieving timetable: ", error);
      return [];
    }


  }

  export const updateStudentAttendance=async(studentId,attendanceId)=>{
    // console.log("attendance Id",attendanceId)
      try {
        const attendanceRef = doc(db, 'attendance', attendanceId);
        const docSnap = await getDoc(attendanceRef);
        if (!docSnap.exists()) {
          throw new Error(`No document to update: ${attendanceId}`);
        }
        await updateDoc(attendanceRef, {
          [`attendance.${studentId}`]: true
        });
        console.log(`Attendance updated successfully for student ID: ${studentId}`);
      } catch (error) {
        console.log(`Failed to update attendance in firestore: ${error}`);
      }
    }
  
  export const fetchSessionsAndAppointments = async ({lecturerId}) => {
    const sessionsSnapshot = await getDocs(collection(db, "sessions"),
    where('lectureCode',"==",lecturerId));
    const appointmentsSnapshot = await getDocs(collection(db, "appointment"),
    where('lectureCode',"==",lecturerId));
  
    const sessions = sessionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    const appointments = appointmentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
   console.log('appointments',appointments,"sessions",sessions,'snap',sessionsSnapshot)
    return { sessions, appointments };
  };

  export const fetchStudents=async({department})=>{
    const studentQuery = query(
      collection(db, "users"),
      where("userRole", "==", "Student"),
      where("department", "==", department )
    );
    const studentSnapshot = await getDocs(studentQuery);

    const student=[];
    studentSnapshot.forEach((doc)=>{
      student.push({ id: doc.id, ...doc.data() })
    })
    console.log(student,"studentFrom firestore");
    return student
  }


  export const updateUserProfileDetails= async (userID, updatedData) => {
    try {
      // 1. Create a query to find the document
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('userID', '==', userID));
  
      // 2. Execute the query
      const querySnapshot = await getDocs(q);
  
      // 3. Check if the document exists
      if (querySnapshot.empty) {
        console.log('No matching documents.');
        return { success: false, error: 'No matching documents found' };
      }
  
  
      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(db, 'users', userDoc.id);
  

      const dataToUpdate = { ...updatedData};
  
      await updateDoc(userDocRef, dataToUpdate);
  
      console.log('User document updated successfully');
      return { success: true };
  
    } catch (error) {
      console.error('Error updating document: ', error);
      return { success: false, error: error.message };
    }
  };