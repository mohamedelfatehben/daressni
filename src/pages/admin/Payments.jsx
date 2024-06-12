import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { getTeachers } from "@/apis/payments";

const TeachersPayments = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <div className="p-6">
        <div className="overflow-x-auto border-2 border-purple-500 rounded max-h-[60vh]">
          <table className="min-w-full relative">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Amount to Pay
                </th>
                <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <tr key={teacher.walletId}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {teacher.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {teacher.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {teacher.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {teacher.balance}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {(teacher.balance * 0.85).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <button className="bg-green-500 text-white px-2 py-1 rounded">
                      Pay
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
};

export default TeachersPayments;
