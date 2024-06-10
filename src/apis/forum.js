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

  export const getPostsofParticularGroup = async (idGroup) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_FORUM_URL}/reply-api/fetch-all-posts-of-particular-group`,
        {
          params: { idGroup },
          // headers: {
          //   Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          // },
        }
      );
      return response;
    } catch (error) {
      throw error.response?.data;
    }
  };


  export const createReply = async (ReplyDto) => {
    try {
      const response = await axios.post(
        
        `${import.meta.env.VITE_FORUM_URL}/reply-api/create`,
        ReplyDto,
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