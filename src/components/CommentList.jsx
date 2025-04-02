import Votes from "./Votes";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CommentList({ article_id }) {
  const [comments, setComments] = useState([]);

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

  return (
    <>
      <div className="comments">
        {comments.map((comment) => (
          <div className="comment" key={comment.comment_id}>
            <p className="comment-about">
              {comment.author} - {comment.created_at}
            </p>
            <p>{comment.body}</p>
            <p>***Delete logic to follow***</p>
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
