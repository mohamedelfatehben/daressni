import axios from "axios";

export const login = async (user) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GATEWAY_URL}/auth/authenticate`,
      { ...user },
      {}
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};
