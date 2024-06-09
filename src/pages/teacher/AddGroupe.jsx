/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import { addGroup, getTeacherModules } from "../../apis/groups";
import { useSelector } from "react-redux";
import { specialties } from "../../utils/index";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AddGroupe({ groupeData, close, isOpen }) {
  const user = useSelector((state) => state.authReducer);
  const [modules, setModules] = useState([]);
  const [groupe, setGroupe] = useState({});

  useEffect(() => {
    setGroupe({ idUser: user.id, ...groupeData });
  }, [groupeData, user]);

  useEffect(() => {
    getTeacherModules().then((res) => {
      if (res.status === 200) {
        setModules(res.data);
      }
    });
  }, [user.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addGroup(groupe).then((res) => {
      console.log(res);
    });
    close();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGroupe({ ...groupe, [name]: value });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        close={() => {
          setGroupe({});
          close();
        }}
        title={"Add Group"}
        content={
          <form onSubmit={handleSubmit} className="gap-4">
            <div className="flex flex-col md:flex-row">
              <div className="border border-gray-300 p-4 rounded-md w-full md:w-1/2 text-sm">
                <h2 className="text-lg font-semibold mb-4">Group Info</h2>
                <label className="flex justify-between items-center mb-2">
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={groupe.name || ""}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md p-2 ml-2 flex-1"
                  />
                </label>
                <label className="flex justify-between items-center mb-2">
                  Image:
                  <input
                    type="text"
                    name="image"
                    value={groupe.image || ""}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md p-2 ml-2 flex-1"
                  />
                </label>
                <label className="flex justify-between items-center mb-2">
                  Max Students:
                  <input
                    type="number"
                    name="max"
                    value={groupe.max || ""}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md p-2 ml-2 flex-1"
                  />
                </label>
                <label className="flex justify-between items-center mb-2">
                  Specialty:
                  <select
                    name="idModule"
                    value={groupe.idModule || ""}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md p-2 ml-2 flex-1"
                  >
                    <option value="">Select Specialty</option>
                    {modules.map((module) => (
                      <option key={module.idModule} value={module.idModule}>
                        {specialties[module.specialityName]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="border border-gray-300 p-4 rounded-md w-full md:w-1/2 text-sm">
                <h2 className="text-lg font-semibold mb-4">Lecture Info</h2>
                <label className="flex justify-between items-center mb-2">
                  Lecture Price (DA):
                  <input
                    type="number"
                    name="lecturePrice"
                    value={groupe.lecturePrice || ""}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md p-2 ml-2 flex-1"
                  />
                </label>
                <label className="flex justify-between items-center mb-2">
                  Lecture Day:
                  <select
                    name="lectureDay"
                    value={groupe.lectureDay || ""}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md p-2 ml-2 flex-1"
                  >
                    <option value="">Select Day</option>
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex justify-between items-center mb-2">
                  Initial Lectures Number:
                  <input
                    type="number"
                    name="initialLecturesNumber"
                    value={groupe.initialLecturesNumber || ""}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md p-2 ml-2 flex-1"
                  />
                </label>
                <label className="flex justify-between items-center mb-2">
                  Min Must Pay Lectures Number:
                  <input
                    type="number"
                    name="minMustPayLecturesNumber"
                    value={groupe.minMustPayLecturesNumber || ""}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md p-2 ml-2 flex-1"
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-x-2 w-full mt-4">
              <button
                type="button"
                onClick={() => {
                  setGroupe({});
                  close();
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
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
