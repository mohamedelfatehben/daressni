import axios from "axios";

export const createPost = async (postDto) => {
    try {
      const response = await axios.post(
        
        // `${import.meta.env.VITE_GATEWAY_URL}/forum/posts-api/create`,
        `http://localhost:7778/forum/posts-api/create`,
        postDto,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error.response?.data;
    }
  };

  //                  /forum/reply-api/fetch-all-posts-with-their-replies

  export const getPostsofParticularGroup = async (idGroup) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_GATEWAY_URL}/forum/reply-api/fetch-all-posts-of-particular-group`,
        {
          params: { idGroup },
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
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
        
        `${import.meta.env.VITE_GATEWAY_URL}/forum/reply-api/create`,
        ReplyDto,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error.response?.data;
    }
  };

  export const deleteReply = async (replyId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_GATEWAY_URL}/forum/reply-api/delete`,
        {
          params: { replyId },
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
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
        `${import.meta.env.VITE_GATEWAY_URL}/forum/posts-api/delete`,
        {
          params: { postId },
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
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
        `${import.meta.env.VITE_GATEWAY_URL}/forum/reply-api/fetch-post-with-replies`,
        {
          params: { postId },
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error.response?.data;
    }

  };



  export const updatePost = async (postDtoWithId) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_GATEWAY_URL}/forum/posts-api/update`,
        postDtoWithId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error.response?.data;
    }
  };
  


  export const filterPostsByContentAndIdGroup = async (content,idGroup) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_GATEWAY_URL}/forum/reply-api/fetch-all-posts-filter-by-content`,
        {
          params: { content,idGroup },
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error.response?.data;
    }
  };