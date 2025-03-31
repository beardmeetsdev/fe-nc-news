import Header from "./components/Header";
import Footer from "./components/Footer";
import Topics from "./components/Topics";
import Articles from "./components/Articles";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [author, setAuthor] = useState("tickle122");

  return (
    <main>
      <Header />
      <Topics />
      <Articles topic={topic} />
      <Footer />
    </main>
  );
}

export default App;
