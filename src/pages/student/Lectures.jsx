import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getStudentLectures } from "../../apis/lectures";
import { useSelector } from "react-redux";
import { BsCash } from "react-icons/bs";
import { FaCheck, FaVideo } from "react-icons/fa6";
import { MdOutlineVideocamOff } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

function StudentLectures() {
  const user = useSelector((state) => state.authReducer);
  const [lectures, setLectures] = useState([]);
  const [page, setPage] = useState(0); // Page index starts from 0
  const [filter, setFilter] = useState("all");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (user.userId) {
      getStudentLectures(user.userId, page, 5, filter).then((res) => {
        if (res.status === 200) {
          setLectures(res.data.content); // Update lectures with the content of the page
          setTotalPages(res.data.totalPages); // Update total pages
        }
      });
    }
  }, [user.userId, page, filter]);

  const handleFilterChange = (value) => {
    setFilter(value);
    setPage(0); // Reset to first page on filter change
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePayment = (lectureId) => {
    // Implement payment logic here
    console.log(`Pay for lecture ${lectureId}`);
  };

  const handleConference = async (idLecture, roomId) => {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
    window.open(
      `http://localhost:7778/conf/?token=${token}&idLecture=${idLecture}&roomId=${roomId}`,
      "_blank"
    );
  };
  return (
    <Layout>
      <div className="w-full p-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Lectures</h1>
        {/* Filter dropdown */}
        <div className="mb-4 flex gap-x-4">
          {["all", "yesterday", "today", "tomorrow", "next-week"].map(
            (filterOption) => (
              <div
                key={filterOption}
                className={`border-purple-600 capitalize border-2 duration-75 cursor-pointer text-purple-600 rounded hover:bg-purple-600 hover:text-white px-2 py-1 ${
                  filter === filterOption && "bg-purple-600 text-white"
                }`}
                onClick={() => handleFilterChange(filterOption)}
              >
                {filterOption.replace("-", " ")}
              </div>
            )
          )}
        </div>
        {/* Lectures table */}
        <div className="overflow-auto border border-gray-300 rounded-lg shadow-lg max-h-[60vh]">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table header */}
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Groupe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {lectures.length === 0 ? (
                <tr>
                  <td
                    className="px-6 py-4 whitespace-no-wrap text-center"
                    colSpan="6"
                  >
                    No lectures found.
                  </td>
                </tr>
              ) : (
                lectures.map((lecture) => (
                  <tr key={lecture.idLecture}>
                    {/* Lecture data */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lecture.groupeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lecture.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lecture.paymentStatus ? (
                        <div className="flex items-center gap-x-1 text-white rounded px-2 justify-center py-1 text-sm bg-green-600">
                          <span>Paid</span>
                          <FaCheck />
                        </div>
                      ) : (
                        <div className="flex gap-x-1 items-center text-white rounded px-2 justify-center py-1 text-sm bg-red-600">
                          <span>Unpaid</span>
                          <IoCloseSharp />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lecture.teacher.firstName +
                        " " +
                        lecture.teacher.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lecture.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lecture.docs.map((doc) => (
                        <div key={doc.idDocument}>
                          <a
                            href={doc.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            {doc.name}
                          </a>
                        </div>
                      ))}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap`}>
                      <div className="flex justify-center items-center">
                        {lecture.paymentStatus ? (
                          lecture.roomId ? (
                            <div
                              onClick={() => {
                                handleConference(
                                  lecture.idLecture,
                                  lecture.roomId
                                );
                              }}
                              className="px-2 py-1 w-fit cursor-pointer bg-green-500 text-white rounded flex gap-x-1 items-center"
                            >
                              <span>Join Conference</span>
                              <FaVideo />
                            </div>
                          ) : (
                            <span className="px-2 w-fit py-1 bg-gray-500 text-white rounded flex gap-x-1 items-center">
                              <span>No Room</span>
                              <MdOutlineVideocamOff />
                            </span>
                          )
                        ) : (
                          <button
                            onClick={() => handlePayment(lecture.idLecture)}
                            className="px-2 py-1 bg-purple-600 text-white rounded flex gap-x-1 items-center hover:bg-purple-700 duration-75"
                          >
                            <span>Pay</span>
                            <BsCash />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="px-4 py-2 mx-2 bg-purple-600 text-white rounded"
            >
              Previous
            </button>
            <span className="px-4 py-2 mx-2">
              {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1}
              className="px-4 py-2 mx-2 bg-purple-600 text-white rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default StudentLectures;
