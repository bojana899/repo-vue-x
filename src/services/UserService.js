import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

export default {
  getUsers(perPage, page) {
    return apiClient.get('/users?_limit=' + perPage + '&_page=' + page)
  },
  getUser(id) {
    return apiClient.get('/users/' + id)
  },
  postUser(user) {
    return apiClient.post('/users', user)
  },
}


const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

// Enable CORS for all routes
app.use(cors())

// Define your routes and middleware configurations here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
