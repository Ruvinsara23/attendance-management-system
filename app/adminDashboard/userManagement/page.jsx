import React from 'react'
import CreateUser from '@/components/createUserForm/createUser'
import UserDeatilsTable from '@/components/userDetailsTable/userDeatilsTable'



const userManagement = () => {
  return (
    <div className='m-8 mr-5 flex items-center gap-10'>
    <div className='p-8 mr-10'> <CreateUser /></div>
    <div><UserDeatilsTable /></div>
     
      
    </div>
  )
}

export default userManagement
