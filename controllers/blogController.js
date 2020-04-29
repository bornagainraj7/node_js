const express = require ('express')




let helloWorld = (req,res) =>res.send('hello world');
let PrintExample =(req,res)=>res.send("print example");

module.exports = {
helloWorld : helloWorld,
PrintExample : PrintExample

}


