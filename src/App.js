import React from 'react';

import { Grid } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";



function App() {
    var today = new Date();
    var dayM = today.getUTCDate();
    var year = today.getUTCFullYear();
    var month = today.getUTCMonth();
    const calendarRef = React.createRef();
    const FullcalendarRef = React.createRef();

    const handleDateClick =(info)=>{
        let calendarApi = calendarRef.current.getApi();
        calendarApi.changeView('timeGrid', info.dateStr);
    }


    return(
        <> 
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                <div style={{width:"65%",marginTop:"0.5%"}}>
                    <FullCalendar
                        ref={FullcalendarRef}
                        locale={'pt-br'}
                        buttonText={{today:'Mês atual'}}
                        headerToolbar={ 
                            {
                            left: 'today,prev,next',
                            center: '',
                            right: ''
                            }
                        }
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        dateClick={ handleDateClick }   
                    />;
                </div>
                <div  style={{width:"35%"}} >
                    <FullCalendar
                    ref={calendarRef}
                    height={730}
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
            </Grid >
        </>
        )
}

export default App;