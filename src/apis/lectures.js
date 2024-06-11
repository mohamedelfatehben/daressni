import axios from "axios";

export const getTeacherGroupLectures = async (idTeacher, idGroup) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_GATEWAY_URL
      }/cours/api/v1/teacher-groupe-lectures/${idGroup}?idTeacher=${idTeacher}`,
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

export const updateLecture = async (lectureId, updatedLecture) => {
  try {
    const response = await axios.patch(
      `${
        import.meta.env.VITE_GATEWAY_URL
      }/cours/api/v1/update-lecture/${lectureId}`,
      updatedLecture,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getStudentLectures = async (userId, page, size, filter) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_GATEWAY_URL}/cours/api/v1/student-get-lectures`,
      {
        params: {
          idStudent: userId,
          page,
          size,
          filter,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching student lectures:", error);
    return { status: 500, data: [] };
  }
};
