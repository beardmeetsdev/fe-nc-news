import { useState } from "react";
import axios from "axios";

export default function CommentList({ article_id, author, user }) {
  const [commentBody, setCommentBody] = useState("");
  const [posted, setPosted] = useState(false);

  function handleChange(e) {
    setCommentBody(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(commentBody);
    axios
      .post(
        `https://nc-news-hn5t.onrender.com/api/articles/${article_id}/comments`,
        {
          username: author,
          body: commentBody,
        }
      )
      .then(() => {
        setCommentBody("");
        setPosted(true);
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      });
  }

  return (
    <>
      {user ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            type="text"
            name="newcomment"
            onChange={handleChange}
            value={commentBody}
          />
          <button className="bespoke-button" type="submit">
            + add comment
          </button>
          {posted ? (
            <span className="form-popup">Comment posted :)</span>
          ) : null}
        </form>
      ) : null}
    </>
  );
}
