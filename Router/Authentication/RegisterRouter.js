import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import registerUser from "../../Model/AuthenticationModel/UserModel.js";

const router = express.Router();

router.post('/Register', function PasswordSet(req, res, next){
    registerUser.findOne({UserId: req.body.UserId})
                .then(user => {
                  
                    if(user)
                    {
                        return res.status(404).json({
                            Success: false,
                            error: "User already exists"
                        })
                    }
                    else{
                        
                        var newUser = new registerUser({
                            UserId: req.body.UserId,
                            Passcode: req.body.Passcode,
                            ConfPasscode: req.body.ConfPasscode
                        });

                        bcrypt.genSalt(10, function HashPassword(error, salt){
                            bcrypt.hash(newUser.Passcode.toString(), salt, function SetHashPassword(error, hash){
                                if(error)
                                {
                                    return res.status(404).send({
                                        Success: false,
                                        error: "Unable to save passcode"
                                    });
                                }
                                else
                                {
                                    newUser.Passcode = hash;
                                    newUser.ConfPasscode = hash;
                                    newUser.save()
                                           .then(user => {
                                                return res.status(200).send({
                                                    Success: true
                                                })
                                           })
                                           .catch(error => res.status(404).send({
                                               Success: false,
                                               error: "Unable to register the user"
                                           }))
                                }
                            })
                        })
                        
                    }
                })
                .catch(error  => res.status(404).send({
                    Success: false,
                    error: "Unable to register the user"
                }))
});

export default router;