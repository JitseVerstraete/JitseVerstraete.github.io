import React from "react";
import "./Popup.css";

export default function Popup({ popup }) {
  if (!popup) return null;

  return (
    <div className="popup" role="status" aria-live="polite">
      <div className="popup-inner">
        <div className="popup-text">{popup.text}</div>
        <img className="popup-image" src={popup.image} alt="Popup" />
      </div>
    </div>
  );
}