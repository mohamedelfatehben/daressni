/* eslint-disable react/prop-types */
import Modal from "./common/Modal";

function ActivateTeacher({ isOpen, close, teacher, activate }) {
  return (
    <Modal
      close={close}
      isOpen={isOpen}
      title={"Activate a teacher"}
      content={
        <>
          <h1 className="text-xl font-semibold  text-center">
            Are you sure you want to activate the teacher :{" "}
            {teacher?.firstName + " " + teacher?.lastName} ?{" "}
          </h1>
          <div className="flex gap-x-2 my-3">
            <span className="font-semibold">Email</span> : {teacher?.email}
          </div>
          <div className="flex gap-x-2 my-3">
            <span className="font-semibold">Module</span> :{" "}
            {teacher?.moduleName}
          </div>
          <div className="flex justify-end gap-x-2 my-3">
            <div
              onClick={close}
              className="bg-red-600 px-4 py-2 text-white text-nowrap text-sm font-medium rounded-md cursor-pointer"
            >
              Cancel
            </div>
            <a
              href={teacher?.cv}
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white text-nowrap text-sm font-medium rounded-md"
            >
              Display cv
            </a>
            <div
              className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md cursor-pointer text-white bg-purple-600 hover:bg-purple-700  "
              onClick={() => {
                activate();
              }}
            >
              Activate
            </div>
          </div>
        </>
      }
    />
  );
}

export default ActivateTeacher;
