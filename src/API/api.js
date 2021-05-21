import axios from 'axios'

const url = "http://localhost:5000/schedules"

export const getSchedule = () => {return axios.get(url)}