import React from "react";
import "../styles/input.css";

export default function Input({ name, onChange, value }) {
  return (
    <input
      type="text"
      name={name}
      className="inputSearch"
      onChange={onChange}
      value={value}
      placeholder="Enter your title post for search "
    />
  );
}
