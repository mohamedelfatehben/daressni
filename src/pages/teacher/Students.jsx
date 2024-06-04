import Layout from "../../components/Layout";
import { FaInfoCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function Students() {
  // Dummy data for demonstration
  const students = [
    {
      name: "John Doe",
      specialty: "Mathematics",
      studentGroup: "Group 1",
      lastPayment: "2022-04-01",
    },
    {
      name: "Jane Smith",
      specialty: "Physics",
      studentGroup: "Group 2",
      lastPayment: "2022-03-15",
    },
    // Add more students as needed
  ];

  return (
    <Layout>
      <div className="w-full p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Students</h1>
          <button
            onClick={() => alert('Add Student clicked')}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Add Student
          </button>
        </div>
        <div className="overflow-auto border border-gray-300 rounded-lg shadow-lg max-h-[60vh]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Specialty</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Student Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Payment</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.specialty}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.studentGroup}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.lastPayment}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-x-2 justify-center">

                    <button><a href={`/students/${index}`} className="text-purple-600 text-lg hover:text-purple-900 text-lg"><FaInfoCircle />


                    </a></button>
                    <button className="text-red-600 text-lg hover:text-red-900 text-lg"><MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Students;
