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
export const createPaymentIntent = async (body) => {
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
export const confirmPayment = async (body) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GATEWAY_URL}/payment/api/v1/confirm`,
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

export const getTransactions = async (userId) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_GATEWAY_URL
      }/payment/api/v1/users/${userId}/transactions`,
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
export const getTeacherTransactions = async (userId) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_GATEWAY_URL
      }/payment/api/v1/teachers/${userId}/transactions`,
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

export const getTeachers = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_GATEWAY_URL}/auth/users/teachers-wallet`,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
