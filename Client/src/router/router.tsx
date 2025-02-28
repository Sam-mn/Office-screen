import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

import {
  AddEditStatus,
  AdminPage,
  Forbidden,
  LoginPage,
 } from "../pages";
import { ResourceAuth } from "../components/ResourceAuth";
import { Auth } from "../components/Auth";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/403" element={<Forbidden />} />

      {/* AdminProtected routes */}
     
      <Route path="/admin" element={<ResourceAuth children={<AdminPage />} />}/>
      {/* <Route path="/display" element={<ResourceAuth children={<DisplayScreen />} />} />
      <Route path="/comic" element={<ResourceAuth children={<AddWebComicPage />} />} />
      <Route path="/registration" element={<ResourceAuth children={<UserRegistration />} />} />
      <Route path="/notes" element={<ResourceAuth children={<NotesPage />} />} /> */}

      {/* Login Protected routes */}
      <Route path="/status" element={<Auth children={<AddEditStatus />} />} />
    </>
  )
);
