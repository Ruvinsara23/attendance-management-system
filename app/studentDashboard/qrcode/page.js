"use client"
import { useEffect, useState } from 'react';
import { fetchQRCode } from '@/app/services/studentFirestoreService';

const QRCodePage = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const fetchAndSetQrCode=async()=>{
    const qrCodeUrl=await fetchQRCode()
    setQrCodeUrl(qrCodeUrl)
  }


  useEffect(() => {

    fetchAndSetQrCode();
  }, []);
    return (
      <div>
      <h1>Student Dashboard</h1>
      {qrCodeUrl ? <img src={qrCodeUrl} alt="User QR Code" /> : <p>Loading QR Code...</p>}
  
      </div>
    );
  };
  
  export default QRCodePage;
  