import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import LogIn from './Router/Authentication/LogInRouter.js';
import PasswordReset from './Router/Authentication/PasswordResetRouter.js';
import Registration from './Router/Authentication/RegisterRouter.js';
import Product from './Router/Product/ProductRouter.js';
import Customer from './Router/Customers/CustomerRouter.js';
import Dealer from './Router/Customers/DealerRoute.js';
import PageLoad from './Router/Authentication/LoadingRouter.js';
import session from 'express-session';
import Passport from 'passport';
import passport from "passport";
import connectMongo from 'connect-mongo';
import Cors from 'cors';
import { SlowBuffer } from "buffer";
import dotenv from 'dotenv';
// import MongoStore from 'connect-mongo';

dotenv.config({ path: '.env.local' });

const MongoStore = connectMongo(session);
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const path       = require("path");
// const LogIn = require('./Router/Authentication/LogInRouter');
// const PasswordReset = require('./Router/Authentication/PasswordResetRouter');
// const Registration = require('./Router/Authentication/RegisterRouter');
// const Product      = require('./Router/Product/ProductRouter');
// const Customer     = require('./Router/Customers/CustomerRouter');
// const Dealer     = require('./Router/Customers/DealerRoute');
// const PageLoad   = require('./Router/Authentication/LoadingRouter');
// const session = require('express-session');
// const Passport = require('passport');
// const passport = require("passport");
// const MongoStore = require('connect-mongo')(session);
// const Cors = require('cors');
// const { SlowBuffer } = require("buffer");
// require('dotenv').config();

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const App   = express();
const port =  process.env.PORT || 5000;

// const port = 3000;

App.use(bodyParser.urlencoded({extended: false}));
App.use(bodyParser.json());
if (process.env.NODE_ENV === "production") {
    console.log("Server path", __dirname);
    App.use(express.static(path.join(__dirname, "client/build")));
    App.enable("trust proxy", 1);   
  }
  else {
    App.use(express.static(path.join(__dirname, '/client/public')));
  }
App.use(Cors({
    origin: true,
    credentials: true
}));
App.use(session({
    name:"application_session",
    resave: false,
    saveUninitialized: false,
    secret: '12eghdjfksdjf34r32423ekasjdnkasjd',  
    proxy: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    
    cookie: {
        httpOnly: true,
        sameSite: "none", 
        secure: true,       
        maxAge: 45000000       
    }
}));
App.use(passport.initialize());
App.use(passport.session());

App.use('*', function Authentication(req,res,next){  
  
    res.header("Access-Control-Expose-Headers", "Is-UserloggedIn");    
    if(req.isAuthenticated())
    { 
        res.setHeader("Is-UserloggedIn","true");
        next();
    }
    else
    {
        res.setHeader("Is-UserloggedIn","false"); 
        next();
    }
});

App.use('/Authentication/User', LogIn);
App.use('/Authentication/PasswordReset', PasswordReset);
App.use('/Authentication/RegisterUser', Registration);
App.use('/Product' , Product);
App.use('/Customer' , Customer);
App.use('/Dealer' , Dealer);
App.use('/', (req, res) => {

    let option = {
        headers:
        {
            "x-timestamp": Date.now(),
            "Is-UserloggedIn": false
        }
    }
    res.header("Access-Control-Expose-Headers", "Is-UserloggedIn");    
    if (process.env.NODE_ENV === "production" && req.isAuthenticated())
    {     
        option.headers["Is-UserloggedIn"] = true;
        return res.status(200).sendFile(path.join(__dirname , './client/build/index.html'),option)
    }
    else
    {
        return res.status(200).sendFile(path.join(__dirname , './client/public/index.html'), option)
    }
});

App.listen(port, async function ConnectDB(){
    return await mongoose.connect(process.env.MONGO_URI)
    .then()
    .catch( error => {
        console.log(`Server is running on port ${port}`);
        console.log("error", error);
    })
});
