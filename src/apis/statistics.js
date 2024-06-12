import axios from "axios";

// Set up the base URL from the environment variables
const API_BASE_URL = `${import.meta.env.VITE_GATEWAY_URL}/stats/api/v1/stat`;

// Add the token from local storage for authorization
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  },
});

// Service to fetch the number of groups for a teacher
export const getNbGroupes = async (idTeacher) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/nbGroupes/${idTeacher}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

// Service to fetch the number of lectures for a teacher
export const getNbtLectures = async (idTeacher) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/nbtLectures/${idTeacher}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

// Service to fetch the number of students for a teacher
export const getNbtStudents = async (idTeacher) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/nbtStudents/${idTeacher}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

// Service to fetch the number of students in a group
export const getGStudents = async (idGroupe) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/nbGStudents/${idGroupe}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

// Service to fetch the total income from a lecture
export const getTotalLectures = async (idLecture) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/totalLecture/${idLecture}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

// Service to fetch the total income from a group
export const getTotalGroupe = async (idGroupe) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/totalGroupe/${idGroupe}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

// Service to fetch the total income for a teacher
export const getTotalTeacher = async (idTeacher) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/totalTeacher/${idTeacher}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

// Service to fetch the top groups for a teacher
export const getTeacherTop = async (idTeacher) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/topTeacher/${idTeacher}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

// Service to fetch the top teachers
export const getTopTeachers = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/sortTeacher`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

// Service to fetch the number of groups and lectures for a teacher
export const getTeacherGroupes = async (idTeacher) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/teacherGroupes/${idTeacher}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

// Service to fetch the number of lectures in a group
export const getNbLectures = async (idGroupe) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/nbLectures/${idGroupe}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

// Service to fetch the number of students in a group
export const getNbStudents = async (idGroupe) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/nbStudents/${idGroupe}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

// Service to fetch the top 3 lectures for a teacher
export const getTop3Lectures = async (idTeacher) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/top3Lectures/${idTeacher}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

// Service to fetch the top 3 groups for a teacher
export const getTop3Groupes = async (idTeacher) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/top3Groupes/${idTeacher}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

// Service to fetch the number of students per lecture for a teacher
export const getStudentsPerLecture = async (idTeacher) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/studentsPerLecture/${idTeacher}`,
      getAuthHeaders()
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};
