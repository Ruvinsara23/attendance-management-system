import { setDoc,doc,query,collection,getDocs,where, updateDoc} from 'firebase/firestore'

import { db } from '@/utils/firebase/firebaseUtils'



export const addAppointment=async({formFields,appointmentId})=>{
    const {studentName,studentId,date,time,subject,message,lecturer}=formFields

    try{
        await setDoc(doc(db,"appointment",appointmentId),{
            studentName,
            studentId,
            date,
            time,
            subject,
            message,
            lecturer:'Lecturer 3',
            lecturerId:"",
            status:'pending',
            createdAt: new Date(),
        }),
        
       
        
        console.log("User document created in Firestore from appointment");
    }catch(error){
        console.log("Error creating appointment creating", error);
    }

} 



export const fetchAppointment = async () => {
    const appointmentQuery=query(collection(db,'appointment'),
      where('lecturer','==',"Lecturer 3"),
      
     )

    const querySnapshot = await getDocs(appointmentQuery);

    const appointmentData =[];
    querySnapshot.forEach((doc) => {
        appointmentData.push({ id: doc.id, ...doc.data() });
    });

    return appointmentData ;
  };


  export const updateAppointmentStatus = async ({ appointmentID,status }) => {
    if (!appointmentID) {
      throw new Error("Session ID is required to update session status.");
    }
  
    const appointmentRef = doc(db, 'appointment', appointmentID);
    try {
      await updateDoc(appointmentRef , {
        status:status
      });
      console.log('appointment status updated successfully');
    } catch (error) {
      console.error('Error updating session status:', error);
    }
  }

  export const getLecturers=async()=>{

    const lecturerQuery = query(
        collection(db, "users"),
        where("userRole", "==", "lecturer"),
        where("department", "==", "hs")
      );
      const lecturerSnapshot = await getDocs(lecturerQuery);

      const lecturer=[];
      lecturerSnapshot.forEach((doc)=>{
        lecturer.push({ id: doc.id, ...doc.data() })
      })
      console.log(lecturer);
      return lecturer
          
     

  }


  export const fetchStuAttendance=async()=>{
    const attendanceQuery=query(collection(db,'attendance'),
    where('attendance.stuict21001', 'in', [true, false]),
)

    const querySnapshot = await getDocs( attendanceQuery);
    const attendanceData=[];
    querySnapshot.forEach((doc)=>{
      attendanceData.push({id:doc.id,...doc.data(),
        createdAt: doc.data().createdAt.toDate() 
      })
    })
    console.log("from fuction  fff",attendanceData)
    return attendanceData
   

  }


  export const fetchQRCode = async () => {
    try{
      const qrCodeQuery=query(collection(db,'users'),
    where('userID',"==",'stueng21002')
  )
  const querySnapshot=await getDocs(qrCodeQuery);
   let qrCodeUrl = null;
   querySnapshot.forEach((doc) => {
    qrCodeUrl = doc.data().qrCodeUrl;
    });
    return qrCodeUrl;

    }catch(error){
      console.error("Error retrieving Qr fetching: ", error)
    }
    
    
  };

 
  const getStudentAttendance = async (studentId) => {
    const attendanceRef = firestore.collection('attendance');
    const snapshot = await attendanceRef.where(studentId, '==', true).get();
  
    if (snapshot.empty) {
      console.log('No matching documents.');
      return [];
    } 
  
    const attendanceData = [];
    snapshot.forEach(doc => {
      attendanceData.push(doc.data());
    });
  
    return attendanceData;
  };

  export const fetchStdTimetable = async () => {
    const timetableCollection = collection(db, 'timetables'); 
    const timetableQuery = query(timetableCollection, where('courseId', '==', 'ICT-103'));
    const timetableSnapshot = await getDocs(timetableQuery);
    const timetableList = timetableSnapshot.docs.map(doc => doc.data());
    return timetableList;
  };