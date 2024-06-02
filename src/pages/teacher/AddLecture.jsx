import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import { addLecture } from "../../apis/lectures";
import { useSelector } from "react-redux";
import { getTeacherDocuments } from "../../apis/documents";

// eslint-disable-next-line react/prop-types
export default function AddLecture({ lectureData, idGroupe, close, isOpen }) {
  const user = useSelector((state) => state.authReducer);
  const [lecture, setLecture] = useState({});
  const [documents, setDocuments] = useState([]);
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
    setLecture({
      idTeacher: user.id,
      idGroupe: idGroupe, // Ensure idGroupe is set here
      docs: [],
      ...lectureData,
    });
  }, [lectureData, idGroupe, user.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Combine date and time into a single string
    const combinedDateTime = `${date} ${time}`;

    const updatedLecture = {
      ...lecture,
      date: combinedDateTime,
      idGroupe: +idGroupe, // Ensure idGroupe is included in the payload
    };

    await addLecture(updatedLecture).then((res) => {
      console.log(res);
    });
    close();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "docs") {
      setLecture({ ...lecture, [name]: [value] });
    } else {
      setLecture({ ...lecture, [name]: value });
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
    <>
      <Modal
        isOpen={isOpen}
        close={() => {
          setTime("");
          setDate("");
          setLecture({});
          close();
        }}
        title={"Add Lecture"}
        content={
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex justify-between items-center">
              Title:
              <input
                type="text"
                name="title"
                value={lecture.title || ""}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="flex justify-between items-center">
              Document:
              <select
                value={lecture.docs?.[0] || ""}
                name="docs"
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2"
              >
                <option value={""}>Select doc</option>
                {documents.map((doc) => (
                  <option key={doc.idDocument} value={doc.idDocument}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </label>
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
                onClick={() => {
                  setLecture({});
                  close();
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        }
      />
    </>
  );
}
