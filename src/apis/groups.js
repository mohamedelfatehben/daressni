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
export const getStudentGroups = async (idStudent) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_GATEWAY_URL
      }/cours/api/v1/student-groupes?idStudent=${idStudent}`,
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

export const getTeacherModules = async () => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_GATEWAY_URL
      }/cours/api/v1/modules-by-name?name=${window.localStorage.getItem(
        "module"
      )}`,
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

export const getPendingGroups = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_GATEWAY_URL}/cours/api/v1/get-pending-groupes`,
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

export const updateGroupStatus = async (idGroup, status) => {
  try {
    const response = await axios.patch(
      `${
        import.meta.env.VITE_GATEWAY_URL
      }/cours/api/v1/change-groupe-status/${idGroup}`,
      { status },
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

export const searchGroupes = async (query, page = 0, size = 9) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_GATEWAY_URL}/cours/api/v1/search-groupes`,
      {
        params: {
          query,
          page,
          size,
          specialty: window.localStorage.getItem("specialty")
            ? window.localStorage.getItem("specialty")
            : "",
        },
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

export const signUpToGroup = async (body) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GATEWAY_URL}/cours/api/v1/sign-up-to-group`,
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
