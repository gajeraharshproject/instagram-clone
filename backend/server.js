// require main fils
const express = require('express');
// middleware fles require
  const filuplode = require('express-fileupload');
 // cookie parser
 const cookieparser = require('cookie-parser');
//require connection db
require('./src/db/conn');

//.env config

//cors
const cors = require('cors')


 //aplie middlewarew

require('dotenv').config();


//create express app
const app = express();
// use middleware 
app.use(express.json());

//express files uplode 
app.use(filuplode());

//cookie parser use
app.use(cookieparser());

// aplie cores
app.use(cors());
//static folders




 app.use(express.static(__dirname + '/public/'));
  
// auth route
app.use('/auth', require('./src/routers/auth'));

//post routes

app.use('/poste',require('./src/routers/post'));

//likes router

app.use('/',require('./src/routers/likes'));


 app.use('/profile', require('./src/routers/profiledata')  );

//create server
app.listen(process.env.port, (err) => {
    console.log(`server is runing as http://localhost:${process.env.PORT}`);
})


