import { Calendar as ShadcnCalendar } from "../ui/calendar";
import React, { useState } from 'react';
const CalendarIn = () => {
    const [events, setEvents] = useState([
        { title: 'Math Class', start: '2024-06-21T10:00:00', end: '2024-06-21T11:00:00' },
        { title: 'Physics Class', start: '2024-06-21T11:30:00', end: '2024-06-21T12:30:00' },
        // More events...
      ]);
  
    return (
      <div className="calendar-container">
        <ShadcnCalendar events={events} />
      </div>
    );
  };
  
  export default CalendarIn;