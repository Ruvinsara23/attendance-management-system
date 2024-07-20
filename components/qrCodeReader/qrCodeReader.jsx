import React from 'react'
import { updateStudentAttendance } from '@/app/services/lectureFirestoreService'
import { useState } from 'react';
import dynamic from 'next/dynamic';



const QrScanner = dynamic(() => import('react-qr-scanner').then(mod => mod.default), { ssr: false });



const QRCodeReader = ({ attendanceId }) => {
const [result, setResult] = useState('');
  const [message, setMessage] = useState('');


const handleScan=async(data)=>{
    if (data) {
        setResult(data.text);
        const studentId = data.text;
        try {
            await updateStudentAttendance ( studentId,attendanceId,);
            console.log(`Attendance updated successfully for student ID: ${studentId}`);
          } catch (error) {
            console.log(`Failed to update attendance: ${error}`);
          } 
  
 }



}

const handleError = (err) => {
    console.error(err);
    ;
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };


  return (
    <div>
    <div>
    <QrScanner
      delay={300}
      onError={handleError}
      onScan={handleScan}
      style={previewStyle}
    />
    <p></p>
  </div>
    </div>
  )
}

export default QRCodeReader
