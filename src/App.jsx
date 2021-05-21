import React, { useState } from 'react'

import Navbar from  './Components/Navbar'
import Clock from  './Components/Clock'
import BottomNav from  './Components/BottomNav'
import Schedule from  './Components/Schedule'

import { CalendarOutlined, ClockCircleOutlined, UnorderedListOutlined, PlayCircleOutlined } from '@ant-design/icons';

const App = () => {

  
  const [view, setView] = useState("clock")

  
  return (
    <>
    
      <div>

        <Navbar/>
        <BottomNav setView={setView} view={view}/>


        {view == "clock" && <Clock/>}
        {view == "schedule" && <Schedule/>}
        
        

      </div>
    </>
  );
}

export default App;
