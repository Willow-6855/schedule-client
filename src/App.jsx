import React, { useState, useEffect } from "react";

import ReactGA from "react-ga";

import Navbar from "./Components/Navbar";
import Clock from "./Components/Clock";
import BottomNav from "./Components/BottomNav";
import Schedule from "./Components/Schedule";
import News from "./Components/News";
import Events from "./Components/Events";
import Food from "./Components/Food";
import SchoolEnd from "./Components/SchoolEnd";

import Announcements from "./Components/Announcements";
import SpecialToast from "./Components/SpecialToast";

import {
  CalendarOutlined,
  ClockCircleOutlined,
  UnorderedListOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

const App = () => {
  useEffect(() => {
    ReactGA.initialize("G-96GSCC5CW8");

    ReactGA.pageview("/");
  }, []);

  const settingsFromStorage = localStorage.getItem("scheduleSettings");
  if (!settingsFromStorage) {
    localStorage.setItem(
      "scheduleSettings",
      JSON.stringify({ royalDay: "A", blueDay: "A", display: "Timer" })
    );
  }

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
        {view == "events" && <Events />}
        {view == "food" && <Food />}
        {view == "schoolend" && <SchoolEnd />}

        <SpecialToast />
      </div>
    </>
  );
};

export default App;
