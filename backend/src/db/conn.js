           
 const mongoose = require('mongoose');


 //conection


     mongoose.connect('mongodb://localhost:27017/instagram-clone',{
         useCreateIndex:true,
         useFindAndModify:true,
         useNewUrlParser:true,
         useUnifiedTopology:true,
         useFindAndModify:false
     }).then(() => {
         console.log('connection successfully');
     }).catch((err) => {
         console.log(err);
     });