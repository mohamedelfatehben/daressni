import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { activateTeacher, getTeachers } from "../../apis/teachers";
import { FaNewspaper, FaUserCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import ActivateTeacher from "../../components/ActivateTeacher";
import { toast } from "react-toastify";

function Teachers() {
  const [teacher, setTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [isActivating, setIsActivating] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await getTeachers();
      if (res.status === 200) {
        setTeachers(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch teachers", error);
    }
  };

  const handleActivateTeacher = async (email) => {
    try {
      setIsActivating(true);
      const response = await activateTeacher(email);
      console.log(response);
      toast.success("Teacher account activated successfully");
      setIsActivating(false);
      setTeacher(null);
      fetchTeachers(); // Refresh the list of teachers
    } catch (error) {
      console.error("Failed to activate teacher", error);
      toast.error(error || "An error occurred while activating the teacher");
    }
  };

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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers.map((teacher, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {teacher.firstName + " " + teacher.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {teacher.moduleName}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        teacher.status
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {teacher.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {teacher.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap flex gap-x-2 justify-center">
                    {!teacher.status && (
                      <>
                        <button
                          className="text-red-600 hover:text-red-900 cursor-pointer text-xl"
                          title="Delete"
                        >
                          <MdDelete />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900 cursor-pointer text-xl"
                          title="Activate"
                          onClick={() => setTeacher(teacher)}
                        >
                          <FaUserCheck />
                        </button>
                      </>
                    )}
                    <a
                      href={teacher.cv}
                      target="_blank"
                      className="text-indigo-600 hover:text-indigo-900 text-xl"
                      title="Display CV"
                    >
                      <FaNewspaper />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ActivateTeacher
          isOpen={teacher !== null}
          close={() => {
            setTeacher(null);
          }}
          teacher={teacher}
          activate={() => handleActivateTeacher(teacher?.email)}
          isActivating={isActivating}
        />
      </div>
    </Layout>
  );
}

export default Teachers;
