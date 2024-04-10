import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
					v
				);
			},
			message: (props) =>
				`${props.value} is not a valid password. It must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.`,
		},
		
	},
	confirmationToken: {
		type: String,
	},
	confirmed: {
		type: Boolean,
		default: false,
	},
	profilePicture: {
		type: String,
	},
});

const User = mongoose.model("User", userSchema);

export default User;
