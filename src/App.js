import React, { useState, useEffect} from 'react'

import { Grid } from '@material-ui/core'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import moment from 'moment'



//header
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from "@date-io/date-fns"
import { ptBR } from "date-fns/locale"

const io = require('socket.io-client');
const socket = io('http://localhost:3001');
var today = new Date()
var month, dayM
if (Number(today.getUTCDate()) < 10) {
    dayM = `0${today.getUTCDate()}`
} else {
    dayM = today.getUTCDate()
}
if (Number(today.getUTCMonth()) < 10) {
    month = `0${Number(today.getUTCMonth()) + 1}`
} else {
    month = Number(today.getUTCMonth()) + 1
}
var year = today.getUTCFullYear()


const calendarRef = React.createRef()
const fullCalendarRef = React.createRef()

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
        picker: {

            borderWidth: 3,
            align: 'center',
            border: "1px solid black",
            borderRadius: 4,
            borderColor: '#4f4f4f',
            margin: 2,
            padding: 5,
            backgroundColor: 'white',

        },

    })
    )
    const classes = useStyles()
    const [auth] = useState(true)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    //body 
    const [selectedDate, setSelectedDate] = useState()
    const [eventos, setEventos] = useState()
    
  
        useEffect(() => {
            socket.on('eventos', data => {
                console.log(data)
                setEventos(data)
            })
          }, [])
          useEffect(() => {
            socket.on('novu eventu', teste=>
            console.log(teste)
            
            )
        }, [])
          
    
    const renderCalendars =(date)=>{
            calendarRef.current.getApi().changeView('timeGrid', date)
            fullCalendarRef.current.getApi().changeView('dayGridMonth', date)
            setSelectedDate(moment(date).format('L'))
    }
    const handleDatePick = (date) => {
        if (date && isNaN(Number(moment(date).format('L')))) {
            renderCalendars(date)
        }
    }

    const handleDateClick = (date) => {
        renderCalendars(date.dateStr)
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
                            format="dd/MM/yyyy"
                            margin="normal"
                            value={selectedDate}
                            onChange={handleDatePick}
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
                                <MenuItem onClick={handleClose}>Minha conta</MenuItem>
                                <MenuItem onClick={handleClose}>Sair</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                <div style={{ width: "65%", marginTop: "3%" }}>

                    <FullCalendar //Mês
                        ref={fullCalendarRef}
                        locale='pt-br'
                        headerToolbar={
                            {
                                left: '',
                                center: '',
                                right: ''
                            }
                        }
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        dateClick={handleDateClick}
                        dayMaxEventRows= {true}
                        eventColor='#3f51b5'
                        events={eventos}
                    />
                </div>
                <div style={{ width: "35%", marginTop: "3%" }} >

                    <FullCalendar //Tempo 
                        ref={calendarRef}
                        nowIndicator={true}
                        height={788}
                        slotLabelInterval={'00:30'}
                        slotMinTime={'06:00'}
                        slotMaxTime={'19:30'}
                        headerToolbar={{
                            left: '',
                            center: '',
                            right: ''
                        }}
                        eventColor='#3f51b5'
                        locale={'pt-br'}
                        plugins={[timeGridPlugin, interactionPlugin]}
                        weekends={true}
                        initialView="timeGrid"
                        dayCount={1}
                        editable={false}
                        droppable={false}
                        events={eventos}
                    />
                </div>
            </Grid >
        </>
    )
}

export default App