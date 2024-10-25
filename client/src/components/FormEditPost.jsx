import Button from "./Button";
import "../styles/formPost.css";
import { useState } from "react";

export default function FormEditPost({
  id,
  title,
  description,
  onClose,
  onUpdatedPost,
}) {
  const [valueTitle, setValueTitle] = useState(title);
  const [valueDescription, setValueDescription] = useState(description);

  const handleFormEditPost = async (e) => {
    e.preventDefault();

    // validation data post
    const validationForm = () => {
      const isValidTitle =
        valueTitle.length > 0 && typeof valueTitle === "string";
      const isValidDescriprion =
        valueDescription.length > 0 && typeof valueDescription === "string";

      return isValidTitle && isValidDescriprion;
    };

    if (validationForm()) {
      const response = await fetch(
        `http://localhost:5000/api/post/edit/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: valueTitle,
            description: valueDescription,
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to edit post !!");
      }
      // update data post after update post
      if (onUpdatedPost) {
        onUpdatedPost();
      }

      // close form edit post
      onClose();
    } else {
      onClose();
    }
  };

  //  function handle change input title
  const handleInputTitle = (e) => {
    setValueTitle(e.target.value);
  };
  //  function handle change textarea dsecription
  const handleTextareaValue = (e) => {
    setValueDescription(e.target.value);
  };
  return (
    <div className="formAddPost">
      <form action="" onSubmit={handleFormEditPost}>
        <button className="btnClose" onClick={onClose}>
          close
        </button>
        <h1>Edit Post</h1>
        <input
          type="text"
          name="title"
          value={valueTitle}
          onChange={handleInputTitle}
          placeholder="Enter your title  "
        />
        <textarea
          name="description"
          id=""
          placeholder="Enter your description"
          onChange={handleTextareaValue}
          value={valueDescription}
        ></textarea>

        <Button type="submit" title="Edit Post" />
      </form>
    </div>
  );
}
