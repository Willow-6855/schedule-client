import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { use100vh } from "react-div-100vh";
import dayjs from "dayjs";
import "../Styles/Calendar.css";
import {
  Box,
  Text,
  useColorMode,
  CircularProgress,
  VStack,
  Stack,
  HStack,
  Title,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { setDate } from "date-fns/esm";
import useMedia from "../Hooks/useMedia";
import calen from "../Assets/Calendarimg.jpg";
import { getCalendar } from "../API/api";
const dateFns = require("date-fns");

const Events = () => {
  const vh = use100vh();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDay, setStartDay] = useState("royal");
  const [cali, setCalendar] = useState([]);

  useEffect(() => {
    console.log("getting calendar")
    getCalendar().then((result) => {
      console.log(result.data) 
       setCalendar(result.data)
       console.log("img"+cali.calendar_img)
    })
}, [])
  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            <ChevronLeftIcon />
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">
            <ChevronRightIcon />
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "eee";
    const days = [];
    let startDate = dateFns.startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  const isRoyal = (dayNum, monthNum) => {
    if (monthNum % 2 == 0) {
      if (dayNum % 2 == 0) {
        return true;
      } else {
        return false;
      }
    } else {
      if (dayNum % 2 == 0) {
        return false;
      } else {
        return true;
      }
    }
  };

  const mobile = useMedia(["(max-width: 450px)"], [true]);

  const renderCells = () => {
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    const monthFormat = "M";
    const monthNumber = parseInt(dateFns.format(currentMonth, monthFormat));
    console.log(monthNumber);

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col ${mobile ? "mobile-cell" : ""} cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : i == 0 || i == 6
                ? "weekend"
                : isRoyal(parseInt(formattedDate), monthNumber)
                ? dateFns.isSameDay(day, selectedDate)
                  ? "selected-royal-day"
                  : "royal-day"
                : dateFns.isSameDay(day, selectedDate)
                ? "selected-blue-day"
                : "blue-day"
            }`}
            key={day}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(dateFns.addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(dateFns.subMonths(currentMonth, 1));
  };

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <img src={cali.calendar_img} />
    </div>
  );
  return (
    <div
      style={{
        height: mobile ? vh - 300 : vh - 200,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
      }}
    >
      <div
        className="calendar"
        id="made-with-<3-by-chris-farber-:)"
        style={{ maxWidth: "50em" }}
      >
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
        <div
          style={{
            width: "24px",
            height: "24px",
            background: "#86a4ff",
            borderRadius: "4px",
          }}
        />
        <p
          style={{ fontWeight: "bold", marginLeft: "4px", marginRight: "8px" }}
        >
          Royal day
        </p>
        <div
          style={{
            width: "24px",
            height: "24px",
            background: "#c1d0ff",
            borderRadius: "4px",
          }}
        />
        <p style={{ fontWeight: "bold", marginLeft: "4px" }}>Gray day</p>
      </div>
    </div>
  );
};

export default Events;
