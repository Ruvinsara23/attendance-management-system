import React from 'react'
import { updateStudentAttendance } from '@/app/services/lectureFirestoreService'
import { useState,useEffect } from 'react';
import dynamic from 'next/dynamic';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';
const QrScanner = dynamic(() => import('react-qr-scanner').then(mod => mod.default), { ssr: false });






const QRCodeReader = ({ attendanceId, debounceDelay = 2000 }) => {
const [result, setResult] = useState('');
const lastScannedTimeRef = useRef(0);
 

const handleScan=async(data)=>{
  if (data && data.text !== result) {
    const currentTime = new Date().getTime();
    if (currentTime - lastScannedTimeRef.current < debounceDelay) {
      // Ignore scan if it occurs within the debounce delay
      return;
    }

    lastScannedTimeRef.current = currentTime;
    setResult(data.text);

    const studentId = data.text;

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

        
          } 

          // finally {
          //   // Set timeout only after attendance update is confirmed
          //   timeoutId = setTimeout(() => setIsScanning(true), restartTimeout);
          // }
 }
 


}

useEffect(() => {return() => clearTimeout(lastScannedTimeRef.current)}, [])

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
      delay={5000}
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
