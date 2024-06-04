/* eslint-disable react/prop-types */
import Modal from "../../components/common/Modal";

function DeleteDocument({ isOpen, close, document, deleteDoc }) {
  return (
    <Modal
      isOpen={isOpen}
      close={close}
      title={"Delete Document"}
      content={
        <>
          <h4 className="font-semibold text-xl">
            Are you sure you want to delete : {document?.name}?
          </h4>
          <div className="flex justify-end gap-x-2">
            <button
              type="button"
              onClick={close}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => deleteDoc()}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Delete
            </button>
          </div>
        </>
      }
    />
  );
}

export default DeleteDocument;
