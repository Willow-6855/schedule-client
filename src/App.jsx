import React, { useState, useEffect } from 'react'

import Navbar from  './Components/Navbar'
import Clock from  './Components/Clock'
import BottomNav from  './Components/BottomNav'
import Schedule from  './Components/Schedule'
import News from  './Components/News'
import Events from  './Components/Events'
import Announcements from  './Components/Announcements'

import { CalendarOutlined, ClockCircleOutlined, UnorderedListOutlined, PlayCircleOutlined } from '@ant-design/icons';

const App = () => {

  
  const [view, setView] = useState("clock")
  const [settings,setSettings] = useState({lunch: 'A', display: 'Timer'})

  const loadSettings = () => {
    const settingsFromStorage = localStorage.getItem('scheduleSettings')
    
    if(settingsFromStorage){
      setSettings(JSON.parse(settingsFromStorage))
      console.log('grabbed')
    } else(
      localStorage.setItem('scheduleSettings', JSON.stringify(settings))
    )
  }

  useEffect(() => {
    loadSettings()
  }, [])


  return (
    <>
    
      <div>

        <Navbar/>
        <BottomNav setView={setView} view={view}/>
        <Announcements />

        {view == "clock" && <Clock/>}
        {view == "schedule" && <Schedule/>}
        {view == "news" && <News/>}
        {view == "events" && <Events/>}
        
        

      </div>
    </>
  );
}

export default App;
