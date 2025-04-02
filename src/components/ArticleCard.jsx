import Votes from "./Votes";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ArticleList() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let url = `https://nc-news-hn5t.onrender.com/api/articles/${article_id}`;
    axios
      .get(url)
      .then(({ data }) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [article_id]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Oh no! Something went wrong!</span>;

  return (
    <div className="article-container" key={article.article_id}>
      <h2>{article.title}</h2>
      <h4>Topic: {article.topic}</h4>
      <h4>Author: {article.author}</h4>
      <h4>Created: {article.created_at}</h4>
      <p>{article.body}</p>
      <img src={article.article_img_url} alt={article.title} />
      <div className="comment-format">{article.comment_count} Comments</div>
      <Votes article_id={article.article_id} currentVotes={article.votes} />
      <AddComment article_id={article.article_id} author={article.author} />
      <CommentList article_id={article.article_id} />
    </div>
  );
}
