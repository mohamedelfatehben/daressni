import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getTeacherGroups } from "../../apis/groups";
import { useSelector } from "react-redux";
import AddGroupe from "./AddGroupe";
import { FaInfoCircle } from "react-icons/fa";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";




function Groups() {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([
    {
      idGroupe: 1,
      name: "Group 1",
      image: "https://placehold.co/600x400",
      lecturePrice: 500,
      max: 20,
      students: [1, 2, 3, 4, 5],
    },
    {
      idGroupe: 2,
      name: "Group 2",
      image: "https://placehold.co/600x400",
      lecturePrice: 400,
      max: 15,
      students: [1, 2, 3],
    },
    {
      idGroupe: 3,
      name: "Group 3",
      image: "https://placehold.co/600x400",
      lecturePrice: 600,
      max: 25,
      students: [1, 2, 3, 4, 5, 6, 7],
    },
  ]);
  const user = useSelector((state) => state.authReducer);

  useEffect(() => {
    getTeacherGroups(user.id).then((res) => {
      if (res.status === 200) {
        setGroups([...res.data]);
      }
    });
  }, [user.id]);

  return (
    <Layout>
      <div className="w-full p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Groups</h1>
          <button
            onClick={() => setOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Add Group
          </button>
        </div>
        <div className="overflow-auto border border-gray-300 rounded-lg shadow-lg max-h-[60vh]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Lecture Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Places</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Remaining Places</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groups?.map((group, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{group.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={group.image || "https://placehold.co/600x400"} alt={group.name} className="h-12 w-12 rounded-md" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{group.lecturePrice} DA</td>
                  <td className="px-6 py-4 whitespace-nowrap">{group.max}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{+group.max - +group.students.length}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-x-2 justify-center">
                    <button><a href={`/teacher/groups/${group.idGroupe}`} className="text-purple-600 text-lg hover:text-purple-900 text-lg"><FaInfoCircle />


                    </a></button>
                    <button className="text-blue-600 text-lg hover:text-blue-900 text-lg"><FaEdit />
                    </button>
                    <button className="text-red-600 text-lg hover:text-red-900 text-lg"><MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddGroupe
        isOpen={open}
        close={() => setOpen(false)}
      />
    </Layout>
  );
}

export default Groups;
