import axios from "axios";

export const createPost = async (postDto) => {
    try {
      const response = await axios.post(
        
        `${import.meta.env.VITE_FORUM_URL}/posts-api/create`,
        postDto,
        // {
        //   headers: {
        //     Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        //   },
        // }
      );
      return response;
    } catch (error) {
      throw error.response?.data;
    }
  };