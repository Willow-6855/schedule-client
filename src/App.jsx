import React, { useState, useEffect } from 'react'

import Navbar from  './Components/Navbar'
import Clock from  './Components/Clock'
import BottomNav from  './Components/BottomNav'
import Schedule from  './Components/Schedule'
import News from  './Components/News'
import Events from  './Components/Events'
import Food from  './Components/Food'

import Announcements from  './Components/Announcements'
import SpecialToast from  './Components/SpecialToast'

import { CalendarOutlined, ClockCircleOutlined, UnorderedListOutlined, PlayCircleOutlined } from '@ant-design/icons';

const App = () => {

  const settingsFromStorage = localStorage.getItem('scheduleSettings')
  if(!settingsFromStorage){localStorage.setItem('scheduleSettings', JSON.stringify({royalDay: 'A', blueDay: 'A', display: 'Timer'}))}
  
  const seenEvents = localStorage.getItem('seen-events')
  if(!seenEvents){localStorage.setItem('seen-events', JSON.stringify([]))}

  const [view, setView] = useState("clock")
    

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
        {view == "food" && <Food/>}
        
        <SpecialToast />

      </div>
    </>
  );
}

export default App;
