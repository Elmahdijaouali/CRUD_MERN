import React from "react";
import "../styles/post.css";
import Button from "./Button";

export default function Post({
  id,
  title,
  description,
  handleDeletePost,
  onClickBtnEdit,
}) {
  return (
    <div className="post">
      <h1>{title}</h1>
      <p>{description}</p>

      <Button title={"Delete"} onClick={() => handleDeletePost(id)} />
      <Button title={"Edit"} onClick={() => onClickBtnEdit(id)} />
    </div>
  );
}
