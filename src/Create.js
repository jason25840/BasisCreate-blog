import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [authors, setAuthors] = useState(["mario", "yoshi", "luigi"]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleAddAuthor = () => {
    const newAuthor = `Author ${authors.length + 1}`;
    setAuthors([...authors, newAuthor]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsLoading(true);

    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("new blog added");
      setIsLoading(false);
      history.push("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog Author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          {authors.map((author, index) => (
            <option key={index} value={author}>
              {author}
            </option>
          ))}
        </select>
        <div className="buttons">
          {!isLoading && (
            <button
              className="button_add-author"
              type="button"
              onClick={handleAddAuthor}
            >
              Add Author
            </button>
          )}
          {isLoading && <button disabled>Adding Author...</button>}
          {!isLoading && (
            <button className="button_add-blog" type="submit">
              Add Blog
            </button>
          )}
          {isLoading && <button disabled>Adding Blog...</button>}
        </div>
        {/*<p>{title}</p>
        <p>{body}</p>
        <p>{author}</p>*/}
      </form>
    </div>
  );
};

export default Create;
