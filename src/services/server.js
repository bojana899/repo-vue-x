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
