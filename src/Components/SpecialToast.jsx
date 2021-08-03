import React, { useEffect } from 'react'

import { getSchedule } from '../API/api.js'

import { Text, Button, useDisclosure } from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"
import dayjs from 'dayjs'


const SpecialToast = () => {
    const toast = useToast()

    useEffect(() => {


        getSchedule().then((response) => {
            if(response.data.data.EventData){

                const specialName = response.data.data.EventData.Title
                const date = dayjs().format('M/D/YYYY')
                
                let seenEvents = localStorage.getItem('seen-events')
                console.log(`${specialName}-${date}`)
    
                if(!seenEvents.includes(`${specialName}-${date}`)){
                    
                    
                    if(response.data.data.Type == "Special"){
                        const specialName = response.data.data.EventData.Title
                        const specialDate = response.data.data.EventData.Date
                        
                        toast({
                            title: `Today is a ${specialName} Schedule`,
                            position: "bottom-right",
                            duration: 10000,
                            isClosable: true,
                        })
    
                        let seenEvents = JSON.parse(localStorage.getItem('seen-events'))
                        seenEvents.push(`${specialName}-${specialDate}`)
                        localStorage.setItem('seen-events', JSON.stringify(seenEvents))
    
                    }
                }
            }
        })



    }, [])

    return (<></>)
}

export default SpecialToast
