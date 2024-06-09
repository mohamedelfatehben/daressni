/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import { getStudentsPaymentsInGroup } from "../../apis/payments";
// import { deleteStudentById } from "../../apis/students"; // Assuming you have an API function to delete a student

const PaymentsModal = ({ isOpen, close, groupId, student, lectures }) => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (isOpen && groupId && student?.idStudent) {
      getStudentsPaymentsInGroup(groupId, student.idStudent).then((res) => {
        if (res.status === 200) {
          setPayments(res.data);
        }
      });
    }
  }, [isOpen, groupId, student]);

  const getPaymentStatus = (lectureId) => {
    for (let payment of payments) {
      if (payment.lectureIds.includes(lectureId)) {
        return "Paid";
      }
    }
    return "Unpaid";
  };

  const getStatusClassName = (status) => {
    return status === "Paid"
      ? "bg-green-500 rounded px-2 py-1 font-semibold text-white"
      : "bg-red-500 rounded px-2 py-1 font-semibold text-white";
  };

  const deleteStudent = async () => {
    const futureLectures = lectures.filter(
      (lecture) => new Date(lecture.date) >= new Date()
    );
    const paidFutureLectures = futureLectures.filter(
      (lecture) => getPaymentStatus(lecture.idLecture) === "Paid"
    );
    console.log(paidFutureLectures);
    if (futureLectures.length > 0 && paidFutureLectures.length > 0) {
      console.log(
        "The student cannot be deleted because they have paid for future lectures."
      );
      return;
    }

    try {
      //   const response = await deleteStudentById(student.idStudent);
      //   if (response.status === 200) {
      //     alert("Student deleted successfully.");
      //     close();
      //   } else {
      //     alert("Failed to delete student.");
      //   }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("An error occurred while trying to delete the student.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      title={`Payments for ${student?.studentName}`}
      content={
        <div>
          <div className="overflow-x-auto border-2 border-purple-500 rounded max-h-[60vh]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lectures.map((lecture, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lecture.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(lecture.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={getStatusClassName(
                          getPaymentStatus(lecture.idLecture)
                        )}
                      >
                        {getPaymentStatus(lecture.idLecture)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={deleteStudent}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Student
            </button>
          </div>
        </div>
      }
    />
  );
};

export default PaymentsModal;
