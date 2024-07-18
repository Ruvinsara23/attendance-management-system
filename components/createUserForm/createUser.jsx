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
    qrCodeUrl:''

}





const CreateUser=()=> {
    const [formFields,setFormFields]=useState(defaultFormFields);
    const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

    const {userName, userRole,userID,department,course,email,dateOfBirth,address,phoneNumber,academicYear}= formFields;

   

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

const getMaxUserID = async (departmentId, academicYear) => {
  const userCollection = collection(db, 'users');
  const userQuery = query(userCollection, where('department', '==', departmentId), where('academicYear', '==', academicYear));
  const querySnapshot = await getDocs(userQuery);
  
  let maxID = 0;
  querySnapshot.forEach(doc => {
    const userId = doc.data().userID;
    const userNumber = parseInt(userId.match(/\d+$/)[0], 10);
    if (userNumber > maxID) {
      maxID = userNumber;
    }
  });
  return maxID;
};

const createUserID = async (department, academicYear) => {
  const maxUserID = await getMaxUserID(department, academicYear);
  const newUserIDNumber = (maxUserID + 1).toString().padStart(2, '0');
  return `stu${department}${academicYear.slice(-2)}${newUserIDNumber}`;
};

const generateTempPassword=()=>Math.random().toString(36).slice (-8)

const createUser =async ()=> {
const tempPassword="abcd1234"
const newUserID = await createUserID(department, academicYear);
const qrCodeData =`${newUserID}` ; 
const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

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
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create User</CardTitle>
          <CardDescription>Add a new user.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
              <Label htmlFor="role">User Role</Label>
              <Input id="id" placeholder="Enter user Role" onChange={handleChange} name='userRole' value={userRole} />    
            </div>
            
            <div className="space-y-2">
            <Label htmlFor="subject">Department</Label>
            <Select onValueChange={(value) => handleSelectChange('department', value)}>
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
            <Select onValueChange={(value) => handleSelectChange('course', value)} >
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
            <Input id="academic-year" placeholder="Enter academic year" onChange={handleChange}  name='academicYear' value={academicYear}/>
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