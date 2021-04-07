  
      

const route = require('express').Router();

const postcont = require('../controlers/post'); 

 route.get('/profiledata:username',postcont.fechprofilepost );



module.exports = route;