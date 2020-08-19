import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";



function Screen1() {


  //const handleDateClick = dateClickInfo => {
  //          dateClickInfo.date
  //};
   
  return  <div style={{width:"65%"}}>
            <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin,timeGridPlugin ]}
            initialView="dayGridMonth"
            //dateClick={ handleDateClick }
            />;
          </div>
}
export default Screen1;