import React from 'react'

import { CalendarOutlined, ClockCircleOutlined, UnorderedListOutlined, PlayCircleOutlined} from '@ant-design/icons';
import { theme, useColorMode, Text } from "@chakra-ui/react"
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined'

const BottomNav = (props) => {

    const { colorMode, toggleColorMode } = useColorMode()

    let colorTheme


    
    if(colorMode == 'dark'){
        colorTheme = {
            selectedBackground: "#222831",
            unselectedBackground: "transparent",
            boxShadow: "2px 2px 10px rgb(0,118,220,0.32)"
        }
    } else if (colorMode == 'light'){
        colorTheme = {
            selectedBackground: "white",
            unselectedBackground: "transparent",
            boxShadow: "2px 2px 10px rgb(0,118,220,0.32)"
        }
    }

    return (

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", position: 'fixed', bottom: '30px',marginTop: "20px"}}>
          

            <div style={{display: 'flex', zIndex: 4, boxShadow: "2px 2px 10px rgb(0,118,220,0.2)", borderRadius: "10px"}}>

                <div onClick={() => {props.setView("schedule")}} style={{width: "80px", height: "45px", display: 'flex', borderRadius: "10px 0px 0px 10px",justifyContent: 'center', alignItems: "center", background: props.view == "schedule" ? colorTheme.selectedBackground: colorTheme.unselectedBackground , boxShadow: props.view == "schedule" ? colorTheme.boxShadow : "none", cursor: 'pointer'}}>
                    <UnorderedListOutlined style={{fontSize: "20px"}}/>
                </div>
                <div onClick={() => {props.setView("clock")}} style={{width: "80px", height: "45px", display: 'flex' ,justifyContent: 'center', alignItems: "center", background: props.view == "clock" ? colorTheme.selectedBackground: colorTheme.unselectedBackground , boxShadow: props.view == "clock" ? colorTheme.boxShadow : "none", cursor: 'pointer'}}>
                    <ClockCircleOutlined style={{fontSize: "20px"}}/>
                </div>
                <div onClick={() => {props.setView("news")}} style={{width: "80px", height: "45px", display: 'flex' ,justifyContent: 'center', alignItems: "center", background: props.view == "news" ? colorTheme.selectedBackground: colorTheme.unselectedBackground , boxShadow: props.view == "news" ? colorTheme.boxShadow : "none", cursor: 'pointer'}}>
                    <PlayCircleOutlined style={{fontSize: "20px"}}/>
                </div>
                <div onClick={() => {props.setView("events")}} style={{width: "80px", height: "45px", display: 'flex', borderRadius: "0px 10px 10px 0px",justifyContent: 'center', alignItems: "center", background: props.view == "events" ? colorTheme.selectedBackground: colorTheme.unselectedBackground , boxShadow: props.view == "events" ? colorTheme.boxShadow : "none", cursor: 'pointer'}}>
                    <CalendarOutlined style={{fontSize: "20px"}}/>
                </div>

            </div>

        </div>
    )
}

export default BottomNav
