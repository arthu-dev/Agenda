import React from 'react';
import FullCalendar  from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";




function RightSide() {
  var today = new Date();
  var dayM = today.getUTCDate();
  var year = today.getUTCFullYear();
  var month = today.getUTCMonth();
  return (
    <div  style={{width:"35%"}} >
        
        <FullCalendar
        height={650}
        slotLabelInterval={'00:30'}
        slotMaxTime={'18:30'}
        slotMinTime={'06:30'}
         headerToolbar={ {
          left: '',
          center: '',
          right: ''
        }}
         eventColor='#3f51b5'
         locale={'pt-br'}
         plugins={[ timeGridPlugin, interactionPlugin ]}
         weekends={false}
         initialView="timeGrid"
         firstDay={`${year}-0${month+1}-${dayM+1}`}
         dayCount={1}
         editable={true}
         droppable={true}
         events={
          [
            {
              "title": "Exemplo 1",
              "start":`${year}-0${month+1}-${dayM}T09:00:00`,
              "end": `${year}-0${month+1}-${dayM}T11:00:00`
            },
            {
              "title": "Exemplo 2",
              "start": `${year}-0${month+1}-${dayM}`,
              "end": `${year}-0${month+1}-${dayM}`
            }
          ]
        
        }

        />
    </div>
  );
}

export default RightSide;
