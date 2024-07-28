"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState,useEffect } from "react"
import { auth,signInWithEmail,db} from "@/utils/firebase/firebaseUtils"
import { sendPasswordResetEmail,createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc,doc,query,collection,getDocs,where, updateDoc} from "firebase/firestore"
import { fetchDepartmentsAndCourses } from "@/app/services/adminFirestoreService"
import QRCode from 'qrcode';

import * as style from '@dicebear/adventurer';


const defaultFormFields={
    userName:'',
    userRole:'',
    userID:'',
    department:'',
    course:'',
    dateOfBirth:'',
    address:'',
    email:'',
    phoneNumber:'',
    academicYear:'',
    qrCodeUrl:'',
    photoUrl:''

}





const CreateUser=()=> {
    const [formFields,setFormFields]=useState(defaultFormFields);
    const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

    const {userName, userRole,userID,department,course,email,dateOfBirth,address,phoneNumber,academicYear,photoUrl}= formFields;

   

    useEffect(() => {
      const loadData = async () => {
        const { departments, courses } = await fetchDepartmentsAndCourses();
        setDepartments(departments);
        setCourses(courses);
      };
  
      loadData();
    }, []);

    useEffect(() => {
      if (department) {
        const filtered = courses.filter(course => course.departmentId === department);
        setFilteredCourses(filtered);
      } else {
        setFilteredCourses([]);
      }
    }, [department, courses]);




console.log (formFields )

const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

const handleChange=(event)=>{
       const {name,value}=event.target; 
       setFormFields({...formFields,[name]:value})
    
}
const handleSelectChange = (name, value) => {
  setFormFields({ ...formFields, [name]: value });

}

// const getMaxUserID = async (departmentId, academicYear) => {
//   const userCollection = collection(db, 'users');
//   const userQuery = query(userCollection, where('department', '==', departmentId), where('academicYear', '==', academicYear));
//   const querySnapshot = await getDocs(userQuery);
  
//   let maxID = 0;
//   querySnapshot.forEach(doc => {
//     const userId = doc.data().userID;
//     const regex = new RegExp(`^stu${departmentId}${academicYear.slice(-2)}(\\d{3})$`);
//     const match = userId.match(regex);
//     if (match) {
//       const userNumber = parseInt(match[1], 10);
//       if (userNumber > maxID) {
//         maxID = userNumber;
//       }
//     }
//   });
//   return maxID;
// };




// const createUserID = async (department, academicYear) => {
//   const maxUserID = await getMaxUserID(department, academicYear);
//   const newUserIDNumber = (maxUserID + 1).toString().padStart(3, '0');
//   return `stu${department}${academicYear.slice(-2)}${newUserIDNumber}`;
// };

const getMaxUserID = async (departmentId, academicYear, userRole) => {
  const userCollection = collection(db, 'users');
  const userQuery = query(userCollection, where('department', '==', departmentId), where('academicYear', '==', academicYear));
  const querySnapshot = await getDocs(userQuery);
  
  let maxID = 0;
  querySnapshot.forEach(doc => {
    const userId = doc.data().userID;
    let regex;
    
    if (userRole === 'student') {
      regex = new RegExp(`^stu${departmentId}${academicYear.slice(-2)}(\\d{3})$`);
    } else if (userRole === 'lecturer') {
      regex = new RegExp(`^lec${departmentId}(\\d{3})$`);
    } else if (userRole === 'admin') {
      regex = new RegExp(`^admin${departmentId}(\\d{3})$`);
    }
    
    const match = userId.match(regex);
    if (match) {
      const userNumber = parseInt(match[1], 10);
      if (userNumber > maxID) {
        maxID = userNumber;
      }
    }
  });
  return maxID;
};

const createUserID = async (department, academicYear, userRole) => {
  const maxUserID = await getMaxUserID(department, academicYear, userRole);
  const newUserIDNumber = (maxUserID + 1).toString().padStart(3, '0');
  
  if (userRole === 'student') {
    return `stu${department}${academicYear.slice(-2)}${newUserIDNumber}`;
  } else if (userRole === 'lecturer') {
    return `lec${department}${newUserIDNumber}`;
  } else if (userRole === 'admin') {
    return `admin${department}${newUserIDNumber}`;
  }
};



// function generateAvatar(userName) {
//   const svg = createAvatar(style, {
//     seed: userName,
//     backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9'],
//   });
//   // Convert SVG to a Data URI
//   const svgDataUri = `data:image/svg+xml;base64,${btoa(svg)}`;
//   return svgDataUri;
// }


const generateTempPassword=()=>Math.random().toString(36).slice (-8)

const createUser =async ()=> {
const tempPassword= 'abcd1234'
const newUserID = await createUserID(department, academicYear, userRole);
const qrCodeData =`${newUserID}` ; 
const qrCodeUrl = await QRCode.toDataURL(qrCodeData);
console.log(newUserID ,"new user id")

try {
    const userCredential=await
    createUserWithEmailAndPassword (auth ,email,tempPassword)
    const user=userCredential.user;
    console.log("user created:",user);

    await setDoc(doc(db, "users", user.uid), {
      userName,
      userRole,
      userID: newUserID,
      department,
      course,
      dateOfBirth,
      address,
      email,
      phoneNumber,
      academicYear,
      qrCodeUrl,
      photoUrl,
      createdAt: new Date().toISOString(),
    });

await
console.log("User document created in Firestore");
// sendPasswordResetEmail(auth,email);
// console.log("Password reset Email sent to:",email);
}

catch (error){
console.log("Error creating User",error);
}


}

const handleSubmit = async (event) => {
    event.preventDefault();
   await createUser() ;
   resetFormFields()
 


}


    return (
      <Card className="w-full max-w-2xl border-black p-10">
        <CardHeader>
          <CardTitle>Create User</CardTitle>
          <CardDescription>Add a new user.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
        <CardContent className="space-y-9">
        <div className="grid grid-cols-2 gap-20">
        <div className="space-y-9">
              <Label htmlFor="role">User Role</Label>
              <div>
              <label className="mr-2">Role:</label>
              <select name="role" onChange={(e) => handleSelectChange('userRole', e.target.value)}  className="border rounded p-1">
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
        
            </div>
            
            <div className="space-y-2">
            <Label htmlFor="subject">Department</Label>
            <Select onValueChange={(value) => handleSelectChange('department', value) } disabled={userRole =='admin'}>
              <SelectTrigger id="department" >
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
              {departments.map(dept => (
                  <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
            <Label htmlFor="subject">Course</Label>
            <Select onValueChange={(value) => handleSelectChange('course', value)}  disabled={userRole !== 'student'} >
              <SelectTrigger id="Course" >
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
              {filteredCourses.map(course => (
                  <SelectItem  key={course.id} value={course.name}>{course.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
            <div className="space-y-2">
            <Label htmlFor="academic-year">Academic Year</Label>
            <Input id="academic-year" placeholder="Enter academic year" onChange={handleChange}  name='academicYear' value={academicYear}  disabled={userRole !== 'student'}/>
          </div>
        </div>
       
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">User Name</Label>
              <Input id="name" placeholder="Enter user name" onChange={handleChange} name='userName' value={userName}/>
            </div>
            
         
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" onChange={handleChange} name='dateOfBirth'  value={dateOfBirth}/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Enter address" onChange={handleChange} name=' address' value={ address} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" onChange={handleChange} name='email' value={email}/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="Enter phone number" onChange={handleChange}  name='phoneNumber' value={phoneNumber}/>
            </div>
           
          </div>
          
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto">
            Create User
          </Button>
        </CardFooter>
        </form>
      </Card>
    )
  }

  export default CreateUser


//   <Select id="role" onChange={handleSelectChange }  value={userRole} name='userRole'>
//   <SelectTrigger>
//     <SelectValue placeholder="Select user role" onChange={handleCange} name='userRole' value={userRole} />
//   </SelectTrigger>
//   <SelectContent>
//     <SelectItem value="lecturer"  >Lecturer</SelectItem>
//     <SelectItem value="student" >Student</SelectItem>
//     <SelectItem value="admin" >Admin</SelectItem>
//   </SelectContent>
// </Select>