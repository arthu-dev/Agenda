import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
// import { Container } from './styles';

function FullScreen1() {
    
    
  return  <FullCalendar

  plugins={[ dayGridPlugin, interactionPlugin ]}
  initialView="dayGridMonth"


/>;
}

export default FullScreen1;