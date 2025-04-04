import { useParams, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default function Articles() {
  dayjs.extend(relativeTime);
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setLoading(true);
    setError(false);

    let url = "https://nc-news-hn5t.onrender.com/api/articles";
    const queries = [];

    if (topic) queries.push(`topic=${topic}`);
    if (sortBy) queries.push(`sort_by=${sortBy}`);
    if (order) queries.push(`order=${order}`);

    if (queries.length) {
      url += `?${queries.join("&")}`;
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
  }, [topic, sortBy, order]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Oh no! Something went wrong!</span>;

  function handleChange(e) {
    searchParams.set("sort_by", e.target.value);
    setSearchParams(searchParams);
  }

  function handleOrder(newOrder) {
    searchParams.set("order", newOrder);
    setSearchParams(searchParams);
  }

  return (
    <>
      <h1>Showing {topic || "all"} articles</h1>
      <div className="sort">
        <p>sorted by</p>
        <select value={sortBy} onChange={handleChange}>
          <option value="created_at">date</option>
          <option value="comment_count">comment count</option>
          <option value="votes">votes</option>
        </select>

        <img
          src="./assets/arro-up-3100.png"
          alt="Asc"
          className={order === "asc" ? "active-arrow" : ""}
          onClick={() => handleOrder("asc")}
        />
        <img
          src="./assets/arrow-down-3101.png"
          alt="Desc"
          className={order === "desc" ? "active-arrow" : ""}
          onClick={() => handleOrder("desc")}
        />
      </div>

      <div className="article">
        {articles.map((article) => (
          <Link
            key={article.article_id}
            to={`/articles/${article.article_id}`}
            className="article-container"
          >
            <h2 className="article-title">{article.title}</h2>
            <p>Posted {dayjs(article.created_at).fromNow()}</p>
            <p>{article.comment_count} comments</p>
            <p>{article.votes} votes</p>

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
