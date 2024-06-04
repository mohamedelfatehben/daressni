import axios from "axios";

export const getTeacherDocuments = async (idTeacher) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_GATEWAY_URL}/cours/api/v1/documents/${idTeacher}`,
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

export const addDocument = async (payload) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GATEWAY_URL}/cours/api/v1/add-document`,
      payload,
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

export const deleteDocument = async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_GATEWAY_URL}/cours/api/v1/documents/${id}`,
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
