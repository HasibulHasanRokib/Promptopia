"user client";
import { useSession } from "next-auth/react";
import Image from "next/image"
import { usePathname } from "next/navigation";
import { useState } from "react"

const PromptCard = ({post,handleTagClick,handleEdit,handleDelete}) => {

const [copied,setCopied]=useState();
const {data:session}=useSession();
const pathName=usePathname()

const handleCopy =()=>{
  setCopied(post.prompt);
  navigator.clipboard.writeText(post.prompt);
  setTimeout(()=>setCopied(""),3000)
}

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
       <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
        <Image
        src={post.userId?.avatar}
        alt="user_avatar"
        width={40}
        height={40}
        className="rounded-full object-contain"
        />
        <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold text-gray-900">{post.userId.userName}</h3>
          <h3 className="font-inter text-sm text-gray-500">{post.userId.email}</h3>
        </div>
       </div>
       <div className="copy_btn">
        <Image
        src={copied === post.prompt ? '/assets/icons/tick.svg':"/assets/icons/copy.svg"}
        width={12}
        height={12}
        alt="copy"
        onClick={handleCopy}
        />
       </div>
      </div>    
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p onClick={()=>handleTagClick && handleTagClick(post.tag)} className="font-inter text-sm blue_gradient cursor-pointer">
        {post.tag}
      </p>

      {
        session?.user.id === post.userId._id && pathName==='/profile' && (
          <div className="flex gap-3 justify-center items-center">
            <button type="button" className="font-bold text-blue-600" onClick={handleEdit}>Edit</button>
            <button type="button" className="font-bold text-red-600"onClick={handleDelete}>Delete</button>
          </div>
        )
      }

    </div>
  )
}

export default PromptCard
