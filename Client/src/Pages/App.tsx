import { RouterProvider } from "react-router-dom";
import { router } from "../router";
import { OfficeScreenContextProvider } from "../context/OfficeScreenContext";
import "../css/App.css";

function App() {
  return (
    <>
      <OfficeScreenContextProvider>
        <RouterProvider router={router} />
      </OfficeScreenContextProvider>
    </>
  );
}

export default App;
