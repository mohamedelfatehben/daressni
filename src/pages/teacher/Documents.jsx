import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { getTeacherDocuments, deleteDocument } from "../../apis/documents";
import AddDocument from "./AddDocument";
import DeleteDocument from "./DeleteDocument";

function Documents() {
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState([
    {
      idDocument: 1,
      name: "Document 1",
      link: "http://example.com/doc1",
      idTeacher: 1,
    },
    {
      idDocument: 2,
      name: "Document 2",
      link: "http://example.com/doc2",
      idTeacher: 1,
    },
    {
      idDocument: 3,
      name: "Document 3",
      link: "http://example.com/doc3",
      idTeacher: 1,
    },
  ]);
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-6">Documents</h1>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="bg-purple-500 hover:bg-purple-400 duration-75 text-white h-fit py-1 px-2 rounded "
          >
            Add document
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
              {documents?.map((document, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {document.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap hover:underline">
                    <a href={document.link} target="_blank">
                      Display doc
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap flex gap-x-2 justify-center">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                      onClick={() => {
                        setDocumentToDelete(document);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
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
