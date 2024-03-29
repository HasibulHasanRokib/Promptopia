import Link from "next/link"

const Form = ({type,submitting,post,setPost,handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your imagination run wild with any Ai-powered platform.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Ai Prompt
          </span>
          <textarea
          className="form_textarea"
          onChange={(e)=>setPost({...post,prompt:e.target.value})}
          value={post.prompt}
          required
          placeholder="Write your prompt here..."
          >
          </textarea>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
          Tag{" "}
          <span className="font-normal">(#product,#idea,#web,#coding)</span>
          </span>
          <input
          className="form_input"
          onChange={(e)=>setPost({...post,tag:e.target.value})}
          value={post.tag}
          required
          placeholder="#tag..."
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={"/"}>Cancel</Link>
           <button disabled={submitting} type="submit" className="bg-orange-500 text-semibold px-4 py-1 rounded-2xl border text-white shadow-sm disabled:opacity-90">{submitting ? `${type}...`:type}</button>
         </div>
      </form>
    </section>
  )
}

export default Form
