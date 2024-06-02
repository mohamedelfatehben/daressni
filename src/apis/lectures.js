import axios from "axios";

export const getTeacherGroupLectures = async (idTeacher, idGroup) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_GATEWAY_URL
      }/cours/api/v1//teacher-groupe-lectures/${idGroup}?idTeacher=${idTeacher}`,
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

export const addLecture = async (groupe) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GATEWAY_URL}/cours/api/v1/add-Lecture`,
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
