import {setDoc,doc,query,collection,getDocs,where, updateDoc,getDoc } from "firebase/firestore"
import { db } from '@/utils/firebase/firebaseUtils'

export const fetchDepartmentsAndCourses = async () => {
    const departmentsCollection = collection(db, 'departments');
    const coursesCollection = collection(db, 'courses');
  
    const departmentsSnapshot = await getDocs(departmentsCollection);
    const coursesSnapshot = await getDocs(coursesCollection);
  
    const departments = departmentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    const courses = coursesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    return { departments, courses };
  };


export const getAttendanceCountsByDepartment=async () =>{
    try {
    const attendanceSnapshot = await getDocs(collection(db, "attendance"));
    const departmentsSnapshot = await getDocs(collection(db, "departments"));
    const coursesSnapshot = await getDocs(collection(db, "courses"));
    const subjectsSnapshot = await getDocs(collection(db, "subjects"));

    const departments = {};
    const courses = {};
    const subjects = {};


    subjectsSnapshot.forEach(doc => {
      const subjectData = doc.data();
      if (subjectData.code && subjectData.courseId) {
        subjects[subjectData.code] = subjectData.courseId;
      }
    });

    console.log("Subjects mapping:", subjects);

    
    coursesSnapshot.forEach(doc => {
      const courseData = doc.data();
      if (courseData.id && courseData.departmentId) {
        courses[courseData.id] = courseData.departmentId;
      }
    });

    console.log("Courses mapping:", courses);

    departmentsSnapshot.forEach(doc => {
      const deptData = doc.data();
      if (deptData.id) {
        departments[deptData.id] = {
          name: deptData.name,
          trueCount: 0,
          falseCount: 0
        };
      }
    });

    console.log("Departments initialized:", departments);

   
    attendanceSnapshot.forEach(doc => {
      const attendanceData = doc.data();
      if (attendanceData && attendanceData.attendance && attendanceData.courseCode) {
        const subjectCode = attendanceData.courseCode; 
        const courseId = subjects[subjectCode];
        const departmentId = courses[courseId];

        console.log(`Processing attendance for subjectCode: ${subjectCode}, courseId: ${courseId}, departmentId: ${departmentId}`);

        if (departmentId && departments[departmentId]) {
          Object.values(attendanceData.attendance).forEach(isPresent => {
            if (isPresent) {
              departments[departmentId].trueCount++;
            } else {
              departments[departmentId].falseCount++;
            }
          });
        }
      }
    });

    return Object.values(departments).map(department => ({
        department: department.name,
        trueCount: department.trueCount,
        falseCount: department.falseCount
      }));
    } catch (error) {
      console.error("Error getting attendance counts by department:", error);
    }
    }
    
    
    export const getUserCounts = async () => {
        const cardData = [
          {
            "Cardtitile": "Total Students",
            "Cardcontent": 0,
            "Cardsubtext": "In today sessions"
          },
          {
            "Cardtitile": "Total Lecturers",
            "Cardcontent": 0,
            "Cardsubtext": "In today sessions"
          },
          {
            "Cardtitile": "Total Admins",
            "Cardcontent": 0,
            "Cardsubtext": "In today sessions"
          },
        ];
      
        try {
            const userCollectionRef = collection(db, 'users');
            const userCollectionSnapshot = await getDocs(userCollectionRef);
            let studentCount = 0;
            let lecturerCount = 0;
            let adminCount = 0;
        
            const userPromises = userCollectionSnapshot.docs.map(async (userDocRef) => {
              const userDoc = await getDoc(doc(db, 'users', userDocRef.id));
              const userData = userDoc.data();
        
              if (userData.userRole === 'student') {
                studentCount++;
              } else if (userData.userRole === 'lecturer') {
                lecturerCount++;
              } else if (userData.userRole === 'admin') {
                adminCount++;
              }
            });
        
            await Promise.all(userPromises);
        
            cardData[0].Cardcontent = studentCount;
            cardData[1].Cardcontent = lecturerCount;
            cardData[2].Cardcontent = adminCount;
        
            console.log('Updated cardData:', cardData);
            return cardData; 
          } catch (error) {
            console.error('Error getting user counts:', error);
            throw error; 
          }
      }; 

      export const fetchAttendanceForAdmin=async()=>{
        const attendanceQuery=query(collection(db,'attendance'),
        )
    
        const querySnapshot = await getDocs(  attendanceQuery);
        const attendanceData=[];
        querySnapshot.forEach((doc)=>{
          attendanceData.push({id:doc.id,...doc.data()})
        })
        console.log("from fuction",attendanceData)
        return attendanceData
    
       
    
      }