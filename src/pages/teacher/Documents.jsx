import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { getTeacherDocuments, deleteDocument } from "../../apis/documents";
import AddDocument from "./AddDocument";
import DeleteDocument from "./DeleteDocument";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

function Documents() {
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState([{ name: "name", link: "link" }]);
  const [documentToDelete, setDocumentToDelete] = useState(null); // Track document to delete
  const user = useSelector((state) => state.authReducer);

  useEffect(() => {
    getTeacherDocuments(user.id).then((res) => {
      if (res.status === 200) {
        setDocuments([...res.data]);
      }
    });
  }, [user.id]);

  // Function to handle document deletion
  const handleDeleteDocument = async () => {
    try {
      await deleteDocument(documentToDelete.idDocument);
      setDocuments(
        documents.filter(
          (doc) => doc.idDocument !== documentToDelete.idDocument
        )
      );
      setDocumentToDelete(null);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <Layout>
      <div className="w-full p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Documents</h1>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="bg-purple-500 hover:bg-purple-400 duration-75 text-white h-fit py-2 px-4 rounded"
          >
            Add Document
          </button>
        </div>
        <div className="overflow-auto border-2 border-purple-500 rounded max-h-[60vh]">
          <table className="min-w-full relative">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 bg-purple-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Link
                </th>
                <th className="px-6 py-3 bg-purple-500 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.length === 0 ? (
                <tr>
                  <td
                    className="px-6 py-4 whitespace-no-wrap text-center"
                    colSpan="3"
                  >
                    No documents found.
                  </td>
                </tr>
              ) : (
                documents.map((document, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {document.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <a
                        href={document.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg"
                      >
                        {document.link}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap flex justify-center">
                      <button
                        className="text-red-600 hover:text-red-800 text-lg"
                        onClick={() => {
                          setDocumentToDelete(document);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <AddDocument
          isOpen={open}
          close={() => {
            setOpen(false);
          }}
          update={(doc) => {
            setDocuments([...documents, doc]);
          }}
        />
        <DeleteDocument
          isOpen={!!documentToDelete}
          close={() => setDocumentToDelete(null)}
          document={documentToDelete}
          deleteDoc={handleDeleteDocument}
        />
      </div>
    </Layout>
  );
}

export default Documents;
