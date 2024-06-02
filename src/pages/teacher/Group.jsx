import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getTeacherGroupLectures } from "../../apis/lectures";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTeacherGroup } from "../../apis/groups";
import AddLecture from "./AddLecture";

function Group() {
  const user = useSelector((state) => state.authReducer);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [groupInfo, setGroupInfo] = useState({
    id: 1,
    title: "Group 1",
    lecturePrice: 50,
    totalPlaces: 20,
  });
  const [isModified, setIsModified] = useState(false);
  const [lecturesList, setLecturesList] = useState([]);

  useEffect(() => {
    getTeacherGroup(user.id, id).then((res) => {
      if (res.status === 200) {
        setGroupInfo({
          ...res.data,
        });
      }
    });
    getTeacherGroupLectures(user.id, id).then((res) => {
      if (res.status === 200) {
        setLecturesList([...res.data]);
      }
    });
  }, [id, user.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupInfo({
      ...groupInfo,
      [name]: name === "lecturePrice" ? parseFloat(value) : value,
    });
    setIsModified(true);
  };

  const handleSave = () => {
    setIsModified(false);
  };

  const handleDeleteStudent = (studentId) => {
    console.log(`Deleting student with ID: ${studentId}`);
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row w-full p-4">
        <div className="w-full md:w-1/2 pr-4">
          <h2 className="text-2xl font-bold mb-4">Group Information</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={groupInfo.title}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lecturePrice"
                className="block text-sm font-medium text-gray-700"
              >
                Lecture Price
              </label>
              <input
                type="number"
                id="lecturePrice"
                name="lecturePrice"
                value={groupInfo.lecturePrice}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="totalPlaces"
                className="block text-sm font-medium text-gray-700"
              >
                Total Places
              </label>
              <input
                type="number"
                id="totalPlaces"
                name="totalPlaces"
                value={groupInfo.max}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <button
              type="button"
              onClick={handleSave}
              disabled={!isModified}
              className="bg-blue-500 hover:bg-blue-400 duration-75 text-white px-4 py-2 rounded mt-2 disabled:cursor-not-allowed disabled:bg-blue-400 mx-auto"
            >
              Save
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 pl-4">
          <h2 className="text-2xl font-bold mb-4">Students</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {groupInfo.students?.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {student.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full p-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Lectures</h2>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="bg-blue-500 hover:bg-blue-400 duration-75 text-white h-fit py-1 px-2 rounded"
          >
            Add lecture
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Conference Video
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {lecturesList.map((lecture) => (
                <tr key={lecture.id}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {lecture.title}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <img
                      src={lecture.image}
                      alt={lecture.title}
                      className="h-12 w-12"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {formatDateTime(lecture.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-center">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                      View Video
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddLecture idGroupe={id} close={() => setOpen(false)} isOpen={open} />
    </Layout>
  );
}

export default Group;
