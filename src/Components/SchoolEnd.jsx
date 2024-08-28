import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { getClock } from "../API/api";

import useMedia from "../Hooks/useMedia";
import { use100vh } from "react-div-100vh";

import {
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";
import { getByText } from "@testing-library/react";

const SchoolEnd = () => {
  const mobile = useMedia(
    ["(min-width: 750px)", "(max-width: 750px)"],
    [false, true]
  );
  const vh = use100vh();

  const [beginDate, setBeginDate] = useState(dayjs("2023-08-09T00:00:00"));
  const [endDate, setEndDate] = useState(dayjs("2024-05-29T15:00:00"));
  const [name, setName] = useState("Break");
  const [status, setStatus] = useState("LOADING");
  const range = endDate - beginDate;
  const fromStart = dayjs().diff(beginDate);
  const toEnd = endDate - dayjs();

  const percent = (fromStart / range) * 100;

  let monthsLeft = dayjs.duration(toEnd, "ms").months();
  let daysLeft = dayjs.duration(toEnd, "ms").days();
  let hoursLeft = dayjs.duration(toEnd, "ms").hours();
  let minutesLeft = dayjs.duration(toEnd, "ms").minutes();
  let secondsLeft = dayjs.duration(toEnd, "ms").seconds();

  useEffect(() => {

    getClock().then((result) => {
      console.log(result.data);
      // Update state with the fetched data
      setBeginDate(dayjs(result.data.Start_Date));
      setEndDate(dayjs(result.data.End_Date));
      setName(result.data.title);
      setStatus("LOADED");
    });
  }, []);

  const genText = () => {
    //setText(theText);
    return `${monthsLeft}:${daysLeft > 0 ? `${daysLeft}:` : ""}${
      hoursLeft > 0 ? hoursLeft + ":" : ""
    }${
      minutesLeft > 9
        ? minutesLeft
        : hoursLeft > 0
        ? "0" + minutesLeft
        : minutesLeft
    }:${secondsLeft > 9 ? secondsLeft : "0" + secondsLeft}`;
  };

  const [timeText, setTimeText] = useState("");
  const [currentTime, setCurrentTime] = useState(dayjs().valueOf());

  useEffect(() => {
    //genText();
    timer();
  }, []);

  const timer = () => {
    setCurrentTime(dayjs().valueOf());
    setTimeout(() => timer(), 1000);
  };
  
  return status !== "LOADING" ? (
    <div
      style={{
        height: vh - 120,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        trackColor="#f5f5f5"
        thickness={3.5}
        size={mobile ? window.innerWidth * 0.85 : 580}
        value={percent}
        capIsRound={true}
      >
        <CircularProgressLabel>
          <Text marginBottom={0} fontSize={mobile ? "2.5rem" : "70px"}>
            {genText()}
          </Text>
          <Text
            type="secondary"
            style={{
              color: "grey",
              fontSize: mobile ? "1.3rem" : "1.4rem",
              marginTop: "0px",
              wordSpacing: "3px",
            }}
          >
            Until {name}!
          </Text>
        </CircularProgressLabel>
      </CircularProgress>
    </div>
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
  );
};

export default SchoolEnd;
