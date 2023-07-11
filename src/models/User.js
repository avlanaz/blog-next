import mongoose from "mongoose";
import Post from "./Post";

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: { type: String, unique: true, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
	},
	{
		// add createdAt and updatedAt timestamps
		timestamps: true,
	}
);

export default mongoose.models.User || mongoose.model("User", userSchema);
