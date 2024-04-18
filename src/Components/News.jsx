import React, { useState, useEffect } from 'react'
import {use100vh} from 'react-div-100vh'

import { getNewsCasts } from '../API/api'
import { getCalendar } from '../API/api'
import useMedia from '../Hooks/useMedia'

import { Box, Text, useColorMode, CircularProgress, VStack, Stack, HStack, Title } from "@chakra-ui/react"
import { motion } from "framer-motion"

import dayjs from 'dayjs'



var duration = require('dayjs/plugin/duration')
var customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(duration)
dayjs.extend(customParseFormat)

const News = () => {
    const MotionBox = motion(Box)
    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])
    const { colorMode } = useColorMode()

    const [newsCasts, setNewsCasts] = useState(null)
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        
        getNewsCasts().then((result) => {
            setNewsCasts(result.data)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        console.log("getting calendar")
        getCalendar().then((result) => {
           console.log(result.data)
        })
    }, [])



    const vh = use100vh()
    return (
        
        <div initial="hidden" animate="visible" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: "100%", maxHeight: vh * .8, overflowY: "scroll", overflowX: 'hidden', padding: '20px 0px', margin: '20px 0px'}}>
            {!loading ?
                newsCasts.slice(0,10).map((cast) => {
                    const date = dayjs(cast.date)
                    return(
                        <a key={cast.date} target="_blank" style={{width: "80%",maxWidth: "700px", display: 'block'}} href={cast.link}>
                        <MotionBox
                        whileHover={{x:10}}
                        style={{boxShadow: " 2px 2px 15px rgb(0,118,220,0.18) ", width: "100%", height: mobile ? '60px' : '80px', borderRadius: "10px", cursor: 'pointer', display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: vh * .02, padding: "24px"}}
                        >
                            <div>
                                <Text level={mobile ? 4 : 3} fontSize="xl" style={{color: colorMode == "dark" ? "white" : "black", marginBottom: '0px'}}>{cast.title.rendered.replace(';', ':').split(':')[0].split('&')[0] }</Text>
                            </div>
                            <div style={{textAlign: 'center'}}>
                                <Text style={{color: colorMode == "dark" ? "white" : "#555", fontWeight: "300",fontSize: mobile ? '16px' : '18px', marginBottom:"-20px"}}>{date.format('D') > 9 ? date.format('D') : '0' + date.format('D')}</Text>
                                <br/>
                                <Text strong style={{color: colorMode == "dark" ? "white" : "#555", fontSize: mobile ? '14px' : '16px'}}>{date.format('MMM')}</Text>
                            </div>
                        </MotionBox>
                        </a>
                    )
                })
            :
            
                <div style={{ height:vh-250, display: "flex", flexDirection:"row", width: "100%", alignItems: 'center', justifyContent: 'center'}}>
                    <CircularProgress isIndeterminate size={mobile ? window.innerWidth * .5 : 150} thickness={2.5}/>
                </div>
            }
        </div>
        

    )
}

export default News
