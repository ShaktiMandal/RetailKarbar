const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path       = require("path");
const LogIn = require('./Router/Authentication/LogInRouter');
const PasswordReset = require('./Router/Authentication/PasswordResetRouter');
const Registration = require('./Router/Authentication/RegisterRouter');
const Product      = require('./Router/Product/ProductRouter');
const Customer     = require('./Router/Customers/CustomerRouter');
const Dealer     = require('./Router/Customers/DealerRoute');
const PageLoad   = require('./Router/Authentication/LoadingRouter');
const session = require('express-session');
const Passport = require('passport');
const passport = require("passport");
const MongoStore = require('connect-mongo')(session);
const Cors = require('cors');
const { SlowBuffer } = require("buffer");
require('dotenv').config();

const App   = express();
const port =  process.env.PORT || 5000;

App.use(bodyParser.urlencoded({extended: false}));
App.use(bodyParser.json());
if (process.env.NODE_ENV === "production") {
    App.use(express.static("client/build"));
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
        maxAge: 120000       
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

    res.header("Access-Control-Expose-Headers", "Is-UserloggedIn");

    console.log("header is present", res.headersSent);
    if (process.env.NODE_ENV === "production" && req.isAuthenticated())
    {     
        res.setHeader("Is-UserloggedIn","true"); 
        res.status(200).json({
            Success: true
        })
    }
    else
    {
        res.setHeader("Is-UserloggedIn","false");
        res.status(200).json({
            Success: true
        })
    }
});

App.listen(port, async function ConnectDB(){
    return await mongoose.connect(process.env.MONGO_URI).then(result =>{
        console.log("Db connection successful");        
    })
    .catch( error=> {
        console.log("error", error);
    })
});
