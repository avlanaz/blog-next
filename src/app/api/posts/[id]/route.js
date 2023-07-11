import { NextResponse } from 'next/server';
import { connect } from '@/lib/db'
import Post from '@/models/Post';

export async function GET(req, {params}) {
    const {id} = params;
    try {
        await connect();

        const post = await Post.findById(id)

        return new NextResponse(JSON.stringify(post), { status: 200 })
    } catch (err) {
        return new NextResponse("Database Error!", { status: 500 })
    }
}

export async function PUT(req, {params}) {
    const {id} = params;
    const body = await req.json()
    
    try {
        await connect();

        await Post.findByIdAndUpdate(id, body)

        return new NextResponse("Post has been updated", { status: 200 })
    } catch (err) {
        console.log(err)
        return new NextResponse("Database Error!", { status: 500 })
    }
}

export async function DELETE(req, {params}) {
    const {id} = params;
    try {
        await connect();

        await Post.findByIdAndDelete(id)

        return new NextResponse("Post has been deleted", { status: 200 })
    } catch (err) {
        return new NextResponse("Database Error!", { status: 500 })
    }
}