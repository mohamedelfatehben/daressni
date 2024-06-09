import axios from "axios";

export const getStudentsPaymentsInGroup = async (groupeId, userId) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_GATEWAY_URL
      }/payment/api/v1/users/${userId}/groups/${groupeId}/transactions`,
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
export const payLecture = async (body) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GATEWAY_URL}/payment/api/v1/transaction`,
      body,
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
