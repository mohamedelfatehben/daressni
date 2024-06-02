import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getTeacherGroups } from "../../apis/groups";
import { useSelector } from "react-redux";
import AddGroupe from "./AddGroupe";

function Groups() {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([]);
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-6">Groups</h1>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="bg-blue-500 hover:bg-blue-400 duration-75 text-white h-fit py-1 px-2 rounded "
          >
            Add group
          </button>
        </div>
        <div className="overflow-auto border-2 border-blue-500 rounded max-h-[60vh]">
          <table className="min-w-full relative">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 bg-blue-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 bg-blue-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 bg-blue-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Lecture Price
                </th>
                <th className="px-6 py-3 bg-blue-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Total Places
                </th>
                <th className="px-6 py-3 bg-blue-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Remaining Places
                </th>
                <th className="px-6 py-3 bg-blue-500 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groups?.map((group, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap">{group.name}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <img
                      src={group.image || "https://placehold.co/600x400"}
                      alt={group.name}
                      className="h-12 w-12"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {group.lecturePrice} DA
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">{group.max}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {+group.max - +group.students.length}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap flex gap-x-2 justify-center">
                    <a
                      href={`/teacher/groups/${group.idGroupe}`}
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
      <AddGroupe
        isOpen={open}
        close={() => {
          setOpen(false);
        }}
      />
    </Layout>
  );
}

export default Groups;
