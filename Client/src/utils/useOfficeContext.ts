import { useContext } from "react";
import { OfficeScreenContext } from "../context/OfficeScreenContext";

export function useOfficeContext() {
  return useContext(OfficeScreenContext);
}
