import React from 'react'
import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { updateAppointmentStatus } from '@/app/services/studentFirestoreService'
import { Calendar, Clock, User, CheckCircle, XCircle, Repeat } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
 


const AppointmentCard = ( {
   appointment, 

  showActions = true, 
  updateStatus,
  
  isStudent=true,
  } ) => {
  const [showFullMessage, setShowFullMessage] = useState(false);
  const {lecturer,studentId,date,time,subject,message,status,studentName }=appointment

  const statusClasses = {
    confirm: "status-confirm",
    complete: "status-complete",
    pending: "status-pending",
    cancel: "status-cancel"
  };
 
  const toggleMessageDisplay = () => {
    setShowFullMessage(!showFullMessage);
  };

  

    console.log  (appointment)
    
  return (
    <Card className="mb-4  bg-[#FBF6FE] rounded-[16px] shadow-xl border-[#cf70ec] p-4 pb-0">
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold flex items-center ">  <Avatar className='mr-3' >
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>{isStudent === true ? studentName:lecturer }</div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
            {status}
          </div>
      </div>
      <div className="text-sm text-gray-500 mb-1">{studentId}</div>
      <div className="text-sm text-gray-500 mb-4 flex items-center"><Calendar className='mr-3' /> {date} <Clock className='mr-3 ml-5' />{time}</div>
      <div className="font-semibold">{subject}</div>
      <div className={`text-sm text-gray-500 mb-5 ${showFullMessage ? '' : 'truncate'}`}>
      {message.length > 5 && (
        <button
          onClick={toggleMessageDisplay}
          className="text-gray text-sm"
        >
          {showFullMessage ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
    {showFullMessage && (
      <div className="text-sm text-gray-500 mb-5">
        {message}
      </div>
    )}
      
    {showActions && (
      <div className="flex justify-between mb-5 space-x-2">
      
      <Button variant="secondary" onClick={() =>updateStatus(appointment.id, 'cancel')} size="sm">
      Cancel
    </Button>
    {isStudent && (
      <div className="flex justify-end mb-3 space-x-2">
        {status === 'pending' && (
          <Button onClick={() => updateStatus(appointment.id, 'confirm')} size="sm">
            Accept
          </Button>
        )}
        {status === 'confirm' && (
          <Button onClick={() => updateStatus(appointment.id, 'complete')} size="sm">
            Reschedule
          </Button>
        )}
      </div>
    )}
      </div>
    )}
    </CardContent>
  </Card>
  )
}

export default AppointmentCard
// Lorem Ipsum is simply dummy text of the printing 
//       and typesetting industry. Lorem Ipsum has been the industry's standard dummy 
//       text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
     

// <div className="text-sm text-gray-500 mb-1">{studentId}</div>

// <Button variant="outline" size="sm">
//           Cancel
//         </Button>



// {message.length > 60 && (
//   <button
//     onClick={toggleMessageDisplay}
//     className="  text-gray text-sm mb-5"
//   >
//     {showFullMessage ? 'Show less' : 'Read more...'}
//   </button>
// )}