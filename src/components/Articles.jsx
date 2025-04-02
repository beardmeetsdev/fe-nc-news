import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Articles() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let url = "https://nc-news-hn5t.onrender.com/api/articles";
    if (topic !== undefined) {
      url += `?topic=${topic}`;
    }

    axios
      .get(`${url}`)
      .then(({ data }) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [topic]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Oh no! Something went wrong!</span>;

  return (
    <>
      <h1>Showing {topic || "all"} articles</h1>
      <div className="article">
        {articles.map((article) => (
          <Link
            key={article.article_id}
            to={`/articles/${article.article_id}`}
            className="article-container"
          >
            <h2 className="article-title">{article.title}</h2>
            <img
              src={article.article_img_url}
              alt={article.title}
              className="article-img"
            />
            <p className="article-topic">Topic: {article.topic}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
