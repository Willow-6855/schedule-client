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

  const settingsFromStorage = localStorage.getItem('scheduleSettings')
  if(!settingsFromStorage){localStorage.setItem('scheduleSettings', JSON.stringify({lunch: 'A', display: 'Timer'}))}
  
  
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
        
        

      </div>
    </>
  );
}

export default App;
