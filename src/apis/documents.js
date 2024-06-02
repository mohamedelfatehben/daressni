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
