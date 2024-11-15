import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.js";
import { validationResult } from "express-validator";
const jwt_secret = process.env.jwt_secret;
import { sendMail } from "../utils/SendMail.js";
import passwordResetTemplate from "../utils/mailTemplate.js";
import { getNameFromEmail } from "../utils/TakignName.js";
import { GeneratingToken, HashedPassword, PasswordMatch, verifyToken, } from "../utils/hashPassword.js";
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const find_user = await User.findOne({ email });
        console.log(find_user);
        if (!find_user) {
            return res.status(401).send("Invalid email or password");
        }
        const passwordMatch = await PasswordMatch(password, find_user.password);
        if (!passwordMatch) {
            return res.status(401).send("Invalid email or password");
        }
        const token = await GeneratingToken(find_user._id, find_user.email, "sachinrockstar", "7 days");
        const name = email.split("@")[0];
        return res.send({ message: "Login successful", name, token });
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
};
export const userSignUp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let find_user = await User.findOne({ email });
        if (find_user) {
            return res
                .status(401)
                .send("Email is already in use. Please try using a different email address.");
        }
        const hashedPassword = await HashedPassword(password, 10);
        await User.create({
            email,
            password: hashedPassword,
        });
        res.send({
            message: `Successfully signed up with email: ${email}`,
        });
    }
    catch (e) {
        return res.status(500).send(e);
    }
};
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.status(401).json("User does not Exist!!");
        }
        const secret = jwt_secret + oldUser.password;
        const forgotToken = GeneratingToken(oldUser._id, oldUser.email, secret, "5m");
        const link = `http://localhost:8080/user/reset-password/${oldUser._id}/${forgotToken}`;
        const name = getNameFromEmail(oldUser.email);
        await sendMail(email, "Password Reset mail", `Hi! ${name} Hope you are doing Well`, passwordResetTemplate(name, link), res);
    }
    catch (e) {
        res.status(500).send({
            message: "Something went wrong",
            err: e,
        });
    }
};
export const resetPasswordVerifyuser = async (req, res) => {
    const { id, forgotToken } = req.params;
    const oldUser = await User.findOne({ _id: id });
    // console.log(oldUser)
    // return
    if (!oldUser) {
        return res.status(401).json("user does not exists!!");
    }
    const secret = jwt_secret + oldUser.password;
    try {
        const verify = await verifyToken(forgotToken, secret);
        res.render("index", { email: verify.email, status: "Not Verified" });
    }
    catch (e) {
        res.status(401).send("User is not verified");
    }
};
export const resetPassword = async (req, res) => {
    const { id, forgotToken } = req.params;
    console.log("forgotToken:", forgotToken);
    const { password } = req.body;
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.status(401).json("user does not exists!!");
    }
    const secret = jwt_secret + oldUser.password;
    try {
        const verify = verifyToken(forgotToken, secret);
        const ecriptedPass = HashedPassword(password, 10);
        await User.updateOne({
            _id: id,
        }, {
            $set: {
                password: ecriptedPass,
            },
        });
        res.render("index", { email: verify.email, status: "verified" });
    }
    catch (e) {
        res.status(401).send("User is not verified");
    }
};
