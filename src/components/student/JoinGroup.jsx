/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { signUpToGroup } from "../../apis/groups";
import Excerpted from "../common/Excerepted";
import { toast } from "react-toastify";
import { transaction } from "../../redux/wallet";

function JoinGroup({ ioOpen, close, group, setFetch }) {
  const user = useSelector((state) => state.authReducer);
  const wallet = useSelector((state) => state.walletReducer);
  const dispatch = useDispatch();
  const [selectedLectures, setSelectedLectures] = useState([]);
  const [isJoining, setIsJoining] = useState(false);

  const toggleLectureSelection = (lectureId) => {
    setSelectedLectures((prevSelected) => {
      if (prevSelected.includes(lectureId)) {
        return prevSelected.filter((id) => id !== lectureId);
      } else {
        return [...prevSelected, lectureId];
      }
    });
  };

  const joinGroup = async () => {
    if (selectedLectures.length < group.minMustPayLecturesNumber) {
      toast.error(
        `You need to select at least ${group.minMustPayLecturesNumber} lectures.`
      );
      return;
    }

    setIsJoining(true);
    signUpToGroup({
      idGroupe: group.idGroupe,
      idStudent: user.userId,
      idWallet: wallet.id,
      name: user.name,
      lectures: selectedLectures,
    })
      .then((res) => {
        if (res.status === 200) {
          setIsJoining(false);
          toast.success("Joined the group successfully");
          setFetch((f) => !f);
          dispatch(
            transaction({
              balance:
                wallet.balance - group.lecturePrice * selectedLectures.length,
            })
          );
          setSelectedLectures([]);
          close();
        }
      })
      .catch((err) => {
        toast.error(err);
        setIsJoining(false);
      });
  };

  if (!group) return null;

  const {
    name,
    lecturePrice,
    teacher,
    lectures,
    module,
    minMustPayLecturesNumber,
  } = group;

  return (
    <Modal
      isOpen={ioOpen}
      close={close}
      content={
        <>
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-2xl font-bold mb-4">{name}</h2>
              <p>
                <span className="font-semibold">Module: </span>
                {module.name}
              </p>
              <p className="mb-2">
                Teacher:{" "}
                {teacher ? `${teacher.firstName} ${teacher.lastName}` : "N/A"}
              </p>
              <p className="mb-2">Lecture Price: {lecturePrice} DA</p>
              <p className="mb-4 bg-red-400 text-white rounded p-1">
                You need to pay for at least {minMustPayLecturesNumber}{" "}
                lectures. Total:{" "}
                {(lecturePrice * selectedLectures.length).toFixed(2)} DA
              </p>
            </div>
            <div className="w-1/2 pl-4 max-h-[50vh] overflow-auto">
              <h3 className="text-lg font-semibold mb-2">Lectures</h3>
              {lectures && lectures.length > 0 ? (
                lectures.map((lecture) => (
                  <div
                    key={lecture.idLecture}
                    className="mb-2 p-2 border rounded flex justify-between items-center"
                  >
                    <input
                      type="checkbox"
                      checked={selectedLectures.includes(lecture.idLecture)}
                      onChange={() => toggleLectureSelection(lecture.idLecture)}
                      className="mr-2"
                    />
                    <Excerpted text={lecture.title} length={20} />
                    <p className="font-medium">
                      {new Date(lecture.date).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p>No lectures available.</p>
              )}
            </div>
          </div>
          <div className="flex justify-center space-x-2">
            <div
              onClick={close}
              className="bg-red-600 px-4 py-2 text-white text-nowrap text-sm font-medium rounded-md cursor-pointer"
            >
              Cancel
            </div>
            <div
              className={`relative w-fit flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md cursor-pointer ${
                isJoining && "cursor-not-allowed"
              } text-white bg-purple-600 hover:bg-purple-700`}
              onClick={joinGroup}
            >
              {isJoining ? (
                <div className="text-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                "Join"
              )}
            </div>
          </div>
        </>
      }
      title={"Join group"}
    />
  );
}

export default JoinGroup;
