import React, { useState, useEffect, useRef } from 'react'
import {use100vh} from 'react-div-100vh'

import dayjs from 'dayjs'

import useMedia from '../Hooks/useMedia'
import Progress from './Progress'
import { getSchedule } from '../API/api'

import { CircularProgress, CircularProgressLabel, Text } from '@chakra-ui/react'

import Morning from '../Assets/Landscapes/Morning.png'
import Daytime from '../Assets/Landscapes/Daytime.png'
import Sundown from '../Assets/Landscapes/Sundown.png'
import Night from '../Assets/Landscapes/Night.png'


var customParseFormat = require('dayjs/plugin/customParseFormat')
var duration = require('dayjs/plugin/duration')

dayjs.extend(customParseFormat)
dayjs.extend(duration)

const Clock = () => {

    const vh = use100vh()
    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])

    const [schedule, setSchedule] = useState(null)
    const [period, setPeriod] = useState(null)
    const [nextPeriod, setNextPeriod] = useState(null)
    const [currentTime, setCurrentTime] = useState(dayjs().valueOf())
    const [status, setStatus] = useState('LOADING')
    const [noSchoolText, setNoSchoolText] = useState(null)
    const [lunchPeriod, setLunchPeriod] = useState()
    


    const statusTextData = {
        BEFORE_SCHOOL_MORNING: {
            text: "School Hasn't Started",
            image: Morning
        },
        BEFORE_SCHOOL_NIGHT: {
            text: "School Hasn't Started",
            image: Night
        },
        AFTER_SCHOOL_NIGHT: {
            text: "School Has Ended",
            image: Night
        },
        AFTER_SCHOOL_SUNDOWN: {
            text: "School Has Ended",
            image: Sundown
        },
        AFTER_SCHOOL_DAYTIME: {
            text: "School Has Ended",
            image: Daytime
        },
        WEEKEND_NIGHT: {
            text: "Weekend",
            image: Night
        },
        WEEKEND_SUNDOWN: {
            text: "Weekend",
            image: Sundown
        },
        WEEKEND_DAYTIME: {
            text: "Weekend",
            image: Daytime
        },
        WEEKEND_MORNING: {
            text: "Weekend",
            image: Morning
        },
        CUSTOM_EVENT_MORNING: {
            text: "E-Learning Friday",
            image: Morning
        },
        CUSTOM_EVENT_DAYTIME: {
            text: "E-Learning Friday",
            image: Daytime
        },
        CUSTOM_EVENT_SUNDOWN: {
            text: "E-Learning Friday",
            image: Sundown
        },
        CUSTOM_EVENT_NIGHT: {
            text: "E-Learning Friday",
            image: Night
        },
    }




    const getPeriod = () => {
        

        let currentTime = dayjs().valueOf()
        let today = dayjs()
        let day = today.format('dddd')


    
        if(schedule.length == 0){
            if(currentTime > dayjs('8:00 PM', 'h mm A').valueOf()){
                setStatus('WEEKEND_NIGHT')
            } else if (currentTime > dayjs('6:00 PM', 'h mm A').valueOf()){
                setStatus('WEEKEND_SUNDOWN')
            } else if (currentTime > dayjs('12:00 PM', 'h mm A').valueOf()) {
                setStatus('WEEKEND_DAYTIME')
            } else if (currentTime >= dayjs('6:30 AM', 'h mm A').valueOf()){
                setStatus('WEEKEND_MORNING')
            } else {
                setStatus('WEEKEND_NIGHT')
            }
            return;
        } else {
            let beforeSchool = currentTime < schedule[0].startTimeUnix
            let afterSchool = currentTime > schedule[schedule.length - 1].endTimeUnix
    
            if(beforeSchool){
                if(currentTime >= dayjs('6:30 AM', 'h mm A').valueOf()){
                    setStatus('BEFORE_SCHOOL_MORNING')
                } else {
                    setStatus('BEFORE_SCHOOL_NIGHT')
                }
            } else if (afterSchool) {
                if(currentTime > dayjs('8:00 PM', 'h mm A').valueOf()){
                    setStatus('AFTER_SCHOOL_NIGHT')
                } else if (currentTime > dayjs('6:00 PM', 'h mm A').valueOf()){
                    setStatus('AFTER_SCHOOL_SUNDOWN')
    
                } else {
                    setStatus('AFTER_SCHOOL_DAYTIME')
    
                }
            }
    
            schedule.forEach((period, index) => {
                
                if(currentTime >= period.startTimeUnix && currentTime < period.endTimeUnix){
                    setStatus('SCHOOL_NOW')
                    setPeriod(period)
                    
                    
                    try{
                        if(period.isPassing){
                            setNextPeriod(schedule[index+1])
                        } else {
                            setNextPeriod(schedule[index+2])
                            
                        }
                        
                    } catch {
                        setNextPeriod(null)
                    }
                    
                }
            })
        }
        
    
    
        
    }
    

    
    const fetchSchedule = async () => {
        
        let fetchedSchedule
        
        getSchedule().then((response) => {
            const returnResponse = response.data
            
            
            if(returnResponse.data.Type == "Special"){
                const scheduleData = returnResponse.data.ScheduleData
                const eventData = returnResponse.data.EventData
                

                const typeOfDay = scheduleData.SpecialType
                
                
                if(eventData.NoSchoolText){
                    setNoSchoolText(eventData.NoSchoolText)
                }

                localStorage.setItem('day-type', typeOfDay)
                
                fetchedSchedule = scheduleData.data
            }else {
                const typeOfDay = returnResponse.data.Type
                localStorage.setItem('day-type', typeOfDay)
                
                fetchedSchedule = returnResponse.data.data
            }
            


            
            
            
            

            let scheduleWithUnix = []

            fetchedSchedule.forEach(period => {

    
    
                if(period.lunchPeriods){
    
                    let lunchPeriods = {}
    
                    for(let key in period.lunchPeriods){
    
                        lunchPeriods[key] = ({
                            ... period.lunchPeriods[key],
                            startTimeUnix: dayjs(period.lunchPeriods[key].startTime, 'h mm A').valueOf(),
                            endTimeUnix: dayjs(period.lunchPeriods[key].endTime, 'h mm A').valueOf(),
                        })
                    }
    
                    period.lunchPeriods = lunchPeriods
                   
                }
    
                scheduleWithUnix.push({
                    ...period,
                    startTimeUnix: dayjs(period.startTime, 'h:mm A').valueOf(),
                    endTimeUnix: dayjs(period.endTime, 'h:mm A').valueOf(),
                })
            })
    
    
            
            setSchedule(scheduleWithUnix)
            
        })
    }
    
    
    useEffect(() => {
        

        if(schedule && !period){
            getPeriod()
        }
        
        if(!schedule){
            fetchSchedule()
        } else {
            timer()
        } 
    }, [schedule])
    

    useEffect(() => {
        fetchSchedule()
        
    }, [dayjs()["$D"]])

    const timer = () => {
        
        setCurrentTime(dayjs().valueOf())
        getPeriod()
        setTimeout(() => timer(), 1000)
    }
    
    
    const [settings,setSettings] = useState(JSON.parse(localStorage.getItem('scheduleSettings')))

    
    useEffect(() => {
        setSettings(JSON.parse(localStorage.getItem('scheduleSettings')))
    }, [localStorage.getItem('scheduleSettings')])

    const lunchStatus = () => {
        let userLunchPeriod
        if(localStorage.getItem('day-type') == "Royal"){
            userLunchPeriod = period.lunchPeriods[settings.royalDay]
            setLunchPeriod(schedule[4].lunchPeriods[userLunchPeriod])
            
        }else {
            userLunchPeriod = period.lunchPeriods[settings.blueDay]
            setLunchPeriod(schedule[4].lunchPeriods[userLunchPeriod])
            
            
        }
        
        if(userLunchPeriod.startTimeUnix <= currentTime  && currentTime <= userLunchPeriod.endTimeUnix ){
            return('DURING')
        } else if (currentTime >= userLunchPeriod.endTimeUnix){
            return('AFTER')
        } else {
            return('BEFORE')
        }

    }
    
    
    const genText = () => { 

        
        
        let diffFromEnd;
        
        
        if(period.lunchPeriods){

            let userLunchPeriod = lunchPeriod
            
            switch (lunchStatus()) {
                
                case 'DURING':
                    diffFromEnd = userLunchPeriod.endTimeUnix - currentTime
                    break;
            
                case 'BEFORE':
                    diffFromEnd = userLunchPeriod.startTimeUnix - currentTime
                    break; 

                case "AFTER":
                    diffFromEnd = period.endTimeUnix - currentTime
                    break
            }


        } else { 
            diffFromEnd = period.endTimeUnix - currentTime
        }

       
        let hoursLeft = dayjs.duration(diffFromEnd, 'ms').hours()


        let minutesLeft = dayjs.duration(diffFromEnd, 'ms').minutes()

        let secondsLeft = dayjs.duration(diffFromEnd, 'ms').seconds()


        return(`${hoursLeft > 0? hoursLeft +":" : ""}${minutesLeft > 9 ? minutesLeft :  hoursLeft > 0 ? "0" + minutesLeft : minutesLeft}:${secondsLeft > 9 ? secondsLeft : "0" + secondsLeft}`)

    }

    
    
    
    return (
        status == "SCHOOL_NOW" ? 
        
        <Progress genText={genText} period={period} nextPeriod={nextPeriod} settings={settings} lunchStatus={lunchStatus} currentTime={currentTime}/>
   
        :
        
        status != "LOADING" ?
            <div style={{ height:vh-120, display: "flex", flexDirection:"row", width: "100%", alignItems: 'center', justifyContent: 'center'}}>

                <div style={{marginTop: "0px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.7)"}}>{noSchoolText ? noSchoolText :  statusTextData[status]['text']}</h1>
                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.7)"}}>{dayjs(currentTime).format('h:mm A')}</h1>
                </div>
                <img src={statusTextData[status]['image']} className="bright" style={{margin: '5px',width: mobile ? '90% ':"80%",maxWidth: '850px'}}/>

            </div>

        :

            <div style={{ height:vh-250, display: "flex", flexDirection:"row", width: "100%", alignItems: 'center', justifyContent: 'center'}}>
                <CircularProgress isIndeterminate size={mobile ? window.innerWidth * .5 : 150} thickness={2.5}/>
            </div>
    )
}

export default Clock
