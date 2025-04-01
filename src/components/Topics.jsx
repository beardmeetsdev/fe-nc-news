import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://nc-news-hn5t.onrender.com/api/topics")
      .then(({ data }) => {
        setTopics([{ slug: "all" }, ...data.topics]);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Oh no! Something went wrong!</span>;

  return (
    <nav className="topics-nav">
      {topics.map((topic) => (
        <Link
          key={topic.slug}
          to={topic.slug === "all" ? "/" : `/topics/${topic.slug}`}
          className="topic-link"
        >
          <button>{topic.slug}</button>
        </Link>
      ))}
    </nav>
  );
}
