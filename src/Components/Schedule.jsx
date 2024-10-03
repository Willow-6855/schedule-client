import React, { useEffect, useState } from "react";
import { use100vh } from "react-div-100vh";

import { getSchedule } from "../API/api";
import useMedia from "../Hooks/useMedia";

import dayjs from "dayjs";

import {
  Box,
  CircularProgress,
  HStack,
  Stack,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const Schedule = (props) => {
  const MotionBox = motion(Box);
  const vh = use100vh();
  const mobile = useMedia(
    ["(min-width: 750px)", "(max-width: 750px)"],
    [false, true]
  );
  const { colorMode, toggleColorMode } = useColorMode();
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState();
  const [lunchType, setLunchType] = useState(null);
  const [webMobile, setwebMobile] = useState(false);

  useEffect(() => {
    getSchedule().then((response) => {
      if (response.data.data.Type == "Special") {
        setSchedule(response.data.data.ScheduleData.data);
        setLoading(false);
      } else {
        const fetchedSchedule = response.data.data.data;
        setSchedule(fetchedSchedule);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("scheduleSettings"));
    const dayType = localStorage.getItem("day-type");

    if (dayType == "Royal") {
      setLunchType(settings.royalDay);
    } else if (dayType == "Gray") {
      setLunchType(settings.grayDay);
    } else {
    }
  }, [localStorage.getItem("scheduleSettings")]);

  return (
    <>
      {/* <div
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          paddingTop: "5%",
          overflowY: "scroll",
          maxHeight: "80%",
          zIndex:100

          // This is the source of a previous bug!!! Make sure this is set to visible as far as my knowledge,
          // because it fixed issues regarding the schedule going behind the background lol
          // - John


          // Hawk Tuah !!! 
          // SPIT ON THAT THANG !!!
          

        }}
      >
        <div style={{
          width: "100%", 
          padding: "12px", 
          justifyContent: "center", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          position: "relative", 
          // top: "calc(2.5vmax + 1em)",
          overflowY: "visible",
          height: "100%",
        }}> */}
        <Box style={{ width: "100%", height: "100%", paddingBottom: "15%", overflowY: "hidden" }}>
          <Text
            fontSize="xl"
            style={{
              textAlign: "center",
              // marginTop: mobile ? (vh < 700 ? vh * 0.19 : vh * 0.09) : vh * 0.01,
            }}
          >
            Today is a{" "}
            <span
              style={{
                color:
                  localStorage.getItem("day-type") == "Royal"
                    ? "#0072c7"
                    : "#b7cee7",
              }}
            >
            {localStorage.getItem("day-type") == "Royal" ?
                "Blue" : "Gray"}
            </span>{" "}
            Day
          </Text>

          <Box style={{ 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            contain: "strict",
            width: "100%",
            height: "100%",
            overflowY: "auto",
            paddingBottom: "12px",
          }}>
            {!loading ? (
              schedule.map((period) => {
                if (period.periodName != "Passing Period") {
                  return (
                    <>
                      <MotionBox
                        whileHover={{ x: 10 }}
                        style={{
                          flexShrink: 0,
                          boxShadow: " 2px 2px 15px rgb(0,118,220,0.18) ",
                          width: "80%",
                          maxWidth: "500px",
                          height: mobile ? "60px" : "80px",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: vh * 0.02,
                          padding: "24px",
                        }}
                      >
                        <div>
                          <Text
                            fontSize="2xl"
                            level={mobile ? 4 : 3}
                            style={{
                              color: colorMode == "dark" ? "white" : "#333",
                              marginBottom: "0px",
                            }}
                          >
                            {period.periodName}
                          </Text>
                        </div>
                        <div>
                          <Text
                            style={{
                              color: colorMode == "dark" ? "white" : "#555",
                              fontSize: mobile ? "12px" : "14px",
                            }}
                          >
                            {period.startTime} - {period.endTime}
                          </Text>
                        </div>
                      </MotionBox>

                      {period.lunchPeriods && (
                        <div
                          id="hi"
                          style={{
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: mobile ? "flex-end" : "space-between",
                            flexDirection: mobile ? "column" : "row",
                            width: "80%",
                            maxWidth: "500px",
                          }}
                        >
                          {Object.keys(period.lunchPeriods).map((lunch) => {
                            return (
                              <MotionBox
                                whileHover={{ x: 3 }}
                                style={{
                                  boxShadow:
                                    !props.overrideLunch && lunch == lunchType
                                      ? "2px 2px 15px #ffdb58 "
                                      : " 2px 2px 15px rgb(0,118,220,0.18) ",
                                  width: mobile ? "85%" : "24%",
                                  maxWidth: "500px",
                                  height: mobile ? "60px" : "80px",
                                  borderRadius: "10px",
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginTop: vh * 0.02,
                                  padding: "24px",
                                }}
                              >
                                <div>
                                  <Text
                                    fontSize="2xl"
                                    level={mobile ? 4 : 3}
                                    style={{
                                      color: colorMode == "dark" ? "white" : "#333",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    {lunch}
                                  </Text>
                                </div>
                                <VStack spacing={1}>
                                  {mobile ? (
                                    <Text
                                      style={{
                                        color:
                                          colorMode == "dark" ? "white" : "#555",
                                        fontSize: mobile ? "12px" : "14px",
                                      }}
                                    >
                                      {period.lunchPeriods[lunch].startTime} -{" "}
                                      {period.lunchPeriods[lunch].endTime}
                                    </Text>
                                  ) : (
                                    <>
                                      <Text
                                        style={{
                                          color:
                                            colorMode == "dark" ? "white" : "#555",
                                          fontSize: mobile ? "10px" : "12px",
                                        }}
                                      >
                                        {period.lunchPeriods[lunch].startTime}
                                      </Text>
                                      <br />
                                      <Text
                                        style={{
                                          color:
                                            colorMode == "dark" ? "white" : "#555",
                                          fontSize: mobile ? "10px" : "12px",
                                        }}
                                      >
                                        {period.lunchPeriods[lunch].endTime}
                                      </Text>
                                    </>
                                  )}
                                </VStack>
                              </MotionBox>
                            );
                          })} 
                        </div>
                      )}
                      {period.pathwaysPeriods && (
                            <div
                              id="hi"
                              style={{
                                flexShrink: 0,
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: mobile ? "flex-end" : "space-between",
                                flexDirection: mobile ? "column" : "row",
                                width: "80%",
                                maxWidth: "500px",
                              }}
                            >
                              {Object.keys(period.pathwaysPeriods).map((pathwayPeriod) => {
                                return (
                                  <MotionBox
                                    whileHover={{ x: 3 }}
                                    style={{
                                      flexShrink: 0,
                                      boxShadow: " 2px 2px 15px rgb(0,118,220,0.18) ",
                                      width: mobile ? "49.5%" : "49.5%",
                                      maxWidth: "500px",
                                      height: mobile ? "60px" : "80px",
                                      borderRadius: "10px",
                                      cursor: "pointer",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      marginTop: vh * 0.02,
                                      padding: "24px",
                                    }}
                                  >
                                    <div>
                                      <Text
                                        fontSize="2xl"
                                        level={mobile ? 4 : 3}
                                        style={{
                                          color: colorMode == "dark" ? "white" : "#333",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        {pathwayPeriod}
                                      </Text>
                                    </div>
                                    <VStack spacing={1}>
                                      {mobile ? (
                                        <Text
                                          style={{
                                            color:
                                              colorMode == "dark" ? "white" : "#555",
                                            fontSize: mobile ? "12px" : "14px",
                                          }}
                                        >
                                          {period.pathwaysPeriods[pathwayPeriod].startTime} -{" "}
                                          {period.pathwaysPeriods[pathwayPeriod].endTime}
                                        </Text>
                                      ) : (
                                        <>
                                          <Text
                                            style={{
                                              color:
                                                colorMode == "dark" ? "white" : "#555",
                                              fontSize: mobile ? "10px" : "12px",
                                            }}
                                          >
                                            {period.pathwaysPeriods[pathwayPeriod].startTime}
                                          </Text>
                                          <br />
                                          <Text
                                            style={{
                                              color:
                                                colorMode == "dark" ? "white" : "#555",
                                              fontSize: mobile ? "10px" : "12px",
                                            }}
                                          >
                                            {period.pathwaysPeriods[pathwayPeriod].endTime}
                                          </Text>
                                        </>
                                      )}
                                    </VStack>
                                  </MotionBox>
                                );
                              })}
                            </div>
                          )}
                    </>
                  );
                }
              })
            ) : (
              <div
                style={{
                  height: vh - 250,
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  isIndeterminate
                  size={mobile ? window.innerWidth * 0.5 : 150}
                  thickness={2.5}
                />
              </div>
            )}
          </Box>
        </Box>
        {/* </div>
      </div> */}
    </>
  );
};

export default Schedule;
