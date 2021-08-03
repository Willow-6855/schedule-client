import React from 'react'

import {use100vh} from 'react-div-100vh'
import useMedia from '../Hooks/useMedia'

import { CircularProgress, CircularProgressLabel, Text } from '@chakra-ui/react'

import dayjs from 'dayjs'

var customParseFormat = require('dayjs/plugin/customParseFormat')
var duration = require('dayjs/plugin/duration')

dayjs.extend(customParseFormat)
dayjs.extend(duration)

const Progress = ({genText, period, nextPeriod, settings, lunchStatus, currentTime}) => {

    const vh = use100vh()
    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])

    const genPercent = () => {



        let range;

        let diffFromStart;


        if(period.lunchPeriods){
            let userLunchPeriod
            if(localStorage.getItem('day-type') == "Royal"){
                userLunchPeriod = period.lunchPeriods[settings.royalDay]
                
            }else {
                userLunchPeriod = period.lunchPeriods[settings.blueDay]
                
            }

            


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
    )
}

export default Progress
