import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { updateSessionStatus } from '@/app/services/lectureFirestoreService'
import { Badge } from '../ui/badge'
import QRCodeReader from '../qrCodeReader/qrCodeReader'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'


const 
DisplayCard = ({ session ,showActions = true,onStatusUpdate }) => {
  const [showQRScanner, setShowQRScanner] = useState(false);

        
const handleAction=async()=>{

   setShowQRScanner(true);
  
 

}
const handlFinish=async()=>{
  await updateSessionStatus({sessionID: session.id});
  if (onStatusUpdate) {
    onStatusUpdate();
   }

}

  return (
    <div>
    <Card className='mb-4  rounded-[16px] shadow-xl border-[#cf70ec] p-4 pb-0'>
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">{session.subjectName}</div>
        <Badge className={`text-xs ${session.status === false ? "px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium": ' bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium'}`} variant="outline">
        {session.status === true ? "Upcomming" :"completed" }
      </Badge>
       
      </div>
      <div className="text-sm text-gray-500 mb-4">{session.subjectCode}</div>
      <div className="text-sm text-gray-500 mb-2" >Session Date: {session.date}</div>
      <div className="text-sm text-gray-500 mb-2" >Session time: {session.time}</div>

      {showActions && (
      <div className="flex justify-between mb-2">
      
        <Button variant="secondary" size="sm">
          Cancel
        </Button>
        <Button onClick={handleAction}  size="sm">
        Mark Attendance
        </Button>
      </div>
    )}
    
    </CardContent>
  </Card>
  {showQRScanner && (
    
  <Dialog open={showQRScanner} onOpenChange={setShowQRScanner}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Attendance</DialogTitle>
            <DialogDescription>
              Scan the QR code to mark attendance.
            </DialogDescription>
          </DialogHeader>
          <QRCodeReader attendanceId={session.id}  />
          <DialogFooter>
            <Button onClick={handlFinish} >Finish Taking Attendance</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )}
    </div>
  )
}

export default DisplayCard
