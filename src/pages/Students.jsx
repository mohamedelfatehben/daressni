import Layout from "../components/Layout";

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
        <h1 className="text-3xl font-bold mb-6">Students</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Student Group
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
              {students.map((student, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {student.specialty}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {student.studentGroup}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {student.lastPayment}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>{" "}
      </div>
    </Layout>
  );
}

export default Students;
