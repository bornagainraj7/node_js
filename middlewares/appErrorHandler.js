let errorHandler = (err,req,res,next) =>{

    console.log("application error handler");
    console.log(err);
    console.log('some error occured at global level');
}//erro handeler

let notFoundHandler= (req,res,next) =>{

    console.log('Global not found handeller called');
    res.status(404).send('Route not found for application');
}//error not found handler


module.exports = {
    globalErrorHandler:errorHandler,
    globalNotFoundHandler :notFoundHandler

}

