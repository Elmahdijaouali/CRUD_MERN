import Button from "./Button";
import "../styles/formPost.css";

export default function FormPost({ onClose, onAdd }) {
  const handleFormAddPost = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    // validation data post
    const validationForm = () => {
      const isValidTitle = title.length > 0 && typeof title === "string";
      const isValidDescriprion =
        description.length > 0 && typeof description === "string";

      return isValidTitle && isValidDescriprion;
    };

    try {
      if (validationForm()) {
        const res = await fetch("http://localhost:5000/api/post/add", {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({ title, description }),
        });

        if (res.ok) {
          const data = await res.json();
          console.log("Post created:", data);

          // call the function close form add post and update data in array posts
          onAdd(data.post);
          onClose();
        } else {
          console.error("Failed to create post");
        }
      } else {
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="formAddPost">
      <form action="" onSubmit={handleFormAddPost} method="post">
        <button className="btnClose" onClick={onClose}>
          close
        </button>
        <h1>Add New Post</h1>
        <input type="text" name="title" placeholder="Enter your title  " />
        <textarea
          name="description"
          id=""
          placeholder="Enter your description"
        ></textarea>

        <Button type="submit" title="Add New Post" />
      </form>
    </div>
  );
}
