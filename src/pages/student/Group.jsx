import { useState } from "react";
import Layout from "../../components/Layout";

function StudentGroup() {
  // Dummy data for demonstration
  const [groupInfo, setGroupInfo] = useState({
    id: 1,
    title: "Group 1",
    lecturePrice: 50, // Changed to a number
    totalPlaces: 20,
    remainingPlaces: 10,
    status: "active",
  });

  const [isModified, setIsModified] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupInfo({
      ...groupInfo,
      [name]: name === "lecturePrice" ? parseFloat(value) : value, // Convert lecturePrice to a number
    });
    setIsModified(true);
  };

  const handleSave = () => {
    // Here you can implement the logic to save the updated groupInfo
    // For demonstration, we just reset the isModified state
    setIsModified(false);
  };

  const handleDeleteStudent = (studentId) => {
    // Implement logic to delete a student with the provided studentId
    console.log(`Deleting student with ID: ${studentId}`);
  };

  // Dummy data for students list
  const students = [
    {
      id: 1,
      name: "John Doe",
      lastPayment: "2022-04-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastPayment: "2022-03-15",
    },
    // Add more students as needed
  ];

  return (
    <Layout>
      <div className="flex flex-col md:flex-row w-full p-4">
        {/* Group Information Form */}
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
                type="number" // Changed to number type
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
                value={groupInfo.totalPlaces}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </form>
          {isModified && (
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Save
            </button>
          )}
        </div>

        {/* List of Students */}
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
                    Last Payment
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {student.lastPayment}
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
    </Layout>
  );
}

export default StudentGroup;
