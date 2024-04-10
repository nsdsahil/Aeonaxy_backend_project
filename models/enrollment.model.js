import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
	},
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
