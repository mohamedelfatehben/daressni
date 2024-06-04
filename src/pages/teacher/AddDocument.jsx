/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "../../components/common/Modal";
import { addDocument } from "../../apis/documents";

function AddDocument({ isOpen, close, update }) {
  const user = useSelector((state) => state.authReducer);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const handleAddDocument = async () => {
    if (!name || !link) {
      setError("All fields are required.");
      return;
    }

    const payload = {
      idTeacher: user.id,
      name,
      link,
    };

    try {
      const response = await addDocument(payload);
      if (response.status === 200) {
        update(response.data);
        close();
        setName("");
        setLink("");
        setError("");
      }
    } catch (error) {
      console.error("Error adding document:", error);
      setError("An error occurred while adding the document.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddDocument();
  };

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      title={"Add Document"}
      content={
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Document Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Document Link
            </label>
            <input
              type="text"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          {error && <div className="mb-4 text-red-600">{error}</div>}
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
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </form>
      }
    />
  );
}

export default AddDocument;
