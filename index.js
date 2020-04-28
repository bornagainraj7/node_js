//this is to import express js into application
const express = require('express')
const appConfig = require('./config/appConfig')
//creating instance of application
const app = express()
//declaring the port
const port = 3000

let helloWorld = (req,res) =>res.send('hello world')
app.get('/',helloWorld);
//listing the server
app.listen(appConfig.port, () => console.log(`Example app listening at http://localhost:${port}`))