import Header from "./components/Header";
import Footer from "./components/Footer";
import Topics from "./components/Topics";
import Articles from "./components/Articles";
import ArticleCard from "./components/ArticleCard";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

function App() {
  const [author, setAuthor] = useState("tickle122");

  return (
    <main>
      <Header />
      <Topics />
      <Routes>
        <Route path="/topics/:topic" element={<Articles />} />
        <Route path="/" element={<Articles />} />
        <Route path="/articles/:article_id" element={<ArticleCard />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
