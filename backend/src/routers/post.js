  
      

const route = require('express').Router();

const postcont = require('../controlers/post');
   
 route.post('/',postcont.post);
 route.get('/allpost',postcont.allpost);



module.exports = route;