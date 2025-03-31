export default function Articles({ topic }) {
  if (!topic) {
    topic = "All";
  }
  return (
    <>
      <h1>Showing {topic} Articles</h1>
      <div className="article">
        <div className="article-container">
          <h2>Article Name</h2>
          <h4>[sport]</h4>
          <img src="https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg?w=700&h=700" />
        </div>
        <div className="article-container">
          <h2>Article Name</h2>
          <h4>[sport]</h4>
          <img src="https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg?w=700&h=700" />
        </div>
        <div className="article-container">
          <h2>Article Name</h2>
          <h4>[sport]</h4>
          <img src="https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg?w=700&h=700" />
        </div>
      </div>
    </>
  );
}
