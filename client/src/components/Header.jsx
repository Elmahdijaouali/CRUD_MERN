import React, { useState } from "react";
import "../styles/header.css";
import Button from "./Button";
import FormPost from "./FormPost";

export default function Header({ onAdd }) {
  const [showFormAddPost, setShowFormAddPost] = useState(false);

  const handleBtnAddPost = () => {
    setShowFormAddPost((prevState) => !prevState);
  };
  const onClose = () => {
    setShowFormAddPost(false);
  };

  return (
    <div className="header">
      <h1>CRUD MERN</h1>
      <Button title={"Add New Post"} onClick={handleBtnAddPost} />

      {showFormAddPost && <FormPost onClose={onClose} onAdd={onAdd} />}
    </div>
  );
}
