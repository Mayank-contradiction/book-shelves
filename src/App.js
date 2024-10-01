import "./App.css";
import Search from "./components/search/Search";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";

function App() {
  return (
    <Routes>
      <Route path="/search" element={<Search/>} exact/>
      <Route path="/" element={<Home/>} exact/>
    </Routes>
  );
}

export default App;