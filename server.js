
const express = require('express')
const pool = require('./db')

const authRoutes = require("./application/routes/authRoutes");
const setupRoutes = require("./application/routes/setupRoutes");
const sensorRoutes = require("./application/routes/sensorRoutes");
const analyzeRoutes = require("./application/routes/analyzeRoutes");

const port = 3000
const app = express()

app.use(express.json())
app.use('/auth', authRoutes)
app.use('/setup',setupRoutes)
app.use('/sensor',sensorRoutes)
app.use('/sensor-data', analyzeRoutes)

app.listen(port, () => console.log(`Server has started on port: ${port}`))