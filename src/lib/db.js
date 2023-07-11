// import getConfig from "next/config";
import mongoose from 'mongoose';

// const { serverRuntimeConfig } = getConfig();

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (err) {
        throw new Error("Connection Failed!")
    }
}


// mongoose models w/ schema defs

/* 

export const db = {
    User: userModel(),
    Post: postModel(),
};
function postModel() {
    const commentSchema = new Schema ({
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true
        },
        content: {
            type: String,
            required: true
        },
        }, {
            timestamps: true
        }
    )

    const schema = new Schema({
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        isPublished: {
            type: Boolean,
            required: true
        },
        comments: [commentSchema],
        },  {
            // add createdAt and updatedAt timestamps
            timestamps: true
        }
    )
    
    // Virtual for post's URL
    schema.virtual("url").get(function () {
        return `/post/${this._id}`;
    })

    return mongoose.models.Post || mongoose.model('Post', schema);
}



function userModel() {
    const schema = new Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true }
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
} */