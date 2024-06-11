/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import { getStudentsPaymentsInGroup } from "../../apis/payments";
import { toast } from "react-toastify";
import { deleteStudentFromGroup } from "../../apis/groups";
import { useSelector } from "react-redux";
import Spinner from "../../components/common/Spinner";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaDollarSign,
  FaMoneyBillAlt,
} from "react-icons/fa"; // Importing icons

const PaymentsModal = ({ isOpen, close, groupId, student, lectures }) => {
  const user = useSelector((state) => state.authReducer);
  const [payments, setPayments] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleClose = () => {
    setIsDeleting(false);
    setPayments([]);
    close();
  };
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

  const getPaymentStatusIcon = (status) => {
    return status === "Paid" ? (
      <FaDollarSign className="" />
    ) : (
      <FaMoneyBillAlt className="" />
    );
  };

  const getStatusClassName = (status) => {
    return status === "Paid"
      ? "bg-green-500 rounded px-2 py-1 font-semibold text-white flex gap-x-1 items-center w-fit"
      : "bg-red-500 rounded px-2 py-1 font-semibold text-white flex gap-x-1 items-center w-fit";
  };

  const getLectureStatus = (lecture) => {
    const now = new Date();
    const lectureDate = new Date(lecture.date);

    if (lecture.roomId !== 0 && lectureDate <= now) {
      return "done";
    } else if (
      lecture.roomId === 0 &&
      now > new Date(lectureDate.getTime() + 2 * 60 * 60 * 1000)
    ) {
      return "undone";
    } else {
      return "pending";
    }
  };

  const getLectureStatusClassName = (status) => {
    switch (status) {
      case "done":
        return "bg-green-500 rounded px-2 py-1 font-semibold text-white flex gap-x-1 items-center w-fit";
      case "undone":
        return "bg-red-500 rounded px-2 py-1 font-semibold text-white flex gap-x-1 items-center w-fit";
      case "pending":
        return "bg-orange-500 rounded px-2 py-1 font-semibold text-white flex gap-x-1 items-center w-fit";
      default:
        return "";
    }
  };
  const getLectureStatusIcon = (status) => {
    switch (status) {
      case "done":
        return <FaCheckCircle className="" />;
      case "undone":
        return <FaTimesCircle className="" />;
      case "pending":
        return <FaHourglassHalf className="" />;
      default:
        return null;
    }
  };

  const deleteStudent = async () => {
    setIsDeleting(true);
    const futureLectures = lectures.filter(
      (lecture) => new Date(lecture.date) >= new Date()
    );
    const paidFutureLectures = futureLectures.filter(
      (lecture) => getPaymentStatus(lecture.idLecture) === "Paid"
    );
    if (futureLectures.length > 0 && paidFutureLectures.length > 0) {
      toast.error(
        "The student cannot be deleted because they have paid for future lectures."
      );
      setIsDeleting(false);
      return;
    }

    try {
      const response = await deleteStudentFromGroup(
        groupId,
        user.id,
        student.idStudent
      );
      if (response.status === 200) {
        toast.success("Student deleted successfully.");
        setTimeout(() => {
          handleClose();
        }, 1000);
      } else {
        toast.error("Failed to delete student.");
      }
      setIsDeleting(false);
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("An error occurred while trying to delete the student.");
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      close={handleClose}
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
                    Payment Status
                  </th>
                  <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                    Lecture Status
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
                        <span>{getPaymentStatus(lecture.idLecture)}</span>
                        {getPaymentStatusIcon(
                          getPaymentStatus(lecture.idLecture)
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={getLectureStatusClassName(
                          getLectureStatus(lecture)
                        )}
                      >
                        <span>{getLectureStatus(lecture)}</span>
                        {getLectureStatusIcon(getLectureStatus(lecture))}
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
              disabled={isDeleting}
            >
              {isDeleting ? <Spinner /> : "Delete Student"}
            </button>
          </div>
        </div>
      }
    />
  );
};

export default PaymentsModal;
