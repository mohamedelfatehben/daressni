import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTeacherGroup, updateGroup } from "../../apis/groups";
import AddLecture from "./AddLecture";
import Toast from "../../components/common/Toast";
import PaymentsModal from "./PaymentsModal"; // Import the PaymentsModal component

function Group() {
  const user = useSelector((state) => state.authReducer);
  const [open, setOpen] = useState(false);
  const [paymentsOpen, setPaymentsOpen] = useState(false); // State to control Payments modal
  const [selectedStudent, setSelectedStudent] = useState(null); // State to store selected student
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const { id } = useParams();
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
  }, [id, user.id]);

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
        setToastType("success");
        setToastMessage("Group updated successfully");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
        setGroupInfo(response.data);
        setInitialGroupInfo(response.data);
      }
    } catch (error) {
      setToastType("error");
      setToastMessage(error.response.textStatus);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
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

  return (
    <Layout>
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lecturesList.map((lecture, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {lecture.title}
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
      <Toast type={toastType} message={toastMessage} show={showToast} />
      <AddLecture idGroupe={id} close={() => setOpen(false)} isOpen={open} />
      <PaymentsModal
        isOpen={paymentsOpen}
        close={() => setPaymentsOpen(false)}
        student={selectedStudent}
        groupId={id}
        lectures={lecturesList}
      />
    </Layout>
  );
}

export default Group;
