import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import {
  getNbGroupes,
  getNbtLectures,
  getNbtStudents,
  getTeacherGroupes,
  getTop3Lectures,
  getTop3Groupes,
  getTotalTeacher,
  getStudentsPerLecture,
} from "../../apis/statistics";
import {
  FaChalkboardTeacher,
  FaBook,
  FaUserGraduate,
  FaDollarSign,
} from "react-icons/fa";

function Statistics() {
  const user = useSelector((state) => state.authReducer);
  const [nbGroupes, setNbGroupes] = useState(0);
  const [nbLectures, setNbLectures] = useState(0);
  const [nbStudents, setNbStudents] = useState(0);
  const [teacherGroupes, setTeacherGroupes] = useState([]);
  const [top3Lectures, setTop3Lectures] = useState([]);
  const [top3Groupes, setTop3Groupes] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [studentsPerLecture, setStudentsPerLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nbGroupesResponse = await getNbGroupes(user.id);
        const nbLecturesResponse = await getNbtLectures(user.id);
        const nbStudentsResponse = await getNbtStudents(user.id);
        const teacherGroupesResponse = await getTeacherGroupes(user.id);
        const top3LecturesResponse = await getTop3Lectures(user.id);
        const top3GroupesResponse = await getTop3Groupes(user.id);
        const totalIncomeResponse = await getTotalTeacher(user.id);
        const studentsPerLectureResponse = await getStudentsPerLecture(user.id);

        setNbGroupes(nbGroupesResponse.data);
        setNbLectures(nbLecturesResponse.data);
        setNbStudents(nbStudentsResponse.data);
        setTeacherGroupes(teacherGroupesResponse.data);
        setTop3Lectures(top3LecturesResponse.data);
        setTop3Groupes(top3GroupesResponse.data);
        setTotalIncome(totalIncomeResponse.data);
        setStudentsPerLecture(studentsPerLectureResponse.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (user.id) {
      fetchData();
    }
  }, [user.id]);

  if (loading) {
    return <Layout>Loading...</Layout>;
  }

  if (error) {
    return <Layout>Error: {error.message}</Layout>;
  }

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-4">Statistics</h1>
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-500 p-6 rounded-lg shadow-md flex items-center text-white">
              <FaChalkboardTeacher className="mr-4 text-4xl" />
              <div>
                <p className="text-lg font-semibold">Number of Groups</p>
                <p className="text-2xl">{nbGroupes}</p>
              </div>
            </div>
            <div className="bg-green-500 p-6 rounded-lg shadow-md flex items-center text-white">
              <FaBook className="mr-4 text-4xl" />
              <div>
                <p className="text-lg font-semibold">Number of Lectures</p>
                <p className="text-2xl">{nbLectures}</p>
              </div>
            </div>
            <div className="bg-red-500 p-6 rounded-lg shadow-md flex items-center text-white">
              <FaUserGraduate className="mr-4 text-4xl" />
              <div>
                <p className="text-lg font-semibold">Number of Students</p>
                <p className="text-2xl">{nbStudents}</p>
              </div>
            </div>
            <div className="bg-yellow-500 p-6 rounded-lg shadow-md flex items-center text-white">
              <FaDollarSign className="mr-4 text-4xl" />
              <div>
                <p className="text-lg font-semibold">Total Income</p>
                <p className="text-2xl">{totalIncome.toFixed(2)} Da</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-x-2 mt-6">
            <div className="w-full">
              <h2 className="text-2xl font-semibold mb-4">
                Groups and Lectures
              </h2>
              <div className="overflow-x-auto border-2 border-gray-200 rounded-md max-h-[60vh]">
                <table className="min-w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white bg-purple-600 uppercase tracking-wider">
                        Group Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white bg-purple-600 uppercase tracking-wider">
                        Number of Lectures
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teacherGroupes.map((group, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {group.name}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {group.nbLectures}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold mb-4">
                Students per Lecture
              </h2>
              <div className="overflow-x-auto border-2 border-gray-200 rounded-md">
                <table className="min-w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white bg-purple-600 uppercase tracking-wider">
                        Lecture Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white bg-purple-600 uppercase tracking-wider">
                        Number of Students
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentsPerLecture.map((lecture, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {lecture.lectureName}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {lecture.studentCount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-x-2 mt-6">
            <div className="w-full">
              <h2 className="text-2xl font-semibold mb-4">
                Top 3 Lectures by Amount
              </h2>
              <div className="overflow-x-auto border-2 border-gray-200 rounded-md">
                <table className="min-w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white bg-purple-600 uppercase tracking-wider">
                        Lecture Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white bg-purple-600 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {top3Lectures.map((lecture, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {lecture.name}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {lecture.lecturePrice * lecture.payments.length}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-2xl font-semibold mb-4">
                Top 3 Groups by Amount
              </h2>
              <div className="overflow-x-auto border-2 border-gray-200 rounded-md">
                <table className="min-w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white bg-purple-600 uppercase tracking-wider">
                        Group Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white bg-purple-600 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {top3Groupes.map((group, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {group.title}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {group.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Statistics;
