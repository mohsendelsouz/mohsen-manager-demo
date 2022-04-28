import axios from 'axios'
const user = JSON.parse(localStorage.getItem('manager'))|| null

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

if (user)
  http.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

export default http