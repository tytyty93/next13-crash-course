import Link from "next/link";
import AddPost from "../components/AddPost";
import PostList from "../components/PostList";

async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Crud() {
  const posts = await getData();

  return (
    <div className="max-w-4xl mx-auto mt-4">
      <div className="my-5 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Todo List App</h1>
        <AddPost />
        <PostList posts={posts} />
      </div>
    </div>
  );
}
