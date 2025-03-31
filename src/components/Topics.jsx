import { Link } from "react-router-dom";

export default function Topics() {
  return (
    <div className="topic-container">
      <div className="topic">
        <button>Go to Sport</button>
      </div>

      <div className="topic">
        <button>Go to Cooking</button>
      </div>

      <div className="topic">
        <button>Go to Coding</button>
      </div>
    </div>
  );
}
