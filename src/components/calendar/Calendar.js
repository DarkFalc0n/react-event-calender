import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import CalendarModeToggler from '../modeToggler/CalendarModeToggler'
import { useState, useRef, useEffect } from 'react'
import holidaydata from './2022holidays.json'
import "./Calendar.css"




const Calendar = () => {

    const [events, setEvents] = useState();
    const [holidays, setHolidays] = useState();

    function parseHolidays(holidays) {
        const holidayEvents = [];
        for (let i = 0; i < holidays.length; i++){
            holidayEvents.push({
                start: holidays[i].date,
                title: holidays[i].name,
            })
        }
        return holidayEvents;
    }

    function createEvents(timeslots) {
        const events = [];
        for (let i = 0; i < timeslots.length; i++){
            events.push({
                startTime: timeslots[i] + ':00',
                color: "#dc562e",
            })
        }
        return events;
    }

    useEffect(async () => {
        const eventResponse = await fetch("http://139.59.34.126:8000/api/public/timeslots/Torq03%20Ezone%20Club,%20Marathalli/laser_maze");
        const timeslots = await eventResponse.json();
        setEvents(createEvents(timeslots));
        setHolidays(parseHolidays(holidaydata));
        console.log(holidaydata);
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
                    plugins={[dayGridPlugin] }
                    initialView={calendarMode}
                    ref={calendarRef}
                    events={calendarMode === "dayGridMonth" ? [{
                        title: `${events.length} slots`,
                        startTime: "00:00:00",
                        allDay: true,
                        color: "#dc562e",
                    }] : { events }}
                />
            </div>
        </div>
  )
}

export default Calendar