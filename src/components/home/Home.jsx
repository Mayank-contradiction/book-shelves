import React from "react";
import ShelveList from "../shelves/ShelveList";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <ShelveList />
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default Home;