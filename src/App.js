import React from 'react';
import FullCalendar  from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";


function App() {
  return (
    <div className="App">


        <FullCalendar
        eventColor={'orange'}
          locale={'pt-br'}
         plugins={[ timeGridPlugin, interactionPlugin ]}
         weekends={false}
         initialView="timeGrid"
         dayCount={1}
         slotLabelInterval={'00:30'}
         editable={true}
         droppable={true}
         timeZone={'UTC -3'}
         events={[
         
            {
              "title": "Event 1",
              "start": "2020-08-14T14:30:00Z",
              "end":"2020-08-14T16:30:00Z"
            }
         ]
        
        }

        />
    </div>
  );
}

export default App;
