import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import moment from 'moment';
 //momentPlugin from '@fullcalendar/moment';
//import {toMoment, toMomentDuration } from '@fullcalendar/moment';


//header
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import { ptBR } from "date-fns/locale";



function App() {
    //header   
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 2,
        },
        picker:{
            
            borderWidth:3,
            align:'center',
            border: "1px solid black",
            borderRadius: 4,
            borderColor:'#4f4f4f',
            margin:2,
            padding:5,
            backgroundColor:'white',
            
        },
        
    })
    );

    const classes = useStyles();
    const [auth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    //body 
    
    const [selectedDate, setSelectedDate] = useState();
    var today = new Date();
    var dayM = today.getUTCDate();
    var year = today.getUTCFullYear();
    var month = Number(today.getUTCMonth())+1;
    const calendarRef = React.createRef();
    const FullcalendarRef = React.createRef();

    const handleDateClick = (info) => {
        let calendarApi = calendarRef.current.getApi()
        let FullcalendarApi = FullcalendarRef.current.getApi()
       
        if(info.dateStr&& Number(moment(info.dateStr).format('M'))){
            calendarApi.changeView('timeGrid', info.dateStr)
            setSelectedDate(moment(info.dateStr).format('L'));
           
        }
        if(info && !info.dateStr && Number(moment(info).format('M'))){
            setSelectedDate(moment(info).format('L'));
            calendarApi.changeView('timeGrid', info)
            FullcalendarApi.changeView('dayGridMonth', info)
            
        }
        //setSelectedDate(date);
        //O Hook n é tão rápido quanto o parâmetro, dá uns bugs esquisitos por
        //ele ñ se atualizar a tempo
        //console.log("selectDate "+selectedDate)//dá o valor antigo
        
        //console.log(date)
        //console.log(moment(selectedDate).format('MM/DD/yyyy'))
    }
    //tutorial de programação procedural aki em baixo
    return (
        <>
            <AppBar position="fixed" >
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Agenda
                    </Typography>
                    
                    <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            edge="center"
                            className={classes.picker}
                            disableToolbar
                            invalidDateMessage="Data em formato inválido."
                            maxDateMessage="Data em formato inválido."
                            minDateMessage="Data em formato inválido."
                            variant="dialog"
                            format="dd/MM/yyyy"
                            margin="normal"
                            value={moment(selectedDate).format('L')}
                            onChange={handleDateClick}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    
                    </MuiPickersUtilsProvider>
                    
                    {auth && (
                        <div>
                            <IconButton
                                className={classes.icon}
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                <div style={{ width: "65%", marginTop: "3%" }}>
                    <FullCalendar
                        ref={FullcalendarRef}
                        locale='pt-br'
                        buttonText={{ today: 'Mês atual' }}
                        headerToolbar={
                            {
                                left: '',
                                center: '',
                                right: ''
                            }
                        }
                        plugins={[dayGridPlugin,/*momentPlugin,*/ interactionPlugin]}
                        initialView="dayGridMonth"
                        dateClick={handleDateClick}
                        timeZone='UTC'
                    />;
                </div>
                <div style={{ width: "35%", marginTop: "3%" }} >
                    <FullCalendar
                        ref={calendarRef}
                        height={750}
                        timeZone='UTC'
                        slotLabelInterval={'00:30'}
                        slotMaxTime={'18:30'}
                        slotMinTime={'06:30'}
                        headerToolbar={{
                            left: '',
                            center: '',
                            right: ''
                        }}
                        eventColor='#3f51b5'
                        locale={'pt-br'}
                        plugins={[timeGridPlugin,/*momentPlugin,*/interactionPlugin]}
                        weekends={false}
                        initialView="timeGrid"
                        firstDay={`${year}-0${month + 1}-${dayM + 1}`}
                        dayCount={1}
                        editable={true}
                        droppable={true}
                        events={
                            [
                                {
                                    "title": "Exemplo ",
                                    "start": `${year}-0${month + 1}-${dayM}T09:00:00`,
                                    "end": `${year}-0${month + 1}-${dayM}T11:00:00`
                                },
                                {
                                    "title": "Exemplo ",
                                    "start": `${year}-0${month + 1}-${dayM}`,
                                    "end": `${year}-0${month + 1}-${dayM}`
                                },
                                {
                                    "title": "Exemplo ",
                                    "start": `${year}-0${month + 1}-${dayM + 1}T11:00:00`,
                                    "end": `${year}-0${month + 1}-${dayM + 1}T13:00:00`
                                },
                                {
                                    "title": "Exemplo ",
                                    "start": `${year}-0${month + 1}-${dayM - 1}T10:00:00`,
                                    "end": `${year}-0${month + 1}-${dayM - 1}T13:00:00`
                                },
                                {
                                    "title": "Exemplo ",
                                    "start": `${year}-0${month + 1}-${dayM - 1}T11:00:00`,
                                    "end": `${year}-0${month + 1}-${dayM - 1}T13:00:00`
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