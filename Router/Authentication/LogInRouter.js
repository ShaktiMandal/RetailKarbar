const express = require("express");
const router = express.Router();
const cors   = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt    = require("jsonwebtoken");
const key    = require('../../Config/Config');
const LogInUser = require('../../Model/AuthenticationModel/UserModel');

router.post('/LogIn', (req, res, next)=>{

    console.log("I am here in log In with session", req.session);
    LogInUser.findOne({UserId: req.body.UserId})
                .then( user => {
                        if(!user)
                        {                
                            return res.status(404).send({
                                Success: false,
                                error: "User does not exists"
                            })
                        }
                        else{
                            
                            bcrypt.compare(req.body.Passcode, user.Passcode)
                            .then( isPasswordMatch => {
                                if(isPasswordMatch)
                                {
                                    req.logIn(user._id, (error) => {
                                        if(!error)
                                        {
                                            return res.status(200).json({                                          
                                                                Success: true,
                                                                UserId: user._id
                                                        })
                                        }
                                    })                           
                                }
                                else{
                                    return res.status(400).json({
                                        Success: false,
                                        error: "Password does not match"
                                    })
                                }
                            })
                            .catch(error => res.status(400).json({
                                Success: false,
                                error: "Unable to find the user"
                            }))                            
                        }
                })
                .catch( err => res.status(400).json({
                    Success: false,
                    error: "Unable to find the user"})
                );
});

router.post('/LogOut', (req,res,next) =>{
    req.logOut();
    req.session.destroy();

    res.status(200).send({
        Success: true
    });
});

passport.serializeUser(function(userId, done)
{
    done(null, userId);
});

passport.deserializeUser(function(userId, done)
{
    done(null, userId);
});

module.exports = router;