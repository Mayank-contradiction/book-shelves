import { Link } from "react-router-dom";
import { search } from "../../BooksAPI";
import BookListItem from "../book/BookListItem";
import { useEffect, useState } from "react";

function Search() {
  const [searchResults, setSearchResults] = useState({
    data: [],
    error: false,
    loading: false,
  });
  const [query, setQuery] = useState("");

  useEffect(() => {
    const searchBooks = async () => {
      setSearchResults((prev) => ({
        ...prev,
        loading: true,
      }));
      const results = await search(query);
      if (results.error) {
        setSearchResults({
          data: [],
          error: true,
          loading: false,
        });
      } else {
        setSearchResults({
          data: results,
          error: false,
          loading: false,
        });
      }
    };
    if (query) {
      searchBooks();
    } else {
      setSearchResults({
        data: [],
        error: false,
        loading: false,
      });
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
        {searchResults.loading ? (
          <p>Loading the data....</p>
        ) : searchResults.error ? (
          <p className="text-danger">There was an error with API call.</p>
        ) : (
          query && searchResults.data.length === 0 && <p>No results found.</p>
        )}
        <ol className="books-grid">
          {searchResults.data?.length !== 0 &&
            searchResults.data.map((book) => (
              <BookListItem key={book.id} bookId={book.id} />
            ))}
        </ol>
      </div>
    </div>
  );
}

export default Search;
