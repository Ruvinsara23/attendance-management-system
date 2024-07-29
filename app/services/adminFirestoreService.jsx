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
      if (attendanceData && attendanceData.attendance && attendanceData.subjectCode) {
        const subjectCode = attendanceData.subjectCode; 
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
            "Cardsubtext": "In today sessions",
            bgColor: "bg-[#86EFAC]", // Background color class
            textColor: "text-white"
          },
          {
            "Cardtitile": "Total Lecturers",
            "Cardcontent": 0,
            "Cardsubtext": "In today sessions", 
            bgColor: "bg-[#FCD34D]",// Background color class
             textColor: "text-white"
          },
          {
            "Cardtitile": "Total Admins",
            "Cardcontent": 0,
            "Cardsubtext": "In today sessions",
             bgColor: "bg-[#93C5FD]", // Background color class
            textColor: "text-white" // Background color class

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

            const chartData = [
              { browser: "students", visitors: studentCount, fill: "#B270EC" },
              { browser: "lecturers", visitors: lecturerCount, fill: "#D4A1F9" },
              { browser: "admins", visitors: adminCount, fill: "#EBCFFC" },
            ];
        
            console.log('Updated chartData:', chartData);
        

            return { cardData, chartData };
          } catch (error) {
            console.error('Error getting user counts:', error);
            throw error; 
          }
      }; 

      // export const fetchAttendanceForAdmin=async()=>{
      //   const attendanceQuery=query(collection(db,'attendance'),
      //   )
    
      //   const querySnapshot = await getDocs(  attendanceQuery);
      //   const attendanceData=[];
      //   querySnapshot.forEach((doc)=>{
      //     attendanceData.push({id:doc.id,...doc.data()})
      //   })
      //   console.log("from fuction",attendanceData)
      //   return attendanceData
    
       
    
      // }





const fetchCourses = async () => {
        const coursesCollectionRef = collection(db, 'courses');
        const q = query(coursesCollectionRef);
        const querySnapshot = await getDocs(q);
        const courses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return courses;
    };
    
    // Fetch all departments
const fetchDepartments = async () => {
        const departmentsCollectionRef = collection(db, 'departments');
        const q = query(departmentsCollectionRef);
        const querySnapshot = await getDocs(q);
        const departments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return departments;
    };
    
    // Fetch all subjects and map to courses and departments
const fetchSubjects = async () => {
        const subjectsCollectionRef = collection(db, 'subjects');
        const q = query(subjectsCollectionRef);
        const querySnapshot = await getDocs(q);
        const subjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return subjects;
    };
    
    // Fetch all attendance records
    const fetchAttendance = async () => {
        const attendanceCollectionRef = collection(db, 'attendance');
        const q = query(attendanceCollectionRef);
        const querySnapshot = await getDocs(q);
        const attendanceRecords = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // createdAt: doc.data().createdAt.toDate()// Convert Firestore timestamp to Date object
        }));
        return attendanceRecords;
    };
    
    export const fetchAttendanceForAdmin = async () => {
      try {
          
          const [courses, departments, subjects, attendance] = await Promise.all([
              fetchCourses(),
              fetchDepartments(),
              fetchSubjects(),
              fetchAttendance()
          ]);
  
         
          const courseToDepartmentMap = courses.reduce((map, course) => {
              map[course.id] = course.departmentId;
              return map;
          }, {});
  
      
          const departmentMap = departments.reduce((map, department) => {
              map[department.id] = department.name;
              return map;
          }, {});
  
         
          const subjectMap = subjects.map(subject => {
              const courseId = subject.courseId;
              const departmentId = courseToDepartmentMap[courseId];
              const departmentName = departmentMap[departmentId] || 'Unknown';
              return {
                  ...subject,
                  departmentName,
                  courseName: courses.find(course => course.id === courseId)?.name || 'Unknown'
              };
          });


  
          const subjectCodeMap = subjectMap.reduce((map, subject) => {
              map[subject.code] = subject;
              return map;
          }, {});
  
       
          const enhancedAttendance = attendance.map(record => {
              const subjectDetails = subjectCodeMap[record.subjectCode];
              let createdAt = record.createdAt;
              if (createdAt && typeof createdAt.toDate === "function") {
                createdAt = createdAt.toDate();
              }

              return {
                  ...record,
          
                  department: subjectDetails ? subjectDetails.departmentName : 'Unknown',
                  course: subjectDetails ? subjectDetails.courseName : 'Unknown',
                  subject: subjectDetails ? subjectDetails.name : 'Unknown',
                  createdAt
              };
          });
  
          return enhancedAttendance;
      } catch (error) {
          console.error("Error fetching attendance data: ", error);
          return [];
      }
  };

  export const fetchUserDetails= async()=>{

    const usersCollectionRef = collection(db, 'users');
    const usersQuery = query(usersCollectionRef);
    const usersQuerySnapshot = await getDocs(usersQuery);
    const usersData = usersQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const departmentsCollectionRef = collection(db, 'departments');
    const departmentsQuery = query(departmentsCollectionRef);
    const departmentsQuerySnapshot = await getDocs(departmentsQuery);
    const departmentsData = departmentsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  
    return { usersData, departmentsData };

  };


 
export const updateUserDetails = async (userId, userDetails) => {
  const userDocRef = doc(db, 'users', userId); // adjust the collection name if necessary

  try {
    await updateDoc(userDocRef, userDetails);
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};