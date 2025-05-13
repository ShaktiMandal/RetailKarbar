import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("Calling Server");
    res.status(200).send({
        Success: true
    });
});

export default router;