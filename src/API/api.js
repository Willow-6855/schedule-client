import axios from "axios";

const url = "https://schedule-client-api.herokuapp.com";
//const url = "http://localhost:5000";
const newsUrl = "https://hsenews.com/wp-json/wp/v2/posts/?categories=493";

export const getSchedule = () => {
  return axios.get(`${url}/schedules`);
};
export const getAnnouncements = () => {
  return axios.get(`${url}/announcements`);
};
export const getLunch = () => {
  return axios.get(`${url}/schedules/lunch`);
};

export const getNewsCasts = () => {
  return axios.get(newsUrl);
};

export const getCalendar = () => {
  console.log("getting calendar");
  return axios.get(`${url}/announcements/calendar`);
};
export const getClock = () => {
  return axios.get(`${url}/announcements/breakclock`);
};

