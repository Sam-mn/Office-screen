import { useEffect, useState } from "react";
import Popup from "../components/Popup";
import "../css/NotesPage.css";
import { MdEdit, MdDelete } from "react-icons/md";
import { getImportantNotesReq } from "../utils/requests";
import { useEffect, useState } from "react";
import { IImportantNote } from "../utils";

const NotesPage = () => {
  const [importantNotes, setImportantNotes] = useState<IImportantNote[]>([]);

  const getImportantNotes = async () => {
    const notesData = await getImportantNotesReq();
    setImportantNotes(notesData);
    console.log(notesData);
  };

  useEffect(() => {
    getImportantNotes();
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [importantNoteList, setImportantNoteList] = useState<IImportantNote[]>(
    []
  );
  const [isDeletePopupOpen, setDeleteIsPopupOpen] = useState(false);
  const [newImportantNote, setNewImportantNote] = useState("");
  const [edit, setEdit] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<IImportantNote | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<IImportantNote | null>(null);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const getNoteToEdit = async (id: number) => {
    const response = await getImportantNotReq(id);
    setNewImportantNote(response.note);
    setNoteToEdit(response);
  };

  useEffect(() => {
    if (edit) {
      getNoteToEdit(2);
    }
  }, [edit]);

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
      setImportantNoteList([...importantNoteList, response.data]);
      console.log(importantNoteList);
      SendToDisplay();
      closePopup();
    }
  };

  const handleDeleteNote = async (id: number) => {
    const response = await deleteImportantNote(id);

    console.log(response);

    if (response?.status === 201 || response?.status === 200) {
      closePopup();
    }
  };

  const SendToDisplay = () => {
    const socket = new WebSocket("https://localhost:7078/ws/importantNotes");
    socket.onopen = () => {
      socket.send(JSON.stringify(importantNoteList));
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
              <button className="edit">
                <MdEdit color="#FFC107" size={22} />
              </button>{" "}
              <button className="delete">
                <MdDelete color="#E34724" size={22} />
              </button>
            </div>
          </li>
        ))}
        {/* <li>
          <span>note 1</span>
          <div>
            <button
              className="edit"
              onClick={() => {
                setEdit(true);
                openPopup();
              }}
            >
              <MdEdit color="#FFC107" size={22} />
            </button>{" "}
            <button
              className="delete"
              onClick={() => {
                setNoteToDelete({ id: 1, note: "note 1" });
                setDeleteIsPopupOpen(true);
              }}
            >
              <MdDelete color="#E34724" size={22} />
            </button>
          </div>
        </li>
        <li>
          <span>note 2</span>
          <div>
            <button className="edit">
              <MdEdit color="#FFC107" size={22} />
            </button>{" "}
            <button className="delete">
              <MdDelete color="#E34724" size={22} />
            </button>
          </div>
        </li>{" "}
        <li>
          <span>note 3</span>
          <div>
            <button className="edit">
              <MdEdit color="#FFC107" size={22} />
            </button>{" "}
            <button className="delete">
              <MdDelete color="#E34724" size={22} />
            </button>
          </div>
        </li>{" "}
        <li>
          <span>note 4</span>
          <div>
            <button className="edit">
              <MdEdit color="#FFC107" size={22} />
            </button>{" "}
            <button className="delete">
              <MdDelete color="#E34724" size={22} />
            </button>
          </div>
        </li>{" "}
        <li>
          <span>note 5</span>
          <div>
            <button className="edit">
              <MdEdit color="#FFC107" size={22} />
            </button>{" "}
            <button className="delete">
              <MdDelete color="#E34724" size={22} />
            </button>
          </div>
        </li> */}
      </ul>
    </div>
  );
};

export default NotesPage;
