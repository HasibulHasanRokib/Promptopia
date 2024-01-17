"use client";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState();
  const router = useRouter();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`/api/profile/${session?.user.id}/posts`);
        const data = await res.json();
        console.log(data);
        setPosts(data.prompts);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (session?.user) getPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hashConfirm = confirm("Are you sure to delete this post?");
    if (hashConfirm) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Profile
        name="My"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
