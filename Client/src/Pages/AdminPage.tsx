import { useState } from "react";
import "../css/AdminPage.css";
import AddEditStatus from "./AddEditStatus";
import NotesPage from "./NotesPage";
import AddWebComicPage from "./AddWebComicPage";

const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState<number>(1);

  return (
    <div className="admin-container">
      <div className="button-group">
        <button
          onClick={() => setActiveComponent(1)}
          style={{
            backgroundColor: activeComponent === 1 ? "#323232" : undefined,
            color: activeComponent === 1 ? "#fff" : undefined,
          }}
        >
          Web comic
        </button>
        <button
          onClick={() => setActiveComponent(2)}
          style={{
            backgroundColor: activeComponent === 2 ? "#323232" : undefined,
            color: activeComponent === 2 ? "#fff" : undefined,
          }}
        >
          Status
        </button>
        <button
          onClick={() => setActiveComponent(3)}
          style={{
            backgroundColor: activeComponent === 3 ? "#323232" : undefined,
            color: activeComponent === 3 ? "#fff" : undefined,
          }}
        >
          Important note
        </button>
      </div>
      <div>
        {activeComponent === 1 && <AddWebComicPage />}
        {activeComponent === 2 && <AddEditStatus />}
        {activeComponent === 3 && <NotesPage />}
      </div>
    </div>
  );
};

export default AdminPage;
