/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import { addGroup, getTeacherModules } from "../../apis/groups";
import { useSelector } from "react-redux";

const specialties = {
  Moy_1: "Middle School Year 1",
  Moy_2: "Middle School Year 2",
  Moy_3: "Middle School Year 3",
  Moy_4: "Middle School Year 4",
  Science_1: "High School Science Year 1",
  Let_1: "High School Literature Year 1",
  Lang_2: "High School Languages Year 2",
  Lang_3: "High School Languages Year 3",
  Philo_2: "High School Philosophy Year 2",
  Philo_3: "High School Philosophy Year 3",
  Math_2: "High School Mathematics Year 2",
  Math_3: "High School Mathematics Year 3",
  MT_2: "High School Technical Mathematics Year 2",
  MT_3: "High School Technical Mathematics Year 3",
  Science_2: "High School Science Year 2",
  Science_3: "High School Science Year 3",
  Gest_2: "High School Management Year 2",
  Gets_3: "High School Management Year 3",
};

export default function AddGroupe({ groupeData, close, isOpen }) {
  const user = useSelector((state) => state.authReducer);
  const [modules, setModules] = useState([]);
  const [groupe, setGroupe] = useState({});

  // This useEffect will set the groupe state whenever groupeData prop changes
  useEffect(() => {
    setGroupe({ idUser: user.id, ...groupeData });
  }, [groupeData, user]);

  useEffect(() => {
    getTeacherModules(window.localStorage.getItem("module")).then((res) => {
      if (res.status === 200) {
        setModules([...res.data]);
      }
    });
  }, []);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    await addGroup(groupe).then((res) => {
      console.log(res);
    });
    close();
  };

  // Function to handle input changes
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
        title={"Add group"}
        // Render the form inside the content of the modal
        content={
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex justify-between items-center">
              Name:
              <input
                type="text"
                name="name"
                value={groupe.name || ""}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="flex justify-between items-center">
              Image:
              <input
                type="text"
                value={groupe.image || ""}
                name="image"
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="flex justify-between items-center">
              Lecture Price (DA):
              <input
                type="number"
                name="lecturePrice"
                value={groupe.lecturePrice || ""}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="flex justify-between items-center">
              Total Places:
              <input
                type="number"
                name="totalPlaces"
                value={groupe.totalPlaces || ""}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="flex justify-between items-center">
              Specialty:
              <select
                name="idModule"
                value={groupe.idModule || ""}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Specialty</option>
                {modules.map((module) => (
                  <option key={module.idModule} value={module.idModule}>
                    {specialties[`${module.specialityName}`]}
                  </option>
                ))}
              </select>
            </label>
            {/* Add more input fields as needed */}
            <div className="flex justify-end gap-x-2">
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
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 "
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
