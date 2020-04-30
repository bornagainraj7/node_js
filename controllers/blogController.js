const express = require ('express');
const mongoose = require('mongoose');
const shortid = require('shortid');

//importing the model here
const BlogModel= mongoose.model('Blog')

let getAllBlog =(req,res) =>
{
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err,result)=> {
            if(err){
                console.log(err);
                res.send(err);
            }else if(check.isEmpty(result == undefined||result==''||result==null)) {
                console,log('no blog found');
                res.send("No Blog Found")
            }else {
                res.send(result)
            }
        })
}//end get all blog

//function to read a single blog

let viewByBlogId =(req,res) => {

    BlogModel.findOne({'blogId':req.params.blogId},(err,result) =>{

        if(err) {
            console.log(err)
            res.send(err)
        }else if (result == undefined||result ==null||result==''){
            console,log('no blog found');
            res.send("No Blog Found")
        }else {
            res.send(result)
        }
    } )
}//end of get blog by id


let viewByAuthor=(req,res) =>{

    BlogModel.findOne({'author':req.params.author},(err,result) =>{
        if(err){
            console.log(err)
            res.send(err)
        }else if (result == undefined||result ==null||result==''){
            console,log('no blog found');
            res.send("No Blog Found")
        }else {
            res.send(result)

        }
    })
}

let viewByCategory=(req,res) =>{
    BlogModel.findOne({'category':req.params.category},(err,result)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else if (result == undefined||result ==null||result==''){
            console,log('no blog found');
            res.send("No Blog Found")
        }else {
            res.send(result)

        }
    })
}
    /*edited by Author*/
let editBlog =(req,res) => {
    let options =req.body;
    console.log(options);

    BlogModel.update({'blogId':req.params.blogId},options,{multi:true}).exec((err,result)=> {

        if(err){
            console.log(err)
            res.send(err)
        }else if (result == undefined||result ==null||result==''){
            console,log('no blog found');
            res.send("No Blog Found")
        }else {
            res.send(result)

        }
    })    
}

/* function to delete the assignment collection.
 */
let deleteBlog = (req, res) => {
    BlogModel.remove({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })
}

/*creating a blog*/
let createBlog = (req, res) => {
    var today = Date.now()
    let blogId = shortid.generate()

    let newBlog = new BlogModel({

        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.blogBody,
        isPublished: true,
        category: req.body.category,
        author: req.body.fullName,
        created: today,
        lastModified: today
    }) // end new blog model
   

    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
    newBlog.tags = tags

    newBlog.save((err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(result)

        }
    }) // end new blog save

}

/*function to increase views of a blog.
 */
let increaseBlogView = (req, res) => {

    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            
            result.views += 1;
            result.save(function (err, result) {
                if (err) {
                    console.log(err)
                    res.send(err)
                }
                else {
                    console.log("Blog updated successfully")
                    res.send(result)

                }
            });// end result

        }
    })
}

/* let testRoute =(req,res) =>{

//     console.log(res);
//     res.send(req.params);
// } //end test

// let testQuery = (req,res) =>{
//     console.log(req.query);
//     res.send(req.query);
// }

// let testBody =(req,res) => {
//     console.log(req.body);
//     res.send(req.body);
// }

//let helloWorld = (req,res) =>res.send('hello world');
//let PrintExample =(req,res)=>res.send("print example");
*/
module.exports = {
/*helloWorld : helloWorld,
//PrintExample : PrintExample
testRoute :testRoute,
testQuery:testQuery,
testBody:testBody
*/

    getAllBlog: getAllBlog,
    createBlog: createBlog,
    viewByBlogId: viewByBlogId,
    viewByCategory: viewByCategory,
    viewByAuthor: viewByAuthor,
    editBlog: editBlog,
    deleteBlog: deleteBlog,
    increaseBlogView: increaseBlogView
}


