import Header from "./components/Header";
import Footer from "./components/Footer";
import Topics from "./components/Topics";
import Articles from "./components/Articles";
import ArticleList from "./components/ArticleList";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(false);

  return (
    <main>
      <Header user={user} setUser={setUser} />
      <Topics />
      <Routes>
        <Route path="/topics/:topic" element={<Articles />} />
        <Route path="/" element={<Articles />} />
        <Route
          path="/articles/:article_id"
          element={<ArticleList user={user} />}
        />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
