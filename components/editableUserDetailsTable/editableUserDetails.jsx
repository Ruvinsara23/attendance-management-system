import React, { useState ,useEffect} from 'react';
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Avatar,AvatarImage,AvatarFallback } from '../ui/avatar'
import { doc,updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase/firebaseUtils';

const EditableUserDetailsTable = ({ users, departments }) => {
  const [editableRow, setEditableRow] = useState(null);
  const [editedUsers, setEditedUsers] = useState(users);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    course: '',
    role: '',
  });
  const courses = Array.from(new Set(users.map(user => user.course))).filter(Boolean);

  useEffect(() => {
    let filtered = editedUsers;

    if (filters.department) {
      filtered = filtered.filter(user => user.department === filters.department);
    }

    if (filters.course) {
      filtered = filtered.filter(user => user.course === filters.course);
    }

    if (filters.role) {
      filtered = filtered.filter(user => user.userRole === filters.role);
    }

    if (searchTerm) {
        filtered = filtered.filter(user => 
            (user.userName && user.userName.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (user.userID && user.userID.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredUsers(filtered);
  }, [filters, searchTerm, editedUsers]);

 

  const handleEditClick = (userId) => {
    setEditableRow(userId);
  };

  const handleSaveClick = async (userId) => {
    const userToUpdate = editedUsers.find(user => user.id === userId);
    const userDocRef = doc(db, 'users', userId); 

    try {
      await updateDoc(userDocRef, userToUpdate);
      setEditableRow(null);
      console.log('user Updated')
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (e, userId, field) => {
    const updatedUsers = editedUsers.map(user => {
      if (user.id === userId) {
        return { ...user, [field]: e.target.value };
      }
      return user;
    });
    setEditedUsers(updatedUsers);
  };

  return (
    <div className='mt-2 custom-scrollbar '>
    <Card className='custom-scrollbar  overflow-y-auto  overflow-x-auto '>
    <div >
    <CardHeader >
    <CardTitle>User Details Table</CardTitle>
    <CardDescription>All user details Display this table</CardDescription>
    <div className='flex justify-between mb-6'>
    <div  >
      <label className="mr-2">Department:</label>
      <select name="department" onChange={handleFilterChange} className="border rounded p-1">
        <option value="">All</option>
        {Object.entries(departments).map(([id, name]) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </select>
    </div>

    <div className="mr-4">
          <label className="mr-2">Course:</label>
          <select name="course" onChange={handleFilterChange} className="border rounded p-1">
            <option value="">All</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>{course}</option>
            ))}
          </select>
        </div>

    <div>
      <label className="mr-2">Role:</label>
      <select name="role" onChange={handleFilterChange} className="border rounded p-1">
        <option value="">All</option>
        <option value="student">Student</option>
        <option value="lecturer">Lecturer</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    <div>
      <label className="mr-2">Search:</label>
      <input
        type="text"
        onChange={handleSearchChange}
        className="border rounded p-1"
        placeholder="Search  Name"
      />
    </div>
    </div>
    </CardHeader> 
  </div>
  
    <CardContent>
    <Table className='font-semibold bg-white max-h-96'>
      <TableHeader>
        <TableRow className='text-[#1F2937] m-5'>
          <TableHead className='text-[#1F2937]'>User Profile</TableHead>
          <TableHead className='text-[#1F2937]'>User Name</TableHead>
          <TableHead className='text-[#1F2937]'>UserId</TableHead>
          <TableHead className='text-[#1F2937]'>Course</TableHead>
          <TableHead className='text-[#1F2937]'>Department</TableHead>
          <TableHead className='text-[#1F2937]'>Address</TableHead>
          <TableHead className='text-[#1F2937]'>Phone Number</TableHead>
          <TableHead className='text-[#1F2937]'>User Role</TableHead>
          <TableHead className='text-[#1F2937]'  >Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='text-[#6B7280] overflow-auto custom-scrollbar max-h-[500px] '>
        {filteredUsers.map(user => (
          <TableRow key={user.id}>
            <TableCell>
              <Avatar>
                <AvatarImage src={user.photoUrl} alt={user.userName} />
                <AvatarFallback>{user.userName && user.userName[0]}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>
              {editableRow === user.id ? (
                <input
                  type="text"
                  value={user.userName}
                  onChange={(e) => handleChange(e, user.id, 'userName')}
                />
              ) : (
                user.userName
              )}
            </TableCell>
            <TableCell>{user.userID}</TableCell>
            <TableCell>
              {editableRow === user.id ? (
                <input
                  type="text"
                  value={user.course}
                  onChange={(e) => handleChange(e, user.id, 'course')}
                />
              ) : (
                user.course || 'Unknown Course'
              )}
            </TableCell>
            <TableCell>{departments[user.department]}</TableCell>
            <TableCell>
              {editableRow === user.id ? (
                <input
                  type="text"
                  value={user.address}
                  onChange={(e) => handleChange(e, user.id, 'address')}
                />
              ) : (
                user.address || 'N/A'
              )}
            </TableCell>
            <TableCell>
              {editableRow === user.id ? (
                <input
                  type="text"
                  value={user.phoneNumber}
                  onChange={(e) => handleChange(e, user.id, 'phoneNumber')}
                />
              ) : (
                user.phoneNumber || 'N/A'
              )}
            </TableCell>
            <TableCell>{user.userRole}</TableCell>
            <TableCell>
              {editableRow === user.id ? (
                <button onClick={() => handleSaveClick(user.id)}>Save</button>
              ) : (
                <button onClick={() => handleEditClick(user.id)}>Edit</button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </CardContent>
    </Card>
    </div>
  );
};

export default EditableUserDetailsTable;
