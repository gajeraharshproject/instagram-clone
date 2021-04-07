
const regis = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registration = async function (req, res) {

    const { email, username, fullname, password, cpassword } = req.body;

    try {

        const user = await regis.findOne({email});
          if(!email || !username || !fullname || !password || !cpassword ){
              res.status(400).json({
                  msg:"Enter all details",
                  success:false
              })
          }else{
            if (user) {
                return res.status(400).json({
                    msg: "user alredy exist",
                    success: false
                });
            }

             const selt = await bcrypt.genSalt(10);
             const hash =  await bcrypt.hash(password,selt);
              if(hash){
                  const add_user  = new regis({
                      email,
                      username,
                      fullname,
                      password:hash
                  });

                  const save_user = await add_user.save();
                  if(save_user){
                      res.json({
                          msg:"acount created successfully",
                          success:true,
                          user:save_user
                      });
                  }else{
                    res.status(400).json({
                        msg:"try again",
                        success:false
                    });
                  }
              }

          }
        
         

    } catch (error) {
        console.log(error);
    }




};




exports.login = async function (req,res){
       const {email,password} = req.body;

        try {
         if(!email || !password){
           return  res.status(400).json({
                 msg:"Enter all details",
                 success:false
             });
         }

         const user = await regis.findOne({email});
         if(!user){
           return res.status(400).json({
               msg:"user not exist plese enter correcrt details",
               success:false
           });
         }


         const compare = await bcrypt.compare(password,user.password);
         if(!compare){
             return res.status(400).json({
                 msg:"Enter correct passwrod",
                 success:false
             });
         }
        const todate = new Date();
        todate.setHours(todate.getHours()+1);
        todate.toLocaleTimeString();
        console.log(todate);
         const token = jwt.sign({
             id:user._id,
             email:user.email,
             username:user.username,
             fullname:user.fullname,
             secure:user.secure,
         },process.env.SECRATE,{
             expiresIn:'1h',
         });
              var date = new Date() + 3600000;
              //  var expire = 1;
               // date.setDate(date.getMinutes()+expire);
            if(token){ 
             res.cookie('token', token , {
                 expire : date
             });

                res.json({
                    msg:"You are loggedin",
                    success:true,
                    token,
                    user,
                    todate
                    
                })
            }
          

  
        } catch (error) {
            console.log(error);
        }

}




exports.authcheck = async function(req,res){
        
    const token = req.cookies.token;
   //  console.log(token);
    // const profiledata = jwt.verify(token,process.env.SECRATE);

            if(!token) {  return res.status(404).json({msg:"auth falil" , success:false }); }

            res.status(200).json({
                msg:"aluth success",
                success:true,
                token,
            });
      
       
}