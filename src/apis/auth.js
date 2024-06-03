import axios from "axios";

// Function to handle user login
export const loginApi = async (user) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GATEWAY_URL}/auth/users/authenticate`,
      { ...user }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error.response?.data || error;
  }
};

// Function to get user profile information
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
    console.error("Fetching profile data failed:", error);
    throw error.response?.data || error;
  }
};

// Function to handle user sign up
export const signUpApi = async (user) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GATEWAY_URL}/auth/users/register-${user.type}`,
      { ...user }
    );
    return response;
  } catch (error) {
    console.error("Sign up failed:", error);
    throw error.response?.data || error;
  }
};

// Function to activate a teacher
export const activateTeacher = async (email) => {
  try {
    const response = await axios.patch(
      `${
        import.meta.env.VITE_GATEWAY_URL
      }/auth/users/activate-teacher/${email}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Activating teacher failed:", error);
    throw error.response?.data || error;
  }
};
