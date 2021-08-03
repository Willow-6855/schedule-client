import React, { useState, useEffect } from 'react'
import {use100vh} from 'react-div-100vh'

import { getSchedule } from '../API/api'
import useMedia from '../Hooks/useMedia'

import dayjs from 'dayjs'

import { Box, Text, useColorMode, CircularProgress, VStack, Stack, HStack } from "@chakra-ui/react"
import { motion } from "framer-motion"

const Schedule = () => {

    const MotionBox = motion(Box)
    const vh = use100vh()
    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])
    const { colorMode, toggleColorMode } = useColorMode()
    const [loading, setLoading] = useState(true)
    const [schedule, setSchedule] = useState()
    const [lunchType, setLunchType] = useState(null)

    useEffect(() => {
        getSchedule().then((response) => {
            if(response.data.data.Type == "Special") {
                setSchedule(response.data.data.ScheduleData.data)
                setLoading(false)
                

            } else {
                const fetchedSchedule = response.data.data.data
                setSchedule(fetchedSchedule)
                setLoading(false)
            }
        })
    }, [])


    useEffect(() => {
        const settings = JSON.parse(localStorage.getItem('scheduleSettings'))
        const dayType = localStorage.getItem('day-type')
        
        
        if(dayType == "Royal"){
            setLunchType(settings.royalDay)
        }else if(dayType == "Blue"){
            setLunchType(settings.blueDay)
        }else{
            
        }
        
    }, [localStorage.getItem('scheduleSettings')])


    return (
        <>
  
        <div initial="hidden" animate="visible" style={{height:vh-200, display: 'flex', justifyContent: "center", flexDirection: 'column', alignItems: 'center', width: "100%", maxHeight: vh * .85, overflowY: "scroll", overflowX: 'hidden', padding: '20px 0px', margin: '40px 0px'}}>

            {!loading ?
                schedule.map((period) => { 
                    if(period.periodName != "Passing Period"){
                        return(
                        <>
                            <MotionBox
                                whileHover={{x:10}}
                                style={{flexShrink: 0, boxShadow: " 2px 2px 15px rgb(0,118,220,0.18) ", width: "80%",maxWidth: "500px", height: mobile ? '60px' : '80px',borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: vh * .02, padding: "24px"}}
                            >
                                <div>
                                    <Text fontSize="2xl" level={mobile ? 4 : 3} style={{color: colorMode == "dark" ? "white" : "#333", marginBottom: '0px'}}>{period.periodName}</Text>
                                </div>
                                <div>
                                    <Text style={{color: colorMode == "dark" ? "white" : "#555", fontSize: mobile ? '12px' : '14px'}}>{period.startTime} - {period.endTime}</Text>

                                </div>
                            </MotionBox>
                            
                            {period.lunchPeriods &&
                                <div id="hi" style={{flexShrink: 0,display: 'flex', alignItems: 'flex-end', justifyContent: mobile ? 'flex-end' : 'space-between', flexDirection: mobile ? 'column' : 'row', width: "80%",maxWidth: "500px"}}>
                                    {Object.keys(period.lunchPeriods).map((lunch) => {
                                        return(
                                            <MotionBox
                                                whileHover={{x:3}}
                                                style={{boxShadow: lunch == lunchType ? "2px 2px 15px #ffdb58 " : " 2px 2px 15px rgb(0,118,220,0.18) ", width: mobile ? "85%" : '30%',maxWidth: "500px",  height: mobile ? '60px' : '80px', borderRadius: "10px", cursor: 'pointer', display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: vh * .02, padding: "24px"}}
                                            >
                                                <div>
                                                    <Text fontSize="2xl"  level={mobile ? 4 : 3} style={{color: colorMode == "dark" ? "white" : "#333", marginBottom: '0px'}}>{lunch}</Text>
                                                </div>
                                                <VStack spacing={1}>
                                                    {mobile ? 
                                                        
                                                        <Text  style={{color: colorMode == "dark" ? "white" : "#555", fontSize: mobile ? '12px' : '14px'}}>{period.lunchPeriods[lunch].startTime} - {period.lunchPeriods[lunch].endTime}</Text>

                                                        :
                                                        <>
                                                            <Text style={{color: colorMode == "dark" ? "white" : "#555", fontSize: mobile ? '10px' : '12px'}}>{period.lunchPeriods[lunch].startTime}</Text>
                                                            <br/>
                                                            <Text style={{color: colorMode == "dark" ? "white" : "#555", fontSize: mobile ? '10px' : '12px'}}>{period.lunchPeriods[lunch].endTime}</Text>
                                                        </>
                                                    }
                                                </VStack>
                                            </MotionBox>
                                    )})}
                                </div>  
                            }

                            
                        </>
                        )}
                })
            : 
            <div style={{ height:vh-250, display: "flex", flexDirection:"row", width: "100%", alignItems: 'center', justifyContent: 'center'}}>
                <CircularProgress isIndeterminate size={mobile ? window.innerWidth * .5 : 150} thickness={2.5}/>
            </div>
            }

        </div>
        </>
    )
}

export default Schedule
