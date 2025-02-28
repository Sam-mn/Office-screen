import { useEffect, useState } from "react";
import Popup from "../components/Popup";
import "../css/NotesPage.css";
import { MdEdit, MdDelete } from "react-icons/md";
import {
  addNoteReq,
  deleteImportantNote,
  EditNoteReq,
  getImportantNotesReq,
  getImportantNotReq,
} from "../utils/requests";
import { IImportantNote } from "../utils";

const NotesPage = () => {
  const [importantNotes, setImportantNotes] = useState<IImportantNote[]>([]);
  const [isDeletePopupOpen, setDeleteIsPopupOpen] = useState(false);
  const [newImportantNote, setNewImportantNote] = useState("");
  const [edit, setEdit] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<IImportantNote | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<IImportantNote | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const getImportantNotes = async () => {
    const notesData = await getImportantNotesReq();
    setImportantNotes(notesData);
  };

  const getNoteToEdit = async (id: number) => {
    const response = await getImportantNotReq(id);
    setNewImportantNote(response.note);
    setNoteToEdit(response);
  };

  useEffect(() => {
    getImportantNotes();
  }, []);

  useEffect(() => {
    if (edit && noteToEdit?.id) {
      getNoteToEdit(noteToEdit?.id);
      console.log(noteToEdit);
    }
  }, [edit, noteToEdit?.id]);

  const handleImportantNote = async () => {
    if (newImportantNote.trim() === "") {
      alert("Note cannot be empty");
      return;
    }
    let response;
    if (edit && noteToEdit?.id) {
      response = await EditNoteReq(noteToEdit.id, {
        ...noteToEdit,
        note: newImportantNote,
      });
    } else {
      response = await addNoteReq(newImportantNote);
    }

    console.log(response);

    if (response?.status === 201 || response?.status === 200) {
      setNewImportantNote("");
      setNoteToEdit(null);
      setEdit(false);
      SendToDisplay();
      closePopup();
    }
  };

  const handleDeleteNote = async (id: number) => {
    const response = await deleteImportantNote(id);

    console.log(response);

    if (response?.status === 204 || response?.status === 200) {
      setNoteToDelete(null);

      SendToDisplay();
      setDeleteIsPopupOpen(false);
    }
  };

  const SendToDisplay = async () => {
    const notesData = await getImportantNotesReq();
    setImportantNotes(notesData);
    const socket = new WebSocket("https://localhost:7078/ws/importantNotes");
    socket.onopen = () => {
      socket.send(JSON.stringify(notesData));
      socket.close();
    };
  };

  return (
    <div className="notes-container">
      <Popup isOpen={isPopupOpen}>
        <h2>Add a new note</h2>
        <input
          type="text"
          placeholder="Write a note"
          name="imoportantNote"
          value={newImportantNote}
          onChange={(e) => setNewImportantNote(e.target.value)}
          required
        />
        <div className="popup-buttons">
          <button onClick={handleImportantNote} className="add-button">
            {edit ? "Edit" : "Add"}
          </button>
          <button onClick={closePopup} className="close-button">
            Close
          </button>
        </div>
      </Popup>

      <Popup isOpen={isDeletePopupOpen}>
        <p>Are you sure you want to delete this note?</p>
        <br />
        <div className="popup-buttons">
          <button
            onClick={() =>
              noteToDelete?.id && handleDeleteNote(noteToDelete.id)
            }
            className="close-button"
          >
            Delete
          </button>
          <button
            onClick={() => setDeleteIsPopupOpen(false)}
            className="add-button"
          >
            Close
          </button>
        </div>
      </Popup>

      <div className="notes-header">
        <h1>Important Notes</h1>
        <button
          onClick={() => {
            openPopup();
            setEdit(false);
          }}
        >
          Add Note
        </button>
      </div>
      <ul className="notes-list">
        {importantNotes.map((n) => (
          <li key={n.id}>
            <span>{n.note}</span>
            <div>
              <button
                className="edit"
                onClick={() => {
                  setEdit(true);
                  setNoteToEdit(n);
                  openPopup();
                }}
              >
                <MdEdit color="#FFC107" size={22} />
              </button>{" "}
              <button className="delete">
                <MdDelete
                  color="#E34724"
                  size={22}
                  onClick={() => {
                    setNoteToDelete(n);
                    setDeleteIsPopupOpen(true);
                  }}
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesPage;
