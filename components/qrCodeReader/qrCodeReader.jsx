import React from 'react'
import { updateStudentAttendance } from '@/app/services/lectureFirestoreService'
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const QrScanner = dynamic(() => import('react-qr-scanner').then(mod => mod.default), { ssr: false });






const QRCodeReader = ({ attendanceId }) => {
const [result, setResult] = useState('');
const [isScanning, setIsScanning] = useState(true);


const handleScan=async(data)=>{
    if (data) {
        setResult(data.text);
        const studentId = data.text;
        setIsScanning(false);
        try {
          const audio = new Audio('/store-scanner-beep-90395.mp3');
          audio.play().catch(error => console.error('Error playing audio:', error));

            await updateStudentAttendance ( studentId,attendanceId,);
            console.log(`Attendance updated successfully for student ID: ${studentId}`);
            
            toast.success(`Attendance updated successfully for student ID: ${studentId}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,})

          } catch (error) {
            console.log(`Failed to update attendance: ${error}`);
            console.log(`Failed to update attendance: ${error}`);
        toast.error(`Failed to update attendance: ${error}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        
          } finally {
            
            setTimeout(() => {
              setIsScanning(true);
            }, 5000); 
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
      delay={500}
      onError={handleError}
      onScan={handleScan}
      style={previewStyle}
    />
    <ToastContainer />
    <p></p>
  </div>
    </div>
  )
}

export default QRCodeReader
