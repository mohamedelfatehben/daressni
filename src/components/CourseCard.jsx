/* eslint-disable react/prop-types */

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
          remainingPlaces > 0 && (
            <div className="flex justify-center">
              <button
                className="bg-blue-500 mx-auto text-white px-4 py-2 rounded mt-2"
                onClick={JoinGroup}
              >
                Join
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

export default CourseCard;
