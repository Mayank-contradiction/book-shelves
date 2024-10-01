import React, { useEffect, useState } from "react";
import { get, update } from "../../BooksAPI";

const BookListItem = ({ bookId, updateList }) => {
  const [book, setBook] = useState(null);
  const [shelf, setShelf] = useState("none");

  useEffect(() => {
    const fetchBookData = async (bookId) => {
      const data = await get(bookId);
      setBook(data);
      setShelf(data?.shelf);
    };
    fetchBookData(bookId);
  }, [bookId]);

  async function handleShelfChange(e) {
    setShelf(e.target.value);
    await update(book, e.target.value);
    if (updateList) {
      updateList();
    }
  }

  function drag(e) {
    e.dataTransfer.setData("bookId", bookId);
  }
  return (
    <li>
      <div className="book" draggable="true" onDragStart={drag}>
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book?.imageLinks?.thumbnail || ""})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select onChange={handleShelfChange} value={shelf}>
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book?.title}</div>
        <div className="book-authors">
          <ul>
            {book?.authors?.map((author) => (
              <li key={author}>{author}</li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default BookListItem;
