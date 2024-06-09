/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getPendingGroups, updateGroupStatus } from "../../apis/groups";
import Excerpted from "../../components/common/Excerepted";

function AdminGroups() {
  const [pendingGroups, setPendingGroups] = useState([]);

  useEffect(() => {
    getPendingGroups().then((res) => {
      if (res.status === 200) {
        setPendingGroups(res.data);
      }
    });
  }, []);

  const handleStatusChange = (idGroupe, newStatus) => {
    updateGroupStatus(idGroupe, newStatus)
      .then((res) => {
        setPendingGroups((prevPendingGroups) =>
          prevPendingGroups.filter((group) => group.idGroupe !== idGroupe)
        );
      })
      .catch((error) => {
        console.error("Failed to update group status:", error);
      });
  };

  return (
    <Layout>
      <div className="w-full p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Pending Groups
          </h1>
        </div>
        <div className="overflow-auto border border-gray-300 rounded-lg shadow-lg max-h-[60vh]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-nowrap">
                  <Excerpted length={12} text={"Title"} />{" "}
                  {/* Limit the length to 12 characters */}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-nowrap">
                  <Excerpted length={12} text={"Lecture Price"} />{" "}
                  {/* Limit the length to 12 characters */}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-nowrap">
                  <Excerpted length={12} text={"Max Students"} />{" "}
                  {/* Limit the length to 12 characters */}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-nowrap">
                  <Excerpted length={12} text={"Initial Number of lectures"} />{" "}
                  {/* Limit the length to 12 characters */}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-nowrap">
                  Teacher Email
                  {/* Limit the length to 12 characters */}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-nowrap">
                  <Excerpted length={12} text={"Teacher Name"} />{" "}
                  {/* Limit the length to 12 characters */}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-nowrap">
                  Minimum Must Pay Lectures Number
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingGroups.length === 0 ? (
                <tr>
                  <td
                    className="px-6 py-4 whitespace-no-wrap text-center"
                    colSpan="3"
                  >
                    No groups found.
                  </td>
                </tr>
              ) : (
                pendingGroups.map((group, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Excerpted length={12} text={group.name} />{" "}
                      {/* Limit the length to 12 characters */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {group.lecturePrice} DA
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{group.max}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {group.initialLecturesNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {group.teacher?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {group.teacher?.firstName + " " + group.teacher?.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {group.minMustPayLecturesNumber}{" "}
                      {/* Display minMustPayLecturesNumber */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-x-2 justify-center">
                      <button
                        onClick={() =>
                          handleStatusChange(group.idGroupe, "ACTIVE")
                        }
                        className="bg-green-500 text-white px-3 py-2 rounded-md"
                      >
                        Activate
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(group.idGroupe, "INACTIVE")
                        }
                        className="bg-red-500 text-white px-3 py-2 rounded-md"
                      >
                        Refuse
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default AdminGroups;
