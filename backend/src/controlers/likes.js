
const jwt = require('jsonwebtoken');
const post = require('../models/post');
exports.like = async function (req, res) {

        const { postid } = req.body;
        const token = req.cookies.token;
        try {
                const user = await jwt.verify(token, process.env.SECRATE);
                const userid = user.id;

                const updatedrecords = await post.findByIdAndUpdate(postid, {
                        $push: { likes: userid }
                }, {
                        new: true
                });

                if (updatedrecords) {
                        return res.json({
                                msg: "updated",
                                success: true,
                                updatedrecords
                        });
                }

                res.status(400).json({
                        msg: "like no added",
                        success: false,

                });

        } catch (error) {
                console.log(error);
        }
}



//unlike

exports.unlike = async function (req, res) {

        const { postid } = req.body;
        const token = req.cookies.token;
        try {
                const user = await jwt.verify(token, process.env.SECRATE);
                const userid = user.id;

                const updatedrecords = await post.findByIdAndUpdate(postid, {
                        $pull: { likes: userid }
                }, {
                        new: true
                });

                if (updatedrecords) {
                        return res.json({
                                msg: "updated",
                                success: true,
                                updatedrecords
                        });
                }

                res.status(400).json({
                        msg: "unlike like no added",
                        success: false,

                });

        } catch (error) {
                console.log(error);
        }






}


exports.comment = async function (req, res) {
        const { postid, comment } = req.body;
        const token = req.cookies.token;

        try {
                if (!postid || !comment) {
                        return res.status(400).json({
                                msg: "Enter all Details",
                                success: false
                        });
                }
                const user = await jwt.verify(token, process.env.SECRATE);
                const userid = user.id;
              const comments = {
                     text:comment,
                    postedby:userid

                 } 
          console.log(userid);
                const updatecomment = await post.findByIdAndUpdate(postid, {
                        $push:{comment:comments}
                }, {
                        new: true
                });


                if (updatecomment) {
                        return res.json({
                                msf: "comment addesd",
                                success: true,
                                updatecomment
                        })
                }


                res.status(400).json({
                        msg: "commetn not added",
                        success: false
                })

        } catch (error) {
                console.error(error);
        }
}