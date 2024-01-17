"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const promptSubmit = async (e) => {
    e.preventDefault();
    console.log({
      prompt: post.prompt,
      tag: post.tag,
      userId: session?.user.id,
    })
    setSubmitting(true);
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });

      if (res.ok) {
        router.push("/");
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form
        type="Create"
        submitting={submitting}
        post={post}
        setPost={setPost}
        handleSubmit={promptSubmit}
      />
    </>
  );
};

export default CreatePrompt;
