import React from "react";
import "../styles/btn.css";
export default function Button({ type, title, onClick }) {
  return (
    <button type={type ? type : "text"} onClick={onClick}>
      {title}
    </button>
  );
}
