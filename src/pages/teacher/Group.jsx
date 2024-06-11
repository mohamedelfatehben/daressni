import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getTeacherGroup,
  updateGroup,
  // deleteLecture,
  // updateLecture,
} from "../../apis/groups"; // Assuming deleteLecture and updateLecture are implemented in the API
import AddLecture from "./AddLecture";
import PaymentsModal from "./PaymentsModal"; // Import the PaymentsModal component
import { ToastContainer, toast } from "react-toastify";
import { FaVideo } from "react-icons/fa6";
import { RiVideoAddFill } from "react-icons/ri";
import UpdateLecture from "../../components/teacher/UpdateLecture";
import { FaEdit } from "react-icons/fa";

function Group() {
  const user = useSelector((state) => state.authReducer);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false); // State to control Payments modal
  const [lecture, setLecture] = useState(null); // State to control Payments modal
  const [paymentsOpen, setPaymentsOpen] = useState(false); // State to control Payments modal
  const [selectedStudent, setSelectedStudent] = useState(null); // State to store selected student
  const { id } = useParams();
  const [fetchGroup, setFetchGroup] = useState(false);
  const [groupInfo, setGroupInfo] = useState({
    id: 1,
    name: "Group 1",
    lecturePrice: 50,
    max: 20,
    students: [],
  });
  const [initialGroupInfo, setInitialGroupInfo] = useState({});
  const [isModified, setIsModified] = useState(false);
  const [lecturesList, setLecturesList] = useState([]);

  useEffect(() => {
    if (user.id) {
      getTeacherGroup(user.id, id).then((res) => {
        if (res.status === 200) {
          setGroupInfo({
            ...res.data,
          });
          setInitialGroupInfo({
            ...res.data,
          });
          setLecturesList([...res.data.lectures]);
        }
      });
    }
  }, [id, user.id, fetchGroup]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "lecturePrice" ? parseFloat(value) : value;
    setGroupInfo((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));

    if (initialGroupInfo[name] !== updatedValue) {
      setIsModified(true);
    } else {
      setIsModified(
        Object.keys(groupInfo).some(
          (key) => groupInfo[key] !== initialGroupInfo[key]
        )
      );
    }
  };

  const handleSave = async () => {
    const payload = {
      idTeacher: user.id,
      name: groupInfo.name,
      lecturePrice: groupInfo.lecturePrice,
      max: groupInfo.max,
    };

    try {
      const response = await updateGroup(id, payload);
      if (response.status === 200) {
        setIsModified(false);
        toast.success("Group updated successfully");
        setGroupInfo(response.data);
        setInitialGroupInfo(response.data);
      }
    } catch (error) {
      toast.error(error.response.textStatus);
    }
  };

  const openPaymentsModal = (student) => {
    setSelectedStudent(student);
    setPaymentsOpen(true);
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  const handleConference = async (idLecture, roomId, lectureDate) => {
    const currentDate = new Date();
    const lectureDateTime = new Date(lectureDate);
    const timeDifference = lectureDateTime - currentDate;

    if (timeDifference > 20 * 60 * 1000) {
      // 20 minutes in milliseconds
      toast.error(
        "Conferences can only be created at least 20 minutes before the lecture time."
      );
      return;
    }

    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
    window.open(
      `http://localhost:7778/conf/?token=${token}&idLecture=${idLecture}${
        roomId !== 0 ? `&roomId=${roomId}` : ""
      }`,
      "_blank"
    );
  };

  const getLectureDelay = (date) => {
    const currentDate = new Date();
    const lectureDateTime = new Date(date);
    const timeDifference = currentDate - lectureDateTime;
    return timeDifference > 60 * 1000;
  };
  const handleUpdateLecture = async (updatedLecture) => {
    setLecture(updatedLecture);
    setUpdateOpen(true);
  };

  return (
    <Layout>
      <ToastContainer theme="colored" />
      <div className="flex flex-col md:flex-row w-full p-6 ">
        <div className="w-full md:w-1/2 pr-4">
          <h2 className="text-2xl font-bold mb-6">Group Information</h2>
          <form>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={groupInfo.name}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-6">
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
            <div className="mb-6">
              <label
                htmlFor="max"
                className="block text-sm font-medium text-gray-700"
              >
                Max
              </label>
              <input
                type="number"
                id="max"
                name="max"
                value={groupInfo.max}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <button
              type="button"
              onClick={handleSave}
              disabled={!isModified}
              className="bg-purple-500 hover:bg-purple-400 duration-75 text-white px-4 py-2 rounded mt-2 disabled:cursor-not-allowed disabled:bg-purple-400"
            >
              Save
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 pl-4">
          <h2 className="text-2xl font-bold mb-6">Students</h2>
          <div className="overflow-x-auto border-2 border-purple-500 rounded max-h-[60vh]">
            <table className="min-w-full relative">
              <thead className="sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groupInfo.students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {student.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <button
                        onClick={() => openPaymentsModal(student)}
                        className="bg-green-500 text-white px-2 py-1 ml-2 rounded"
                      >
                        Show Payments
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-6">Lectures</h2>
          <button
            onClick={() => setOpen(true)}
            className="bg-purple-500 hover:bg-purple-400 duration-75 text-white h-fit py-1 px-2 rounded"
          >
            Add lecture
          </button>
        </div>
        <div className="overflow-x-auto border-2 border-purple-500 rounded max-h-[60vh]">
          <table className="min-w-full relative">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 bg-purple-500 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Conference Video
                </th>
                <th className="px-6 py-3 bg-purple-500 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lecturesList.map((lecture, i) => (
                <tr
                  key={i}
                  className={`${
                    lecture.roomId === 0 &&
                    getLectureDelay(lecture.date) &&
                    "bg-red-200"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {lecture.title}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {formatDateTime(lecture.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-center flex justify-center">
                    <button
                      className={`${
                        lecture.roomId ? "bg-green-600" : "bg-purple-600"
                      } text-white px-2 py-1 rounded flex w-fit gap-x-2 items-center`}
                      onClick={() => {
                        handleConference(
                          lecture.idLecture,
                          lecture.roomId,
                          lecture.date
                        );
                      }}
                    >
                      {lecture.roomId ? (
                        <>
                          <span>Open conference</span>
                          <FaVideo />
                        </>
                      ) : (
                        <>
                          <span>Create conference</span>
                          <RiVideoAddFill />
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-center">
                    {/* <button
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleDeleteLecture(lecture.idLecture)}
                    >
                      Delete
                    </button> */}
                    <button
                      onClick={() => handleUpdateLecture(lecture)}
                      className="text-blue-600 text-lg hover:text-blue-900"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddLecture idGroupe={id} close={() => setOpen(false)} isOpen={open} />
      <PaymentsModal
        isOpen={paymentsOpen}
        close={() => setPaymentsOpen(false)}
        student={selectedStudent}
        groupId={id}
        lectures={lecturesList}
      />
      <UpdateLecture
        open={updateOpen}
        lecture={lecture}
        close={() => {
          setLecture(null);
          setUpdateOpen(false);
        }}
        setFetch={setFetchGroup}
      />
    </Layout>
  );
}

export default Group;
