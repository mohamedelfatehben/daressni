import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getPostsofParticularGroup,
  filterPostsByContentAndIdGroup,
} from "@/apis/forum";
import PostCard from "../components/PostCard";
import useDebounce from "../hooks/useDebounce"; // Adjust the import path as needed
import { toast } from "sonner"; // Import the toast from sonner

function Forum() {
  const { idGrp } = useParams();
  // const [fetch,setFetch]=useState(true);
  const [postsWithReplies, setPostsWithRepliesArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce delay

  console.log(postsWithReplies);

  const fetchPosts = async (content = "") => {
    const fetchPromise = new Promise(async (resolve, reject) => {
      try {
        const response = content
          ? await filterPostsByContentAndIdGroup(content, idGrp)
          : await getPostsofParticularGroup(idGrp);
        setPostsWithRepliesArray(response.data);
        resolve(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        reject(error);
      }
    });

    toast.promise(fetchPromise, {
      loading: "Loading...",
      success: (data) => {
        return `${data.length} posts loaded successfully`;
      },
      error: "Error fetching posts",
    });

    return fetchPromise;
  };

  useEffect(() => {
    if (idGrp) {
      fetchPosts();
    } else {
      console.error("idGrp is not defined");
    }
  }, [idGrp, fetch]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchPosts(debouncedSearchTerm);
    } else {
      fetchPosts();
    }
  }, [debouncedSearchTerm, idGrp]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 min-w-[70%] py-5">
      <div className="flex items-center bg-gray-900 rounded-full px-4 py-2 w-full max-w-md">
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m1.8-4.8a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
          ></path>
        </svg>
        <input
          type="text"
          placeholder={`Search By content in group ${idGrp}`}
          value={searchTerm}
          onChange={handleSearchChange}
          className="bg-transparent border-none text-gray-400 placeholder-gray-500 focus:outline-none w-full ml-3"
        />
      </div>
      {postsWithReplies.map((post) => (
        <PostCard key={post.post.postId} post={post} />
      ))}
    </div>
  );
}

export default Forum;
