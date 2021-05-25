import React, { useState, useEffect } from 'react'
import {use100vh} from 'react-div-100vh'

import dayjs from 'dayjs'

import useMedia from '../Hooks/useMedia'
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
        E_LEARNING_MORNING: {
            text: "E-Learning Friday",
            image: Morning
        },
        E_LEARNING_DAYTIME: {
            text: "E-Learning Friday",
            image: Daytime
        },
        E_LEARNING_SUNDOWN: {
            text: "E-Learning Friday",
            image: Sundown
        },
        E_LEARNING_NIGHT: {
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
            fetchedSchedule = returnResponse.data.data
        
   

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
        setTimeout(() => timer(), 250)
    }
    
    
    const [settings,setSettings] = useState(JSON.parse(localStorage.getItem('scheduleSettings')))

    
    useEffect(() => {
        setSettings(JSON.parse(localStorage.getItem('scheduleSettings')))
    }, [JSON.parse(localStorage.getItem('scheduleSettings'))])

    const lunchStatus = () => {
        let userLunchPeriod = period.lunchPeriods[settings.lunch]
        
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

            let userLunchPeriod = period.lunchPeriods[settings.lunch]

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

    const genPercent = () => {



        let range;

        let diffFromStart;


        if(period.lunchPeriods){

            let userLunchPeriod = period.lunchPeriods[settings.lunch]


            switch (lunchStatus()) {
                case 'DURING':
                    range = userLunchPeriod.endTimeUnix - userLunchPeriod.startTimeUnix
                    diffFromStart = currentTime - userLunchPeriod.startTimeUnix
                    break;
            
                case 'BEFORE':
                    range = userLunchPeriod.startTimeUnix - period.startTimeUnix
                    diffFromStart = currentTime - period.startTimeUnix
                    break;

                case "AFTER":
                    range =  period.endTimeUnix - userLunchPeriod.endTimeUnix
                    diffFromStart = currentTime - userLunchPeriod.endTimeUnix
                    break
            }


        } else { 
            range = period.endTimeUnix - period.startTimeUnix

            diffFromStart = currentTime - period.startTimeUnix
    
        }


       
        return ((diffFromStart / range) * 100)

    }
    
    
    return (
        status == "SCHOOL_NOW" ? 
        
            <div style={{ height:vh-120, display: "flex", flexDirection:"row", width: "100%", alignItems: 'center', justifyContent: 'center'}}>
                <CircularProgress trackColor="#f5f5f5" thickness={3.5} size={mobile ? window.innerWidth * .85 : 580} value={period ? genPercent() : 0} capIsRound={true} >
                    <CircularProgressLabel fontSize={50}>

                        {period ? 
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            {settings.display == "Timer" ?  
                            
                            <Text marginBottom={0} fontSize={mobile? "3rem" : "100px"} >{genText()}</Text> || 'Loading...' 
                            
                            : 
                            
                            <>
                                <Text marginBottom={0} fontSize={mobile? "3rem" : "80px"} >
                                {period.lunchPeriods ?
                                        <>
                                            {lunchStatus() == "DURING" ? 
                                                settings.lunch + ' Lunch'
                                            :
                                                period.periodName
                                            }
                                        </>
                                        :
                                        period.periodName

                                    }
                                </Text>
                            </>
                            
                            }
                            {settings.display == "Timer" ? 
                                <>
                                    {period.isPassing ? 

                                    nextPeriod?.lunchPeriods && settings.lunch == "A" ?
                                    <Text type="secondary" style={{color: "grey", fontSize: mobile ? "1.3rem" : "1.4rem", marginTop:"0px", wordSpacing: "3px"}}>To Get to A Lunch</Text>

                                    :
                                    <Text type="secondary" style={{color: "grey", fontSize: mobile ? "1.3rem" : "1.4rem", marginTop: "0x", wordSpacing: "3px"}}>Until {nextPeriod.periodName} Begins</Text>

                                    :
                                        <>
                                        {period.lunchPeriods ?
                                            {
                                                'DURING':  <Text type="secondary" style={{color: "grey", fontSize: mobile ? "1.3rem" : "1.4rem", marginTop: "0x", wordSpacing: "3px"}}> Until {settings.lunch} Lunch Ends </Text>,
                                                'BEFORE':  <Text type="secondary" style={{color: "grey", fontSize: mobile ? "1.3rem" : "1.4rem", marginTop: "0x", wordSpacing: "3px"}}>Until {settings.lunch} Lunch Begins</Text>,
                                                'AFTER':  <Text type="secondary" style={{color: "grey", fontSize: mobile ? "1.3rem" : "1.4rem", marginTop: "0x", wordSpacing: "3px"}}>{nextPeriod ? `Until ${period.periodName} Ends` : "Until School Ends"}</Text>,
                                            }[lunchStatus()]
                                        :
                                        <Text type="secondary" style={{color: "grey", fontSize: mobile ? "1.2rem" : "1.4rem", marginTop: "0x", wordSpacing: "3px"}}>{nextPeriod ? `Until ${period.periodName} Ends` : "Until School Ends"}</Text>

                                        }
                                        </>
                                    }
                                </>
                            :
                            
                                
                                <Text type="secondary" style={{color: "grey", fontSize: mobile ? "1.3rem" : "1.5rem", marginTop: "0", wordSpacing: "3px"}}>
                                    {genText()} {period.lunchPeriods ? 
                                        {
                                            'DURING':   <>Until Lunch Ends </> ,
                                            'BEFORE':  <>Until {settings.lunch} Lunch </>,
                                            'AFTER':  <>{nextPeriod ? `Until Period Ends` : "Until School Ends"}</>
                                        }[lunchStatus()]
                                        :
                                        'Until Period Ends'
                                    }
                                </Text>

                            }

                        

                        </div>

                        : "Loading..."}

                    </CircularProgressLabel>

                </ CircularProgress>
            </div>
   
        :
        
        status != "LOADING" ?
            <div style={{ height:vh-120, display: "flex", flexDirection:"row", width: "100%", alignItems: 'center', justifyContent: 'center'}}>

                <div style={{marginTop: "0px",textAlign: 'center',color: 'white',position: 'absolute',top:'50%',left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)'}}>
                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400,filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.7)"}}>{statusTextData[status]['text']}</h1>
                    <h1 style={{color: "white", fontSize: mobile ? '24px' : '32px', margin: "10px 0px", fontWeight: 400, filter: "drop-shadow(0px 0px 10px rgb(0,0,0,0.7)"}}>{dayjs(currentTime).format('h:mm A')}</h1>
                </div>
                <img src={statusTextData[status]['image']} className="bright" style={{margin: '5px',width: mobile ? '90% ':"80%",maxWidth: '850px'}}/>

            </div>

        :

            <div style={{ height:vh-120, display: "flex", flexDirection:"row", width: "100%", alignItems: 'center', justifyContent: 'center'}}><Text>Loading...</Text></div>
    )
}

export default Clock
