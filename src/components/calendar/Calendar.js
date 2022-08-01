import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import CalendarModeToggler from '../modeToggler/CalendarModeToggler'
import { useState, useRef } from 'react'
import "./Calendar.css"



const Calendar = () => {

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
                />
            </div>
        </div>
  )
}

export default Calendar