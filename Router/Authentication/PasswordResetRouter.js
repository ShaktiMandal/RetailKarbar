import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import resetUser from "../../Model/AuthenticationModel/UserModel.js";

const router = express.Router();

router.post('/ResetPassword', function(req, res, next){
    resetUser.findOne({UserId: req.body.UserId})
        .then( user => {
            if(user)
            {
                   
                let updatedUser = new resetUser({
                    UserId: req.body.UserId,
                    Passcode: req.body.Passcode,
                    ConfPasscode: req.body.ConfPasscode
                })
                bcrypt.genSalt(10, function HashPassword(error, salt){
                    bcrypt.hash(updatedUser.Passcode, salt, function SetHashPassword(error, hash){
                        if(error)
                        {
                            return res.status(404).send({
                                Success: false,
                                error: "Unable to reset passcode"
                            });
                        }
                        else
                        {
                            updatedUser.Passcode = hash;
                            updatedUser.ConfPasscode = hash;
                            resetUser.findOneAndUpdate({UserId: updatedUser.UserId}, 
                            {
                                $set:{
                                    ConfPasscode: updatedUser.ConfPasscode, 
                                    Passcode: updatedUser.Passcode
                                }
                            })
                            .then(user => {
                                return res.status(200).send({
                                    Success: true
                                })
                            })
                            .catch(error => res.status(404).send({
                                Success: false,
                                error: "Unable to find the user"
                            }))
                        }
                    })
                })
                .catch(error => res.status(404).send({
                    Success: false, 
                    error: "Unable to retrieve user details. Please try after sometime."
                }))
            }
        })
});

export default router;