import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { getPostsofParticularGroup } from "@/apis/forum";
import PostCard from "../components/PostCard";

function Forum() {

  const {idGrp}=useParams()

  const [postsWithReplies,setPostsWithRepliesArray]=useState([])
  

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("idGrp:", idGrp); // Log the idGrp value to debug

      if (!idGrp) {
        console.error("idGrp is not defined");
        return;
      }

      try {
        const response = await getPostsofParticularGroup(idGrp);
        console.log(response.data); // Handle the response data as needed
        setPostsWithRepliesArray(response.data)
      } catch (error) {
        console.error("Error fetching posts:", error); // Handle the error as needed
      }
    };

    fetchPosts();
  }, [idGrp])

  return (
    <div className=" flex flex-col justify-center items-center gap-4 min-w-[50%] py-5">
      {postsWithReplies.map(post=>(
        <PostCard key={post.post.postId} post={post}/>
      ))}
    </div>
  );
}

export default Forum;
