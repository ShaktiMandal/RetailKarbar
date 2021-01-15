const express = require("express");
const router = express.Router();
const cors   = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt    = require("jsonwebtoken");

router.get('/', (req, res, next) => {
        console.log("Calling Server");
        res.status(200).send({
            Success: true
        });
    });

module.exports = router;