import Layout from "../../components/Layout";

function StudentGroups() {
  // Dummy data for demonstration
  const groups = [
    {
      id: "1",
      title: "Group 1",
      image: "https://placehold.co/600x400",
      lecturePrice: "50",
      totalPlaces: 20,
      remainingPlaces: 10,
      status: "active",
    },
    {
      id: "2",
      title: "Group 2",
      image: "https://placehold.co/600x400",
      lecturePrice: "60",
      totalPlaces: 30,
      remainingPlaces: 5,
      status: "inactive",
    },
    // Add more groups as needed
  ];

  return (
    <Layout>
      <div className="w-full p-4">
        <h1 className="text-3xl font-bold mb-6">Groups</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Lecture Price
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Total Places
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Remaining Places
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groups.map((group, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {group.title}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <img
                      src={group.image}
                      alt={group.title}
                      className="h-12 w-12"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {group.lecturePrice} DA
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {group.totalPlaces}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {group.remainingPlaces}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        group.status === "active"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {group.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap flex gap-x-2 justify-center">
                    <a
                      href={`/groups/${group.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      More
                    </a>
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </button>
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
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

export default StudentGroups;
