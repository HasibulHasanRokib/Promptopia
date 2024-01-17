"use client";

import Form from "@/components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams=useSearchParams()
  const promptId=searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(()=>{
  const getPrompt = async()=>{
    try {
        const res= await fetch(`/api/prompt/${promptId}`)
        const data = await res.json();
        const{prompt,tag}=data.prompt;
        setPost({
            prompt:prompt,
            tag:tag
        })
    } catch (error) {
        console.log(error.message)
    }
  }
  getPrompt();
  },[promptId])

  const promptSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        router.push("/profile");
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form
        type="Update"
        submitting={submitting}
        post={post}
        setPost={setPost}
        handleSubmit={promptSubmit}
      />
    </>
  );
};

export default UpdatePrompt;
