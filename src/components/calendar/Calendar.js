import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import rrulePlugin from '@fullcalendar/rrule'
import CalendarModeToggler from '../modeToggler/CalendarModeToggler'
import { useState, useRef, useEffect,  } from 'react'
import holidaydata from './2022holidays.json'
import "./Calendar.css"




const Calendar = () => {

    const [events, setEvents] = useState([]);
    const [holidays, setHolidays] = useState([]);

    function parseHolidays(holidays) {
        const holidayEvents = [];
        for (let i = 0; i < holidays.length; i++){
            holidayEvents.push({
                start: holidays[i].date + "T00:00:00",
                title: holidays[i].name,
                allDay: true,
                color: "#60b6fb",
                backgroundColor: "#60b6fb",
            })
        }
        return holidayEvents;
    }

    function createEvents(timeslots) {
        const events = [];
        for (let i = 0; i < timeslots.length; i++){
            events.push({
                title: `${timeslots[i]}`,
                displayEventTime: false,
                rrule: {
                    freq: 'daily',
                    dtstart: '2022-01-01T00:00:00'
                },
                exdate: holidaydata.map((value) => value.date),
                color: "#ffdb57",
                backgroundColor: "#ffdb57"
            })
        }
        return events;
    }

    function setHolidayEvents() {
        calendarRef.current.getApi().addEvent(holidays)
    }

    useEffect(async () => {
        const eventResponse = await fetch("http://139.59.34.126:8000/api/public/timeslots/Torq03%20Ezone%20Club,%20Marathalli/laser_maze");
        const timeslots = await eventResponse.json();
        setEvents(createEvents(timeslots.time_slot));
        setHolidays(parseHolidays(holidaydata));
        setHolidayEvents();
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
                    plugins={[dayGridPlugin, rrulePlugin]}
                    initialView={calendarMode}
                    ref={calendarRef}
                    events={calendarMode === "dayGridMonth" ? [{
                        title: `${events.length} slots`,
                        displayEventTime: false,
                        rrule: {
                            freq: 'daily',
                            dtstart: '2022-01-01T00:00:00'

                        },
                        exdate: holidaydata.map((value) => value.date),
                        color: "#ffdb57",
                        backgroundColor:"ffdb57",
                    },
                    ].concat(holidays) : events.concat(holidays)}
                />
            </div>
        </div>
  )
}

export default Calendar