const post_model = require('../models/post');
const jwt = require('jsonwebtoken');
const user_model = require('../models/user');
exports.post = async function (req, res) {
    if (!req.body.title) {
        return res.status(400).json({
            msg: "Enter all details",
            success: false
        });
    }


    const { user_id } = req.body;
    try {
        const { title, desc } = req.body;

        const file = req.files.imge;
        const filename = file.name;

        const fm = await file.mv(`../insta-f/public/uplode/` + filename);
        const token = req.cookies.token;
        // console.log(token);
        console.log(token);
        const user = jwt.verify(token, process.env.SECRATE);
        const user_id = user.id;
        console.log(user_id);


        const add_post = new post_model({
            user_id,
            title,
            image: filename,
            desc,

        });
        const add_user_asve = await add_post.save();
          if(add_user_asve){
            res.json({
                msg: "post added",
                success: true,
                user,
                add_user_asve
    
            })
          }

       



    } catch (error) {
        console.log(error);
        //   res.status(400).json({
        //       msg:"enter imge",
        //       success:false
        //   })
    }


}




exports.fechprofilepost = async function (req, res) {


    try {
        const user_id = req.params.username;
//console.log(user_id);
        const profiledata = await post_model.find({user_id})
        const  profiledetails = await user_model.findById(user_id);
        console.log(profiledetails);
            
        if (!profiledata) return res.status(404).json({ msg: "Recode not foound", success: false });

        res.json({
            msg: "ok",
            success: true,
            profiledata,
            profiledetails,
        });


    } catch (error) {
              console.log(error);
    }
}







exports.allpost = async function (req,res) {
     
           try {
            const postdata =  await post_model.find({});
          //  console.log(postdata);
            if(!postdata) {return   res.status(404).json({msg:"records not found" , success:false})  }
               
             res.json({
                 msg:"data suplide",
                 success:true,
                postdata
             });
           } catch (error) {
                console.log(error);
           }
     
}