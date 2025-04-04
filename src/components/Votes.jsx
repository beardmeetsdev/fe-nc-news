import axios from "axios";
import { useState } from "react";

export default function Votes({ article_id, currentVotes, user }) {
  const [votes, setVotes] = useState(currentVotes);
  const [loading, setLoading] = useState(false);

  function updateVotes(adjust) {
    if (!loading) {
      setLoading(true);

      let newVotes = votes + adjust;
      if (newVotes === -1) {
        newVotes = 0;
      }
      setVotes(newVotes);

      axios
        .patch(`https://nc-news-hn5t.onrender.com/api/articles/${article_id}`, {
          inc_votes: adjust,
        })
        .then(() => {
          setLoading(false);
        });
    }
  }

  return (
    <>
      {user ? (
        <div className="button-format">
          <button
            className="bespoke-button"
            onClick={() => updateVotes(-1)}
            disabled={loading}
          >
            -
          </button>
          <div>{votes}</div>
          <button
            className="bespoke-button"
            onClick={() => updateVotes(1)}
            disabled={loading}
          >
            +
          </button>
          <div>votes</div>
        </div>
      ) : null}
    </>
  );
}
