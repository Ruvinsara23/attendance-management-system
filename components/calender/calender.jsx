import { Calendar as ShadcnCalendar } from "../ui/calendar";
import React, { useState,useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchSessionsAndAppointments } from "@/app/services/lectureFirestoreService";
import { useUserContext } from "@/app/context/userContext";


const localizer = momentLocalizer(moment);



const CalendarIn = () => {
    const [events, setEvents] = useState([]);
    const [view, setView] = useState('month');
    const [date, setDate] = useState(new Date());
    const {currentUser}=useUserContext()



      const transformDataForCalendar = (sessions, appointments) => {

        const addOneHour = (date, time) => {
          const start = new Date(date);
          const [hours, minutes] = time.split(':').map(Number);
          start.setHours(hours);
          start.setMinutes(minutes);
          const end = new Date(start.getTime() + 60 * 60 * 1000); // Add one hour
          return end;
        };
        const events = [
          ...sessions.map(session => ({
            title: session.subjectName,
            start: new Date(session.date),
            end: addOneHour(session.date, session.time),
             type: "session"
          })),
          ...appointments.map(appointment => ({
            title: appointment.subject,
            start: new Date(appointment.date),
            end:  addOneHour(appointment.date, appointment.time),
             type: "appointment"
          })),
        ];
      
        return events;
      };

      useEffect(() => {
        const getData = async () => {
          const { sessions, appointments } = await fetchSessionsAndAppointments({lecturerId:currentUser.userID});
          const transformedEvents = transformDataForCalendar(sessions, appointments);
          console.log("events",transformedEvents)
          setEvents(transformedEvents);
        };
        // setEvents(sampleEvents)
        getData();
      }, []);

      const handleSelectEvent = event => {
        alert(`Event: ${event.title}`);
      };
    
      const handleNavigate = newDate => {
        setDate(newDate);
      };
    
      const handleViewChange = newView => {
        setView(newView);
      };
    return (
      <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 600 , width:450}}
      selectable
      onSelectEvent={handleSelectEvent}
      onNavigate={handleNavigate}
      onView={handleViewChange}
      defaultView={view}
      view={view}
      date={date}
       className="custom-calendar"
       components={{
        event: ({ event }) => (
          <div className={`relative rbc-event ${event.type}`}>
            <div>{event.title}</div>
            <div className="rbc-event-info">
              {event.description}
            </div>
          </div>
        )
      }}

       
    />
    );
  };
  
  export default CalendarIn;