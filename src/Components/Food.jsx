import React, { useEffect, useState } from 'react'
import {use100vh} from 'react-div-100vh'

import useMedia from '../Hooks/useMedia'
import { getLunch } from '../API/api'

import { Box, Text, useColorMode, CircularProgress, VStack, Stack, HStack, Title, List, ListItem, ListIcon, OrderedList, UnorderedList } from "@chakra-ui/react"
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react"
import { motion } from "framer-motion"

const Food = () => {
    const MotionBox = motion(Box)
    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])
    const { colorMode } = useColorMode()
    const vh = use100vh()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [loading, setLoading] = useState(true)
    const [rawLunchData, setRawLunchData] = useState()
    const [lunchData, setLunchData] = useState({Title: "", Daily: [], Today: []})
    useEffect(() => {
        getLunch().then(res => {
            setRawLunchData(res.data.data)
            console.log(res.data.data)
            setLoading(false)
        })
    }, [])

    const genLunchData = (lunchLine) => {

        setLunchData({Title: lunchLine, Daily: rawLunchData[lunchLine].Daily, Today: rawLunchData[lunchLine].Today})

        console.log(lunchData)
    }
    
    return (
        !loading ?
        
            <div initial="hidden" animate="visible" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: "100%", maxHeight: vh * .8, overflowY: "scroll", overflowX: 'hidden', padding: '20px 0px', margin: '20px 0px'}}>
                {
                    Object.entries(rawLunchData)
                    .map( ([lunchLine]) => 
                        <MotionBox
                            whileHover={{x:10}}
                            style={{flexShrink: 0, boxShadow: " 2px 2px 15px rgb(0,118,220,0.18) ", width: "80%",maxWidth: "700px", height: mobile ? '60px' : '80px',borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: vh * .02, padding: "24px"}}
                            onClick={() => {
                                //setLunchData({...lunchData, Title: lunchLine})
                                genLunchData(lunchLine)
                                onOpen()
                            }}
                            >
                                <div>
                                    <Text fontSize="2xl" level={mobile ? 4 : 3} style={{color: colorMode == "dark" ? "white" : "#333", marginBottom: '0px'}}>{lunchLine}</Text>
                                </div>

                        </MotionBox>
                    )
                }

                <Drawer onClose={onClose} isOpen={isOpen} size={"lg"}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>{lunchData.Title}</DrawerHeader>
                        <DrawerBody>
                            {
                                lunchData.Daily[0] &&
                                <>
                                    <Text fontSize="3xl" fontWeight="bold">Daily:</Text>
                                    <UnorderedList>
                                        {lunchData.Daily.map((item) => {
                                            return(<ListItem><Text fontSize="xl">{item}</Text></ListItem>)
                                        })
                                        
                                    }
                                    </UnorderedList>
                                </>
                            }
                            <br style={{marginTop:"30px"}}></br>

                            <Text fontSize="3xl" fontWeight="bold">Special Today:</Text>
                            <UnorderedList>
                                {lunchData.Today.map((item) => {
                                    return(<ListItem><Text fontSize="xl">{item}</Text></ListItem>)
                                })
                                
                            }
                            </UnorderedList>
                            
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>         
            </div>
        :
        
            <div style={{ height:vh-250, display: "flex", flexDirection:"row", width: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress isIndeterminate size={mobile ? window.innerWidth * .5 : 150} thickness={2.5}/>
            </div>
        
    )
}

export default Food
