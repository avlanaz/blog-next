import { NextResponse } from 'next/server';
import Post from '@/models/Post';
import { connect } from '@/lib/db'

export async function GET(request) {

    const url = new URL(request.url)

    try {
        await connect();

        const posts = await Post.find();

        return new NextResponse(JSON.stringify(posts), { status: 200 })
    } catch (err) {
        return new NextResponse("Databse Error!", { status: 500 })
    }
}

export async function POST(request) {

    const body = await request.json()

    const newPost = new Post(body)
    try {
        await connect();

        await newPost.save()

        return new NextResponse("Post has been created!", { status: 201 })
    } catch (err) {
        return new NextResponse("Databse Error!", { status: 500 })
    }
}

/* export async function POST() {
    const newPostData = {
        title: "Test",
        content: "Test test test",
        isPublished: false,
        comments: [],
    }

    return NextResponse.json({ data: newPostData })
}

export async function DELETE() {
    const posts = await postsRepo.getPosts();
    console.log("get all posts");
    return NextResponse.json({ posts })
} */