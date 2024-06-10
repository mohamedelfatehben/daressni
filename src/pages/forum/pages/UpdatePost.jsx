import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { fecthSinglePost } from "@/apis/forum";


const UpdatePost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null); // State to hold the fetched post

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        console.error("Post ID is not defined");
        return;
      }

      try {
        const response = await fecthSinglePost(id);
        // console.log(response.data); // Handle the response data as needed
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error); // Handle the error as needed
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div className="flex flex-1 flex-col min-w-[70%] p-10">
      <div className="mt-24 px-12">
        <div className="flex justify-start items-center gap-3 w-full">
          <img
            src="/img/create_post.png"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="text-3xl text-left w-full font-semibold">Update Post</h2>
        </div>
        
        <div className="px-8 mt-10">
          {post ? <PostForm post={post} action="Update" /> : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;
