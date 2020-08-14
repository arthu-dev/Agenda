import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";

function RightSide() {
  
    
  return  <FullCalendar

  plugins={[ timeGridPlugin, interactionPlugin ]}
  initialView="timeGridWeek"


/>;
}

export default RightSide;


