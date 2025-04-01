import Votes from "./Votes";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ArticleCard() {
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
    <div className="article">
      <div className="article-container" key={article.article_id}>
        <h2>{article.title}</h2>
        <h4>Topic: {article.topic}</h4>
        <h4>Author: {article.author}</h4>
        <h4>Created: {article.created_at}</h4>
        <p>{article.body}</p>
        <img src={article.article_img_url} alt={article.title} />
        <div>Comment Count: {article.comment_count}</div>
        <Votes article_id={article.article_id} currentVotes={article.votes} />
      </div>
    </div>
  );
}
