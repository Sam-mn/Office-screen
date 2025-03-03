import { useState } from "react";
import "../css/AdminPage.css";
import { AddEditStatus, AddWebComicPage, NotesPage, UserRegistration } from "./index";

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
          Comics
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
          Important notes
        </button>
        <button
          onClick={() => setActiveComponent(4)}
          style={{
            backgroundColor: activeComponent === 4 ? "#323232" : undefined,
            color: activeComponent === 4 ? "#fff" : undefined,
          }}
        >
          User registration
        </button>
      </div>
      <div>
        {activeComponent === 1 && <AddWebComicPage />}
        {activeComponent === 2 && <AddEditStatus />}
        {activeComponent === 3 && <NotesPage />}
        {activeComponent === 4 && <UserRegistration />}
      </div>
    </div>
  );
};

export default AdminPage;
