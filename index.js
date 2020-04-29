//this is to import express js into application
const express = require('express')
const appConfig = require('./config/appConfig')
const fs =require('fs')
const mongoose= require('mongoose')

//creating instance of application
const app = express()
//declaring the port
let routesPath ='./routes';
fs.readdirSync(routesPath).forEach(function(file) {
    if(~file.indexOf('.js'))
    {
        console.log("including file"+routesPath+'/'+file);
        let route =require(routesPath+'/'+file);
        route.setRouter(app);
    }

});

//listing the server
app.listen(appConfig.port, () =>{ console.log(`Example app listening at http://localhost:${appConfig.port}`)

//creating a connection to database ,{useNewUrlParser: true}

let db = mongoose.connect(appConfig.db.uri,{useNewUrlParser: true});
})

//handeling mongoose connection error
mongoose.connection.on('error',function(err){

    console.log('database connection error');
    console.log (err);

});
//handeling mongoose success event
mongoose.connection.on('open',function(err){
    if(err){
        console.log("database error")
        console.log(err)
    }
    else{
        console.log("database connection open success");
    }
});


