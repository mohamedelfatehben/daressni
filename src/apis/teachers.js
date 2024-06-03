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
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || "An error occurred while activating the teacher"
    );
  }
};
