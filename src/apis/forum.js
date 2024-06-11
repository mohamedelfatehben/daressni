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

  export const deleteReply = async (replyId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_FORUM_URL}/reply-api/delete`,
        {
          params: { replyId },
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


  export const deletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_FORUM_URL}/posts-api/delete`,
        {
          params: { postId },
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


  export const fecthSinglePost = async (postId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_FORUM_URL}/reply-api/fetch-post-with-replies`,
        {
          params: { postId },
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


  export const updatePost = async (postDtoWithId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_FORUM_URL}/posts-api/update`,
        postDtoWithId
      );
      return response;
    } catch (error) {
      throw error.response?.data;
    }
  };


  export const filterPostsByContentAndIdGroup = async (content,idGroup) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_FORUM_URL}/reply-api/fetch-all-posts-filter-by-content`,
        {
          params: { content,idGroup },
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