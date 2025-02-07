import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import DisplayScreen from "../Pages/DisplayScreen";
import LoginPage from "../Pages/LoginPage";
import AddEditStatus from "../Pages/AddEditStatus";
import NotesPage from "../Pages/NotesPage";
import AdminPage from "../Pages/AdminPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<DisplayScreen />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/addStatus" element={<AddEditStatus />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </>
  )
);
