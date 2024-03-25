import "./App.css";
import Header from "./components/Header";
import Popular from "./components/Popular";
import Footer from "./components/Footer";
import Upcoming from "./components/Upcoming";
import Random from "./components/Random";
import Character from "./components/Character";
import Char from "./components/Char"
import Anime from "./components/Anime";
import Search from "./components/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Popular />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/random" element={<Random />} />
        <Route path="/character" element={<Character />} />
        <Route path="/anime/:id" element={<Anime />} />
        <Route path="/char/:id" element={<Char />} />
        <Route path="/search" element={<Search />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;