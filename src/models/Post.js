import mongoose from "mongoose";
const Schema = mongoose.Schema;


const commentSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		isPublished: {
			type: Boolean,
			required: true,
		},
		comments: [commentSchema],
	},
	{ timestamps: true }
);

// Virtual for post's URL
postSchema.virtual("url").get(function () {
	return `/post/${this._id}`;
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
