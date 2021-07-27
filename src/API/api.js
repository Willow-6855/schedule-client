import axios from 'axios'

const url = "https://schedule-client-api.herokuapp.com"

export const getSchedule = () => {return axios.get(`${url}/schedules`)}
export const getAnnouncements = () => {return axios.get(`${url}/announcements`)}