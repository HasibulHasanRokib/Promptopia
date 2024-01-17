import PromptCard from "@/components/PromptCard"

const Profile = ({name,data,handleEdit,handleDelete}) => {
  return (
    <div className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <div className="mt-16 prompt-layout">
      {data?.map((post)=>(
        <PromptCard
        key={post._id}
        post={post}
        handleDelete={()=>handleDelete && handleDelete(post)}
        handleEdit={()=>handleEdit && handleEdit(post)}
        />
      ))}
    </div>
    </div>
  )
}

export default Profile
