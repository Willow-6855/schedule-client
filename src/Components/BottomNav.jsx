import React from "react";

import useMedia from "../Hooks/useMedia";

import {
  CalendarOutlined,
  ClockCircleOutlined,
  UnorderedListOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { theme, useColorMode, Text , Center } from "@chakra-ui/react";
import RestaurantOutlinedIcon from "@material-ui/icons/RestaurantOutlined";

const BottomNav = (props) => {
  const mobile = useMedia(
    ["(min-width: 750px)", "(max-width: 750px)"],
    [false, true]
  );
  const { colorMode, toggleColorMode } = useColorMode();

  let colorTheme;

  if (colorMode == "dark") {
    colorTheme = {
      selectedBackground: "#54617a",
      unselectedBackground: "#3a4354",
      // boxShadow: "2px 2px 10px rgb(0,118,220,0.32)",
    };
  } else if (colorMode == "light") {
    colorTheme = {
      selectedBackground: "white",
      unselectedBackground: "#f8f8f8",
      // boxShadow: "2px 2px 10px rgb(0,118,220,0.32)",
    };
  }

  const iconStyle = { 
    fontSize: "20px", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center" 
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "fixed",
        bottom: "30px",
        marginTop: "20px",
        zIndex: "1",
      }}
    >
      <div
        style={{
          display: "flex",
          zIndex: 4,
          // boxShadow: "2px 2px 10px rgb(0,118,220,0.2)",
          borderRadius: "10px",
        }}
      >
        <div
          onClick={() => {
            props.setView("food");
          }}
          style={{
            width: mobile ? "70px" : "80px",
            height: "45px",
            display: "flex",
            borderRadius: "10px 0px 0px 10px",
            justifyContent: "center",
            alignItems: "center",
            background:
              props.view == "food"
                ? colorTheme.selectedBackground
                : colorTheme.unselectedBackground,
            boxShadow: props.view == "food" ? colorTheme.boxShadow : "none",
            cursor: "pointer",
          }}
        >
          <RestaurantOutlinedIcon style={{ fontSize: "20px" }} />
        </div>
        <div
          onClick={() => {
            props.setView("schedule");
          }}
          style={{
            width: mobile ? "70px" : "80px",
            height: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background:
              props.view == "schedule"
                ? colorTheme.selectedBackground
                : colorTheme.unselectedBackground,
            boxShadow: props.view == "schedule" ? colorTheme.boxShadow : "none",
            cursor: "pointer",
          }}
        >
          <Center><i class="bi bi-list" style={{fontSize: "25px", display: "flex", justifyContent: "center", alignItems: "center"}}></i></Center>
        </div>
        <div
          onClick={() => {
            props.setView("clock");
          }}
          style={{
            width: mobile ? "70px" : "80px",
            height: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background:
              props.view == "clock"
                ? colorTheme.selectedBackground
                : colorTheme.unselectedBackground,
            boxShadow: props.view == "clock" ? colorTheme.boxShadow : "none",
            cursor: "pointer",
          }}
        >
          <Center><i class="bi bi-clock" style={iconStyle}></i></Center>
        </div>
        <div
          onClick={() => {
            props.setView("schoolend");
          }}
          style={{
            width: mobile ? "70px" : "80px",
            height: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background:
              props.view == "schoolend"
                ? colorTheme.selectedBackground
                : colorTheme.unselectedBackground,
            boxShadow:
              props.view == "schoolend" ? colorTheme.boxShadow : "none",
            cursor: "pointer",
          }}
        >
          {/* <ClockCircleOutlined style={{ fontSize: "20px" }} /> */}
          <Center><i class="bi bi-hourglass-split" style={iconStyle}></i></Center>
        </div>
        <div
          onClick={() => {
            props.setView("events");
          }}
          style={{
            width: mobile ? "70px" : "80px",
            height: "45px",
            display: "flex",
            borderRadius: "0px 10px 10px 0px",
            justifyContent: "center",
            alignItems: "center",
            background:
              props.view == "events"
                ? colorTheme.selectedBackground
                : colorTheme.unselectedBackground,
            boxShadow: props.view == "events" ? colorTheme.boxShadow : "none",
            cursor: "pointer",
          }}
        >
          <Center><i class="bi bi-calendar" style={iconStyle}></i></Center>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
