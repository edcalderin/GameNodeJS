//------Imports-----
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes/index')
const app = express()

//------Settings-----
app.set('port', process.env.PORT || 4000)

//------Middelwares-----
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use('/api/game/', routes) //Routes

const port = app.get('port')
app.listen(port, () => {
    console.log(`On port ${port}`)
})