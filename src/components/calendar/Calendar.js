import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import CalendarModeToggler from '../modeToggler/CalendarModeToggler'
import { useState, useRef, useEffect } from 'react'
import "./Calendar.css"



const Calendar = () => {

    const [events, setEvents] = useState();
    function createEvents(timeslots) {
        console.log(timeslots);
        const events = [];
        for (let i = 0; i < timeslots.length; i++){
            events.push({
                startTime: timeslots[i] + ':00',
            })
        }
        return events;
    }

    useEffect(async () => {
        const response = await fetch("http://localhost:3000/time_slot");
        const timeslots = await response.json();
        setEvents(createEvents(timeslots));
     }, [])

    const calendarRef = useRef();

    const [calendarMode, setCalendarMode] = useState("dayGrid");

    function setMode(mode) {
        let calendarApi = calendarRef.current.getApi();
        setCalendarMode(mode);
        calendarApi.changeView(mode);
    }




    return (
        <div className="page-center">
            <div className="calendar-wrapper">
                <CalendarModeToggler onChange = {(mode) => setMode(mode)} mode = {calendarMode}/>
                <FullCalendar
                  plugins={ [dayGridPlugin] }
                    initialView={calendarMode}
                    ref={calendarRef}
                    events={events}
                />
            </div>
        </div>
  )
}

export default Calendar