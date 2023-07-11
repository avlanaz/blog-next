import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

async function getData() {
	const res = await fetch("http://localhost:3000/api/posts", {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

const Blog = async () => {
	const data = await getData();

	return (
		<div className="grid grid-cols-3 gap-12">
			{data.map(
				(item) =>
					item.isPublished && (
						<Link
							href={"/blog/" + item._id}
							id={item._id}
							className="flex flex-col items-center gap-2 py-12 rounded-md
              							bg-slate-700/[0.4] transition ease-in-out duration-300 hover:scale-110
              							hover:bg-slate-700/[0.6]"
						>
							<div className="relative w-60 h-60 rounded-md">
								<Image
									src={item.img}
									alt=""
									fill
									className="rounded-md object-cover"
								/>
							</div>
							<h1 className=" font-bold text-2xl">{item.title}</h1>
							<div className="bg-slate-100 p-0 h-0.5 w-2/4 rounded-md"></div>
							<p>{item.desc}</p>
						</Link>
					)
			)}
		</div>
	);
};

export default Blog;
