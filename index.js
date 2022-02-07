const port = process.env.PORT || 3000
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const mongoose = require('mongoose')
const io = require('socket.io')(http)
const routes = require('./Routes/Routes.js')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))

const db = "mongodb+srv://all_user:comp3133_access@comp3123.bxzhg.mongodb.net/comp3133?retryWrites=true&w=majority"

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(routes)

http.listen(port, () => {
    console.log('listening at port: ' + port)
})