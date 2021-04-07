const mongoose = require('mongoose');




 const {ObjectId} = mongoose.Schema.Types
 
const post_schema = new mongoose.Schema({

     user_id:{
         type:String, 
         required:true,
         
     },
     title:{
         type:String,
         required:true
     },
     desc:{
         type:String,
         
     },
     image:{
         type:String,
         required:true
     },
     likes:[{type:ObjectId,ref:"user"}],
     comment:[{
         text:String,
         postedby:{type:ObjectId,ref:"user"}
    }],


},{timestamps:true});



const post_model = mongoose.model('Post',post_schema);

module.exports = post_model;