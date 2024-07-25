import React, { useState ,useEffect} from 'react';
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { Card, CardHeader } from '../ui/card'
import { Avatar,AvatarImage,AvatarFallback } from '../ui/avatar'
import { doc,updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase/firebaseUtils';

const EditableUserDetailsTable = ({ users, departments }) => {
  const [editableRow, setEditableRow] = useState(null);
  const [editedUsers, setEditedUsers] = useState(users);

  const handleEditClick = (userId) => {
    setEditableRow(userId);
  };

  const handleSaveClick = async (userId) => {
    const userToUpdate = editedUsers.find(user => user.id === userId);
    const userDocRef = doc(db, 'users', userId); // adjust the collection name if necessary

    try {
      await updateDoc(userDocRef, userToUpdate);
      setEditableRow(null);
      console.log('user Updated')
    } catch (error) {
      console.error('Error updating document: ', error);
    }
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
    <div className='mt-20 custom-scrollbar '>
    <Card className='custom-scrollbar  overflow-y-auto  overflow-x-auto '>
    <Table className='font-semibold bg-white max-h-96'>
      <TableHeader>
        <TableRow>
          <TableHead>User Profile</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead>UserId</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>User Role</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='text-[#6B7280] overflow-auto custom-scrollbar max-h-[500px] '>
        {editedUsers.map(user => (
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
    </Card>
    </div>
  );
};

export default EditableUserDetailsTable;
