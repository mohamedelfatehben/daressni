import axios from "axios";

export const getTeachers = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_GATEWAY_URL}/auth/users/teachers`,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};
