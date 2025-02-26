import React from "react";
import "../css/Popup.css";

interface PopupProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">{children}</div>
    </div>
  );
};

export default Popup;
