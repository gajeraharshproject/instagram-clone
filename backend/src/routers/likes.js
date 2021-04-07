
const route = require('express').Router();

const likescont = require('../controlers/likes');
      
 route.put('/like',likescont.like);
 route.put('/unlike',likescont.unlike);
 route.put('/comment',likescont.comment);


module.exports = route;