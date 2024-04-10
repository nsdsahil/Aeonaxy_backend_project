import express from "express";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();
import emailConfirmation from "../emails/emailConfirmation.js";


const router = express.Router();
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
	  user: "sahilroyal91@gmail.com",
	  pass: "ybtwdogzakknnuja",
	},
  });

router.post("/register", async (req, res) => {
	const { name, email, profilePicture, password } = req.body;
	const existingUser = await userModel.findOne({ email });
	if (existingUser) return res.status(400).send("User already exists");
	const token = crypto.randomBytes(16).toString("hex");
	const url = `http://localhost:${process.env.PORT}/user/confirm/${token}`;

	const mailOptions = {
		from: "sahilroyal91@gmail.com",
		to: email,
		subject: "Email Confirmation",
		html: emailConfirmation(name, url),
	  }
	  await transporter.sendMail(mailOptions);
	bcrypt.hash(password, 10, async (err, hash) => {
		if (err) {
			return res.status(500).send("Error hashing password");
		}
		const user = new userModel({
			name,
			email,
			confirmationToken: token,
			profilePicture,
			password: hash,
		});
		await user.save();
	});


	res.send("User created successfully");
});
router.get("/confirm/:token", async (req, res) => {
	const { token } = req.params;
	const user = await userModel.findOne({ confirmationToken: token });
	if (!user) return res.status(400).send("Invalid token");
	user.confirmed = true;
	user.confirmationToken = null;
	await user.save();
	res.send("User confirmed successfully");
});
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await userModel.findOne({ email });
	if (!user) return res.status(400).send("User not found");

	bcrypt.compare(password, user.password, (err, result) => {
		if (err) {
			return res.status(500).send("Error comparing passwords");
		}
		if (result) {
			const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
			res.header("auth-token", token);
			res.send("Login successful");
		} else {
			res.status(400).send("Invalid credentials");
		}
	});
});
router.post("/update", authenticate, async (req, res) => {
	const { email, profilePicture } = req.body;
	const user = await userModel.findOne({ email });
	if (!user) return res.status(400).send("User not found");
	user.profilePicture = profilePicture;
	await user.save();
	res.send("Profile picture updated successfully");
});
router.get("/:userId", authenticate, async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await userModel.findById(userId);
		if (!user) return res.status(400).send("User not found");
		res.send(user);
	} catch (err) {
		res.status(400).send("Error finding user");
	}
});

export default router;
