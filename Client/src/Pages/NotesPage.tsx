import "../css/NotesPage.css";
import { MdEdit, MdDelete } from "react-icons/md";

const NotesPage = () => {
  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Important Notes</h1>
        <button>Add Note</button>
      </div>
      <ul className="notes-list">
        <li>
          <span>note 1</span>
          <div>
            <button className="edit">
              <MdEdit color="#FFC107" size={22} />
            </button>{" "}
            <button className="delete">
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
        </li>
      </ul>
    </div>
  );
};

export default NotesPage;
