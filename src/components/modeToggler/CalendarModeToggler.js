import React from 'react'
import "./CalendarModeToggler.css"

const CalendarModeToggler = (props) => {

  const mode = props.mode
  return (
    <div className="toggler">
      <div className={`option ${(mode==="dayGrid" ? "active-option" : "")}`} onClick={() => props.onChange("dayGrid")}>Daily</div>
      <div className={`option ${(mode==="dayGridWeek" ? "active-option" : "")}`} onClick={() => props.onChange("dayGridWeek")}>Weekly</div>
      <div className={`option ${(mode==="dayGridMonth" ? "active-option" : "")}`} onClick={() => props.onChange("dayGridMonth")}>Monthly</div>
    </div>
  )
}

export default CalendarModeToggler