/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "../common/Modal";
import { updateLecture } from "../../apis/lectures";
import { getTeacherDocuments } from "../../apis/documents";
import { toast } from "react-toastify";

const UpdateLecture = ({ open, close, lecture, setFetch }) => {
  const user = useSelector((state) => state.authReducer);
  const [lectureInfo, setLectureInfo] = useState({
    title: "",
    date: "",
    docs: [],
  });
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    getTeacherDocuments(user.id).then((res) => {
      if (res.status === 200) {
        setDocuments([...res.data]);
      }
    });
  }, [user.id]);

  useEffect(() => {
    if (lecture) {
      const lectureDate = lecture.date ? new Date(lecture.date) : new Date();
      const [datePart, timePart] = lecture.date
        ? lecture.date.split("T")
        : [lectureDate.toISOString().split("T")[0], "12:00"];

      setLectureInfo({
        title: lecture.title || "",
        date: datePart,
        docs: lecture.documentList?.map((doc) => +doc.idDocument) || [],
      });
      setDate(datePart);
      setTime(timePart.slice(0, 5)); // Extract only HH:MM
    }
  }, [lecture]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLectureInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    if (value && !lectureInfo.docs.includes(value)) {
      setLectureInfo((prevState) => ({
        ...prevState,
        docs: [...prevState.docs, value],
      }));
    }
  };

  const removeDocument = (docId) => {
    setLectureInfo((prevState) => ({
      ...prevState,
      docs: prevState.docs.filter((doc) => doc !== docId),
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);

    const combinedDateTime = `${date}T${time}`;

    try {
      const updatedLecture = {
        ...lectureInfo,
        date: combinedDateTime,
        idTeacher: user.id,
      };
      console.log(updatedLecture);
      const response = await updateLecture(lecture.idLecture, {
        ...updatedLecture,
      });

      if (response.status === 200) {
        toast.success("Lecture updated successfully");
        setTimeout(() => {
          setLectureInfo({
            title: "",
            date: "",
            docs: [],
          });
          setFetch((f) => !f);
          close();
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message || "Error updating lecture");
    } finally {
      setIsLoading(false);
    }
  };

  const getMinTime = () => {
    const now = new Date();
    const hours = now.getHours() + 2;
    now.setHours(hours);
    return now.toISOString().slice(11, 16);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  };

  return (
    <Modal
      title="Edit Lecture"
      close={close}
      isOpen={open}
      content={
        <>
          <form className="flex flex-col gap-4">
            <label className="flex justify-between items-center">
              Title:
              <input
                type="text"
                name="title"
                value={lectureInfo.title}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="flex justify-between items-center">
              Documents:
              <select
                value=""
                name="docs"
                onChange={handleSelectChange}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="">Select doc</option>
                {documents
                  .filter(
                    (doc) =>
                      !lectureInfo.docs.some((d) => d === +doc.idDocument)
                  )
                  .map((doc) => (
                    <option key={doc.idDocument} value={doc.idDocument}>
                      {doc.name}
                    </option>
                  ))}
              </select>
            </label>
            <div className="flex flex-wrap gap-2">
              {lectureInfo.docs.map((docId) => {
                const doc = documents.find((d) => d.idDocument === +docId);
                return (
                  <div key={docId} className="flex items-center space-x-2">
                    <span className="bg-gray-200 p-2 rounded">
                      {doc ? doc.name : "Unknown Document"}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeDocument(docId)}
                      className="text-red-600"
                    >
                      &times;
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center gap-4">
              <label className="flex flex-col">
                Date:
                <input
                  type="date"
                  name="date"
                  min={getTodayDate()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md p-2"
                />
              </label>
              <label className="flex flex-col">
                Time:
                <input
                  type="time"
                  name="time"
                  min={date === getTodayDate() ? getMinTime() : "00:00"}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md p-2"
                />
              </label>
            </div>
            <div className="flex justify-end gap-x-2">
              <button
                type="button"
                onClick={close}
                className="bg-red-600 hover:bg-red-400 duration-75 text-white px-4 py-2 rounded mt-2"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                className={`${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-400"
                } duration-75 text-white px-4 py-2 rounded mt-2 mr-2`}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </>
      }
    />
  );
};

export default UpdateLecture;
