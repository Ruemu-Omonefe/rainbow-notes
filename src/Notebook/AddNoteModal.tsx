import { useState } from "react";
import { createNote } from "../shared/services/commonService";
import { useDispatch, useSelector } from "react-redux";
import { addNotebook } from "../store/notebookSlice";

interface AddNoteModalProps {
  onClose: () => void;
}

const AddNoteModal = ({ onClose }: AddNoteModalProps) => {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: any) => state.auth.user);
  const userId = user?.id;

  const dispatch = useDispatch();

  const createNewNote = async () => {
    // console.log(user)
    if (!title || !pages || !userId) return;

    setLoading(true);
    const payload = {
      title,
      userId,
      numberOfPages: pages,
      isFavorite: false,
      isShared: false,
      content: []
    };

    try {
      const data = await createNote(payload);
      dispatch(addNotebook(data.data));
      onClose();
    } catch (err) {
      // console.error("Error creating note:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100/90 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-10/12 max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Note</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium">Note Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded outline-0"
            placeholder="Enter note title"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium">Number of Pages</label>
          <input
            type="number"
            value={pages}
            min={1}
            onChange={(e) => setPages(parseInt(e.target.value))}
            className="w-full mt-1 px-3 py-2 border rounded outline-0"
            placeholder="e.g. 5"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="text-gray-500 hover:underline cursor-pointer">Cancel</button>
          <button
            onClick={createNewNote}
            disabled={loading}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 cursor-pointer"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
