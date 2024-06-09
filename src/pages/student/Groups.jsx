import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getStudentGroups } from "../../apis/groups";
import { useSelector } from "react-redux";
import PaymentsModal from "./PaymentsModal";

function StudentGroups() {
  const user = useSelector((state) => state.authReducer);
  const [paymentsOpen, setPaymentsOpen] = useState(false); // State to control Payments modal
  const [group, setGroup] = useState(null);
  const [groups, setGroups] = useState([
    {
      id: "1",
      title: "Group 1",
      image: "https://placehold.co/600x400",
      lecturePrice: "50",
      totalPlaces: 20,
      remainingPlaces: 10,
      status: "ACTIVE",
    },
    {
      id: "2",
      title: "Group 2",
      image: "https://placehold.co/600x400",
      lecturePrice: "60",
      totalPlaces: 30,
      remainingPlaces: 5,
      status: "INACTIVE",
    },
  ]);

  useEffect(() => {
    if (user.userId) {
      getStudentGroups(user.userId).then((res) => {
        if (res.status === 200) {
          setGroups([...res.data]);
        }
      });
    }
  }, [user.userId]);

  const handleExitGroup = (groupId) => {
    // Handle the exit group logic here
    console.log(`Exiting group with id: ${groupId}`);
  };

  const handleDisplayLectures = (group) => {
    setPaymentsOpen(true);
    setGroup(group);
    // Handle the display lectures logic here
  };

  return (
    <Layout>
      <div className="w-full p-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Groups</h1>
        <div className="overflow-auto border border-gray-300 rounded-lg shadow-lg max-h-[60vh]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Lecture Price
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groups.length === 0 ? (
                <tr>
                  <td
                    className="px-6 py-4 whitespace-no-wrap text-center"
                    colSpan="4"
                  >
                    No groups found.
                  </td>
                </tr>
              ) : (
                groups.map((group, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {group.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <img
                        src={group.image}
                        alt={group.title}
                        className="h-12 w-12 rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {group.lecturePrice} DA
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap flex gap-x-2 justify-center">
                      <button
                        onClick={() => handleExitGroup(group.id)}
                        className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        title="Exit Group"
                      >
                        Exit Group
                      </button>
                      <button
                        onClick={() => handleDisplayLectures(group)}
                        className="bg-purple-600 text-white py-1 px-3 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        title="Display Lectures"
                      >
                        Display Lectures
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <PaymentsModal
        isOpen={paymentsOpen}
        close={() => {
          setPaymentsOpen(false);
        }}
        lectures={group?.lectures || []}
        group={group}
      />
    </Layout>
  );
}

export default StudentGroups;
