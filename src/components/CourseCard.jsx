/* eslint-disable react/prop-types */

import { FaCheck, FaPlus } from "react-icons/fa6";

function CourseCard({
  title,
  module,
  specialty,
  cover,
  teacher,
  remainingPlaces,
  lecturePrice,
  JoinGroup,
  joined,
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <img src={cover} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-sm mb-2">
          {specialty} - {module}
        </p>
        <p className="text-sm mb-2">By: {teacher}</p>
        <p className="text-sm mb-2 text-red-500 font-semibold">
          Remaining Places: {remainingPlaces}
        </p>
        <p className="text-sm font-semibold text-green-500">
          Lecture Price: {lecturePrice} DA
        </p>
        {window.localStorage.getItem("role") === "student" &&
          !joined &&
          remainingPlaces > 0 && (
            <div className="flex justify-center">
              <button
                className="bg-purple-600 hover:opacity-80 mx-auto text-white px-2 py-1 rounded flex gap-x-1 items-center"
                onClick={JoinGroup}
              >
                <span>Join</span>
                <FaPlus />
              </button>
            </div>
          )}
        {joined && (
          <div className="flex justify-center">
            <span className="bg-green-500 text-white px-2 py-1 rounded flex gap-x-1 items-center">
              <span>Member</span>
              <FaCheck />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
