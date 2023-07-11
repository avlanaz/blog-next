import { NextResponse } from 'next/server';
import Post from '@/models/Post';
import User from '@/models/User';
import { connect } from '@/lib/db'

export async function PUT(req, {params}) {
    const {id} = params;

    const body = await req.json()
    try {
        await connect();

        const user = await User.find({
            name: body.username
        }).exec();

        await Post.findByIdAndUpdate(id, {
            $push: {
                comments: {
                    user: user._id,
                    username: body.username,
                    content: body.content,
                },
            }
        })

        return new NextResponse("Post has been created!", { status: 201 })
    } catch (err) {
        console.log(err)
        return new NextResponse("Database Error!", { status: 500 })
    }
}