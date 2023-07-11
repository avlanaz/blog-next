"use client";

import React from "react";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import moment from "moment";

const Post = ({ params }) => {
	const session = useSession();

	const fetcher = (...args) => fetch(...args).then((res) => res.json());

	const { data, mutate, error, isLoading } = useSWR(
		`/api/posts/${params.id}`,
		fetcher
	);

	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		const content = e.target[0].value;

		try {
			await fetch(`/api/posts/${params.id}/comments`, {
				method: "PUT",
				body: JSON.stringify({
					username: session.data.user.name,
					content,
				}),
			});
			mutate();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			{isLoading ? (
				"Loading"
			) : (
				<div className="flex flex-col gap-12 items-center">
					<div className="flex flex-col gap-2 items-center">
						<h1 className="text-4xl font-bold">{data.title}</h1>
						<div className="#LINE bg-slate-100 p-0 h-0.5 w-2/4 rounded-md"></div>
						<p className="">{data.desc}</p>
						<Image
							src={data.img}
							alt=""
							width="500"
							height="500"
							className="rounded-md"
						/>
					</div>
					<p>{data.content}</p>
					<div className="#LINE bg-slate-100/[0.1] p-0 h-0.5 w-full rounded-md"></div>
					<h1>Comments ({data.comments.length})</h1>

					{session.status === "authenticated" && (
						<form
							className="COMMENTS-FORM flex flex-col gap-4 w-2/4 items-center"
							onSubmit={handleCommentSubmit}
						>
							<textarea
								placeholder="Add comment..."
								className="p-2 bg-transparent border-2 w-full"
								cols="20"
								rows="4"
							></textarea>
							<button
								type="submit"
								className="bg-slate-50 w-1/4 text-slate-950 rounded-md"
							>
								Add Comment
							</button>
						</form>
					)}

					{session.status === "unauthenticated" && (
						<h1>You need to be signed in to add comments</h1>
					)}

					<div className="#COMMENTS static gap-12 flex flex-col w-2/4">
						{data.comments.map((comment) => (
							<div className="#COMMENT flex flex-col border-2 border-slate-50/[0.2] rounded-md">
								<div className="flex justify-between">
									<h1 className="#USERNAME p-2 font-bold italic">
										{comment.username}
									</h1>
									<p className="#DATE p-2 text-slate-50/[0.5]">
										at {moment(comment.createdAt).format("LL")}
									</p>
								</div>
								<p className="#CONTENT p-2">{comment.content}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Post;
