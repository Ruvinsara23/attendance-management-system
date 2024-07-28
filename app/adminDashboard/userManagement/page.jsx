import React from 'react'
import CreateUser from '@/components/createUserForm/createUser'
import UserDeatilsTable from '@/components/userDetailsTable/userDeatilsTable'



const userManagement = () => {
  return (
    <div className='m-8 flex'>
    <div className='p-8'> <CreateUser /></div>
    <div><UserDeatilsTable /></div>
     
      
    </div>
  )
}

export default userManagement
