import axios from "axios";

export const getTeacherGroups = async (idTeacher) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_GATEWAY_URL
      }/cours/api/v1/teacher-groupes?idTeacher=${idTeacher}`,
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

export const addGroup = async (groupe) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GATEWAY_URL}/cours/api/v1/add-group`,
      groupe,
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

export const getTeacherModules = async (module) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_GATEWAY_URL
      }/cours/api/v1/modules-by-name?name=${module}`,
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

export const getTeacherGroup = async (idTeacher, idGroup) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_GATEWAY_URL
      }/cours/api/v1/teacher-groupe/${idGroup}?idTeacher=${idTeacher}`,
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

export const updateGroup = async (idGroup, payload) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_GATEWAY_URL}/cours/api/v1/groupes/${idGroup}`,
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
