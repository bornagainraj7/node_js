///example middleware function

let exampleMiddleware =(req,res,next) => {
    req.user ={'firstName':'Aditya','lastName':'Kumar'}
    next();

}//end request ip logger function

module.exports ={

    exampleMiddleware:exampleMiddleware
}