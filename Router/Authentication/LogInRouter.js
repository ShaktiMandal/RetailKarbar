import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import LogInUser from "../../Model/AuthenticationModel/UserModel.js";

const router = express.Router();

router.post('/LogIn', (req, res, next)=>{

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
export default router;