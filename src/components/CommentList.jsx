import Votes from "./Votes";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CommentList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://nc-news-hn5t.onrender.com/api/articles/${article_id}/comments`
      )
      .then(({ data }) => {
        setComments(data.article);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [article_id]);

  function deleteComment(comment_id) {
    axios
      .delete(`https://nc-news-hn5t.onrender.com/api/comments/${comment_id}`)
      .then(() => {
        const updatedComments = comments.filter(
          (comment) => comment.comment_id !== comment_id
        );
        setComments(updatedComments);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="comments">
        {comments.map((comment) => (
          <div className="comment" key={comment.comment_id}>
            <p className="comment-about">
              {comment.author} - {comment.created_at}
            </p>
            <p>{comment.body}</p>
            <div className="delete">
              <button onClick={() => setConfirmDeleteId(comment.comment_id)}>
                delete comment
              </button>
            </div>
            {confirmDeleteId === comment.comment_id ? (
              <div className="delete-confirm">
                <p>Are you sure?</p>
                <button onClick={() => deleteComment(comment.comment_id)}>
                  yes
                </button>
                <button onClick={() => setConfirmDeleteId(null)}>no</button>
              </div>
            ) : null}
            <p>{comment.vote}</p>
            <Votes
              article_id={comment.article_id}
              currentVotes={comment.votes}
            />
          </div>
        ))}
      </div>
    </>
  );
}
