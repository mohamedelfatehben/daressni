import React from "react"
import PostForm from "../components/PostForm"


const CreatePost = () => {
  return (
    <div className="flex flex-1 flex-col min-w-[70%] p-10">
      <div className="mt-24 px-12">
        <div className="flex justify-start items-center gap-3  w-full">
          <img
            src="/img/create_post.png"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className=" text-3xl text-left w-full font-semibold">Create Post</h2>
        </div>
        
        <div className="px-8 mt-10">
        <PostForm action="Create"/>
        </div>
        
      </div>
      
    </div>
  )
}

export default CreatePost;