"use client";

import {useState,useEffect} from "react";
import PromptCard from "./PromptCard";

const PromptCardList=({data,handleTagClick})=>{
  return (
    <div className="mt-16 prompt-layout">
      {data && data.prompts.map((post)=>(
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
const [searchText,setSearchText]=useState("")
const [posts,setPosts] = useState()
const handleChange=(e)=>{

}

useEffect(()=>{
const fetchPost=async()=>{
  const res= await fetch('/api/prompt')
  const data = await res.json();
  setPosts(data)
}
fetchPost()
},[])

  return (
    <>
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
         type="text"
         placeholder="Search for tag or a username..."
         value={searchText}
         onChange={handleChange}
         required
         className="search_input peer"
         />
      </form>
    </section>
    <div className="flex flex-wrap gap-2 justify-center w-full ">
       <PromptCardList
      data={posts}
      handleTagClick={()=>{}}
      />
 
      </div>
    </>
  )
}

export default Feed
