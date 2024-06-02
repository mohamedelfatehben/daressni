import axios from "axios";

export const loginApi = async (user) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GATEWAY_URL}/auth/users/authenticate`,
      { ...user },
      {}
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};
export const getInfoData = async (type, email) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_GATEWAY_URL}/auth/users/profile-${type}/${email}`,
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
export const signUpApi = async (user) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GATEWAY_URL}/auth/users/register-${user.type}`,
      { ...user }
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};
