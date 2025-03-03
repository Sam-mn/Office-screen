import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import {
  AddEditStatus,
  AdminPage,
  DisplayScreen,
  Forbidden,
  LoginPage,
 } from "../pages";
import { ResourceAuth } from "../components/ResourceAuth";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/403" element={<Forbidden />}/>
      <Route path="/" element={<DisplayScreen/>} />

      {/* Protected routes */}
      <Route path="/admin" element={<ResourceAuth children={<AdminPage />} />}/>
      <Route path="/status" element={<ResourceAuth children={<AddEditStatus />} />} />
    </>
  )
);
