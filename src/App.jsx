import React, { useEffect, useState } from "react";

import BottomNav from "./Components/BottomNav";
import Calendar from "./Components/Calendar";
import Clock from "./Components/Clock";
import Events from "./Components/Events";
import Food from "./Components/Food";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import Schedule from "./Components/Schedule";
import SchoolEnd from "./Components/SchoolEnd";

import Announcements from "./Components/Announcements";
import SpecialToast from "./Components/SpecialToast";

import {
  CalendarOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const App = () => {
  const settingsFromStorage = localStorage.getItem("scheduleSettings");
  if (!settingsFromStorage) {
    localStorage.setItem(
      "scheduleSettings",
      JSON.stringify({ royalDay: "A", grayDay: "A", display: "Timer" })
    );
  }
  try {
    let temp = JSON.parse(settingsFromStorage).blueDay;
  } catch {
    localStorage.removeItem("scheduleSettings");
    localStorage.setItem(
      "scheduleSettings",
      JSON.stringify({ royalDay: "A", grayDay: "A", display: "Timer" })
    );
  }
  console.log(localStorage.getItem("scheduleSettings")["blueDay"]);

  const seenEvents = localStorage.getItem("seen-events");
  if (!seenEvents) {
    localStorage.setItem("seen-events", JSON.stringify([]));
  }

  const fullViewStor = localStorage.getItem("fullView");
  if (fullViewStor) {
    localStorage.removeItem("fullView", false);
  }

  const [fullView, setFullView] = useState(false);
  const currView = localStorage.getItem("fullView");
  if (currView) {
    setFullView(true);
  }

  const [view, setView] = useState("clock");

  return (
    <>
      <div>
        <Navbar fullView={false} setFullView={setFullView} />
        <BottomNav setView={setView} view={view} />
        <Announcements />

        {view == "clock" && (
          <Clock fullView={fullView} setFullView={setFullView} />
        )}
        {view == "schedule" && <Schedule />}
        {view == "news" && <News />}
        {view == "events" && <Calendar />}
        {view == "food" && <Food />}
        {view == "schoolend" && <SchoolEnd />}

        <SpecialToast />
      </div>
    </>
  );
};

export default App;
