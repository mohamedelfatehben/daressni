/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import { getStudentsPaymentsInGroup, payLecture } from "../../apis/payments";
import { useSelector } from "react-redux";
import Spinner from "../../components/common/Spinner";
import { toast } from "react-toastify";

const PaymentsModal = ({ isOpen, close, group, lectures }) => {
  const user = useSelector((state) => state.authReducer);
  const wallet = useSelector((state) => state.walletReducer);
  const [isPaying, setIsPaying] = useState(false);
  const [payments, setPayments] = useState([]);
  const [selectedLectures, setSelectedLectures] = useState([]);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    if (isOpen && group) {
      getStudentsPaymentsInGroup(group.idGroupe, user.userId).then((res) => {
        if (res.status === 200) {
          setPayments(res.data);
        }
      });
    }
  }, [isOpen, group, fetch]);

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

  const handleLectureSelection = (lectureId) => {
    setSelectedLectures((prev) =>
      prev.includes(lectureId)
        ? prev.filter((id) => id !== lectureId)
        : [...prev, lectureId]
    );
  };

  const handlePaySelectedLectures = async () => {
    const totalAmount = selectedLectures.length * group.lecturePrice;

    if (wallet.balance >= totalAmount) {
      setIsPaying(true);
      const body = {
        typeId: 1,
        lectureIds: selectedLectures,
        walletId: wallet.id,
        amount: totalAmount,
        teacherId: group.idTeacher,
        groupId: group.idGroupe,
      };
      console.log(body);
      payLecture({ ...body })
        .then((res) => {
          setIsPaying(false);
          if (res.status === 201) {
            setFetch(!fetch);
            toast.success("Payed successfully!");
          }
          // Optionally update the UI to reflect the payment
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      setIsPaying(false);
      toast.error("Insufficient balance to complete the payment.");
    }
  };

  console.log(selectedLectures);
  return (
    <Modal
      isOpen={isOpen}
      close={close}
      title={`Payments for ${group?.name}`}
      content={
        <div>
          <div className="overflow-x-auto border-2 border-purple-500 rounded max-h-[60vh]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                    Select
                  </th>
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
                {lectures.length > 0 &&
                  lectures.map((lecture, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPaymentStatus(lecture.idLecture) === "Unpaid" && (
                          <input
                            type="checkbox"
                            checked={selectedLectures.includes(
                              lecture.idLecture
                            )}
                            onChange={() =>
                              handleLectureSelection(lecture.idLecture)
                            }
                          />
                        )}
                      </td>
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
              onClick={handlePaySelectedLectures}
              disabled={selectedLectures.length === 0}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-70 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {isPaying ? <Spinner /> : "Pay Selected Lectures"}
            </button>
          </div>
        </div>
      }
    />
  );
};

export default PaymentsModal;
