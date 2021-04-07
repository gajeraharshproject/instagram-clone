

const route = require('express').Router();

const authcontrol = require('../controlers/auth');

    

route.post('/register', authcontrol.registration );
route.post('/login',authcontrol.login);
route.get('/authcheck',authcontrol.authcheck );


module.exports = route;