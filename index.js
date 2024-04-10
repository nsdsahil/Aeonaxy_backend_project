import express from "express";

import mongoose from "mongoose";
import { config as dotenvConfig } from "dotenv";

import userController from "./controllers/user.controller.js";
import enrollmentController from "./controllers/enrollment.controller.js";
import courseController from "./controllers/course.controller.js";

dotenvConfig();

const app = express();
app.use(express.json());
app.use("/api/user", userController);
app.use("/api", enrollmentController);
app.use("/api", courseController);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	try {
		mongoose.connect(process.env.MONGO_URL);
		console.log("Database Connected");
	} catch {
		console.log("Database Connection Error");
	}
});
