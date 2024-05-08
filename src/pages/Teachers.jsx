import Layout from "../components/Layout";

function Teachers() {
  // Dummy data for demonstration
  const teachers = [
    {
      name: "John Doe",
      module: "Mathematics",
      status: "active",
      email: "john@example.com",
      joinDate: "2022-05-01",
    },
    {
      name: "Jane Smith",
      module: "Physics",
      status: "inactive",
      email: "jane@example.com",
      joinDate: "2021-09-15",
    },
    {
      name: "Jane Smith",
      module: "Physics",
      status: "inactive",
      email: "jane@example.com",
      joinDate: "2021-09-15",
    },
    {
      name: "Jane Smith",
      module: "Physics",
      status: "active",
      email: "jane@example.com",
      joinDate: "2021-09-15",
    },
    {
      name: "Jane Smith",
      module: "Physics",
      status: "inactive",
      email: "jane@example.com",
      joinDate: "2021-09-15",
    },
    {
      name: "Jane Smith",
      module: "Physics",
      status: "inactive",
      email: "jane@example.com",
      joinDate: "2021-09-15",
    },
    // Add more teachers as needed
  ];

  return (
    <Layout>
      <div className="w-full p-4">
        <h1 className="text-3xl font-bold mb-6">Teachers</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Module
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers.map((teacher, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {teacher.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {teacher.module}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        teacher.status === "active"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {teacher.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {teacher.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                      Delete
                    </button>
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Display CV
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

export default Teachers;
