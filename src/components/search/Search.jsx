import { Link } from "react-router-dom";
import { search } from "../../BooksAPI";
import BookListItem from "../book/BookListItem";
import { useEffect, useState } from "react";

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const searchBooks = async () => {
      const results = await search(query);
      if (results.error) {
        setSearchResults([]);
        alert("Some Backend Error Occured!");
        return;
      }
      setSearchResults(results);
    };
    if (query) {
      searchBooks();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to={"/"} className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults?.length !== 0 ? (
            searchResults.map((book) => (
              <BookListItem key={book.id} bookId={book.id} />
            ))
          ) : (
            <p>No results found</p>
          )}
        </ol>
      </div>
    </div>
  );
}

export default Search;
