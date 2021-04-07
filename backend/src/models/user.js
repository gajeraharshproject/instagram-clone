const mongoose = require('mongoose');



const regitration_schema = mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    username:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    secure:{
        type:String,
        default:"public"
    },
    password:{
        type:String,
        required:true
    }

});



const registration_model = mongoose.model('Registration',regitration_schema);

module.exports = registration_model;