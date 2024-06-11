/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import {
  addGroup,
  getTeacherModules,
  updateGroupByPatch,
} from "../../apis/groups";
import { useSelector } from "react-redux";
import { specialties } from "../../utils/index";
import Spinner from "../../components/common/Spinner";

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
  const [lectures, setLectures] = useState([]);
  const [errors, setErrors] = useState({});
  const [isAdding, setIsAdding] = useState(false);

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
  console.log(groupeData);
  useEffect(() => {
    if (groupe.initialLecturesNumber) {
      const updatedLectures = Array.from(
        { length: groupe.initialLecturesNumber },
        (_, index) => ({
          date: lectures[index]?.date || "",
          time: lectures[index]?.time || "",
          title: lectures[index]?.title || "",
        })
      );
      setLectures(updatedLectures);
    }
  }, [groupe.initialLecturesNumber]);

  const addToDrive = (event) => {
    const files = event.target.files; // Get all selected files
    Array.from(files).forEach((file) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        var rawLog = reader.result.split(",")[1];
        var dataSend = {
          dataReq: { data: rawLog, name: file.name, type: file.type },
          fname: "uploadFilesToGoogleDrive",
        };
        fetch(
          "https://script.google.com/macros/s/AKfycbyA99FoDRV1U-qe-nJJIfntQbpH_JW2qr9mWVW2RtD-SingL-MBSNh9N-1wohTaUxUN/exec",
          { method: "POST", body: JSON.stringify(dataSend) }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setGroupe((prevGroupe) => ({
              ...prevGroupe,
              image: data.url, // Assuming the response contains the URL in a property called `url`
            }));
          })
          .catch((error) => console.log(error));
      };
    });
  };

  const handleClose = () => {
    setLectures([]);
    setErrors({});
    close();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsAdding(true);

    const validationErrors = {};

    if (!groupeData.idGroupe && lectures.length < 3) {
      validationErrors.lectures = "At least three lectures are required.";
    }

    if (
      !groupeData.idGroupe &&
      groupe.minMustPayLecturesNumber >= groupe.initialLecturesNumber
    ) {
      validationErrors.minMustPayLecturesNumber =
        "Minimum must pay lectures number should be less than the total number of lectures.";
    }

    if (groupe.minMustPayLecturesNumber >= lectures.length) {
      validationErrors.minMustPayLecturesNumber =
        "Minimum must pay lectures number should be less than the total number of lectures.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsAdding(false);
      return;
    }

    if (!groupeData.idGroupe) {
      const addGroupData = {
        ...groupe,
        lectures: lectures.map((lecture) => {
          const combinedDateTime = new Date(`${lecture.date}T${lecture.time}`);
          return {
            ...lecture,
            date: combinedDateTime,
            docs: null,
          };
        }),
      };

      await addGroup({ ...addGroupData, isUser: user.id })
        .then((res) => {
          console.log(res);
          setIsAdding(false);
          handleClose();
        })
        .catch((err) => {
          setIsAdding(false);
        });
    } else {
      const updateGroupeData = { ...groupe };
      await updateGroupByPatch(groupeData.idGroupe, updateGroupeData)
        .then((res) => {
          if (res.status === 200) {
            setIsAdding(false);
            handleClose();
          }
        })
        .catch((err) => {
          setIsAdding(false);
        });
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image" && files.length > 0) {
      addToDrive(event); // Call addToDrive when image input changes
    } else {
      setGroupe({ ...groupe, [name]: value });
    }
  };

  const handleLectureChange = (index, event) => {
    const { name, value } = event.target;
    const newLectures = [...lectures];
    newLectures[index][name] = value;
    setLectures(newLectures);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        close={handleClose}
        title={groupeData.idGroupe ? "Update group" : "Add Group"}
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
                    type="file"
                    accept="image/*"
                    name="image"
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
                {!groupeData.idGroupe && (
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
                )}
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
                {!groupeData.idGroupe && (
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
                )}
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
                {errors.minMustPayLecturesNumber && (
                  <p className="text-red-600">
                    {errors.minMustPayLecturesNumber}
                  </p>
                )}
              </div>
            </div>
            {!groupeData.idGroupe && lectures.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Initial Lectures</h2>
                <div className="max-h-[50vh] overflow-y-auto">
                  {lectures.map((lecture, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 p-4 rounded-md mb-2"
                    >
                      <label className="flex justify-between items-center mb-2">
                        Lecture Title:
                        <input
                          type="text"
                          name="title"
                          value={lecture.title}
                          onChange={(e) => handleLectureChange(index, e)}
                          required
                          className="border border-gray-300 rounded-md p-2 ml-2 flex-1"
                        />
                      </label>
                      <label className="flex justify-between items-center mb-2">
                        Lecture Date:
                        <input
                          type="date"
                          name="date"
                          value={lecture.date}
                          onChange={(e) => handleLectureChange(index, e)}
                          required
                          className="border border-gray-300 rounded-md p-2 ml-2 flex-1"
                        />
                      </label>
                      <label className="flex justify-between items-center mb-2">
                        Lecture Time:
                        <input
                          type="time"
                          name="time"
                          value={lecture.time}
                          onChange={(e) => handleLectureChange(index, e)}
                          required
                          className="border border-gray-300 rounded-md p-2 ml-2 flex-1"
                        />
                      </label>
                    </div>
                  ))}
                </div>
                {errors.lectures && (
                  <p className="text-red-600">{errors.lectures}</p>
                )}
              </div>
            )}
            <div className="flex justify-end gap-x-2 w-full mt-4">
              <button
                type="button"
                onClick={handleClose}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center"
              >
                {isAdding ? <Spinner /> : "Save"}
              </button>
            </div>
          </form>
        }
      />
    </>
  );
}
