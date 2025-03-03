import { useContext, useState } from "react";
import "../css/AdminPage.css";
import {
  AddEditStatus,
  AddWebComicPage,
  NotesPage,
  UserRegistration,
} from "./index";
import { MdOutlineLogout } from "react-icons/md";
import { OfficeScreenContext } from "../context/OfficeScreenContext";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState<number>(1);
  const context = useContext(OfficeScreenContext);
  const navigate = useNavigate();

  const logout = () => {
    context.clearTokens();
    navigate("/login");
  };

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
      <MdOutlineLogout size={30} className="logout-button" onClick={logout} />
    </div>
  );
};

export default AdminPage;
