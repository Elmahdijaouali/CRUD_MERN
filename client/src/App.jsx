import { useEffect, useState } from "react";
import "./App.css";
import BtnSearch from "./components/BtnSearch";
import Header from "./components/Header";
import Input from "./components/Input";
import Post from "./components/Post";
import FormEditPost from "./components/FormEditPost";

function App() {
  // state posts
  const [posts, setPost] = useState([]);
  // state origin post solution of after search repeat all posts
  const [originPosts, setOriginPost] = useState(posts);
  // state input search onChange
  const [inputValue, setInputValue] = useState("");
  // state form edit post
  const [showFormEditPost, setShowFormEditPost] = useState(false);
  // state for edit post  data
  const [postEdit, setPostEdit] = useState({
    _id: 0,
    title: "",
    description: "",
  });

  // Fetch posts
  const fetchPosts = async () => {
    await fetch("http://localhost:5000/api/post/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data)
        setPost(data);
        // console.log(data)
        setOriginPost(data);
      })
      .catch((e) => {
        console.log("Error fetching data:", e);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // reverse posts
  const reversePosts = [...posts].reverse();

  // add post
  const addPost = (newPost) => {
    setPost((prevPosts) => [...prevPosts, newPost]);
    setOriginPost((prevPosts) => [...prevPosts, newPost]);
  };

  // delete post
  const deletePost = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/post/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setPost((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } else {
      console.error("Failed to delete post");
    }
  };

  // handle search post
  const handleSearchPost = (e) => {
    e.preventDefault();
  };

  // handle on Change in input search
  const handleInputSearch = (e) => {
    const value = e.target.value.trim();

    setInputValue(value);

    const felteredPost = value
      ? originPosts.filter((post) =>
          post.title.toLowerCase().includes(value.toLowerCase())
        )
      : originPosts;

    setPost(felteredPost);
  };

  // handle button edit post
  const handleBtnEditPost = (id) => {
    setPostEdit(posts.find((post) => post._id === id));

    if (postEdit) {
      setShowFormEditPost(true);
    }
  };
  // handle update data post
  const handleUpdatedPost = () => {
    fetchPosts();
  };
  // close form edit post
  const onClose = () => {
    setShowFormEditPost(false);
  };

  return (
    <div className="app">
      <Header onAdd={addPost} />

      <div className="search">
        <h1>Welcome in My CRUD</h1>
        <form onSubmit={handleSearchPost} action="">
          <Input name="title" onChange={handleInputSearch} value={inputValue} />
          <BtnSearch />
        </form>
      </div>
      <div className="main">
        {reversePosts.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            title={post.title}
            description={post.description}
            handleDeletePost={deletePost}
            onClickBtnEdit={handleBtnEditPost}
          />
        ))}
      </div>

      {showFormEditPost && (
        <FormEditPost
          id={postEdit._id}
          title={postEdit.title}
          description={postEdit.description}
          onUpdatedPost={handleUpdatedPost}
          onClose={onClose}
        />
      )}
    </div>
  );
}

export default App;
