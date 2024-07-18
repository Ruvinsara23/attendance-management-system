import React from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle, Repeat } from 'lucide-react';

const AppointmentCardTest = ({ appointment, onAccept, onReschedule }) => {
  const { studentName, date, time, status } = appointment;

  const statusStyles = {
    pending: 'text-yellow-500',
    confirmed: 'text-green-500',
    reschedule: 'text-blue-500',
    declined: 'text-red-500'
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex items-center mb-4">
          <User className="text-gray-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-700">{studentName}</h3>
        </div>
        <div className="flex items-center mb-2">
          <Calendar className="text-gray-500 mr-2" />
          <span className="text-gray-700">{date}</span>
        </div>
        <div className="flex items-center mb-4">
          <Clock className="text-gray-500 mr-2" />
          <span className="text-gray-700">{time}</span>
        </div>
        <div className={`flex items-center mb-4 ${statusStyles[status]}`}>
          {status === 'pending' && <XCircle className="mr-2" />}
          {status === 'confirmed' && <CheckCircle className="mr-2" />}
          {status === 'reschedule' && <Repeat className="mr-2" />}
          <span className="text-gray-700 capitalize">{status}</span>
        </div>
        <div className="flex justify-end">
          {status === 'pending' && (
            <button
              onClick={onAccept}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
            >
              Accept
            </button>
          )}
          {status === 'confirmed' && (
            <button
              onClick={onReschedule}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Reschedule
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCardTest;
