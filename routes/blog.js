const express = require ('express')
const blogController = require('./../controllers/blogController')


let setRouter = (app) => {

    app.get('/hello',blogController.helloWorld);
    app.get('/example',blogController.PrintExample);
}// end router functin

module.exports = {

 setRouter : setRouter 

}