import React from "react";
import BookListItem from "../book/BookListItem";
import { update } from "../../BooksAPI";

const Shelf = ({ shelf, books, updateList }) => {
  function allowDrop(e) {
    e.preventDefault();
  }

  async function drop(event) {
    event.preventDefault();
    const bookId = event.dataTransfer.getData("bookId");
    await update({ id: bookId }, shelf?.id);
    if (updateList) {
      updateList();
    }
  }
  return (
    <div className="bookshelf" onDrop={drop} onDragOver={allowDrop}>
      <h2 className="bookshelf-title">{shelf?.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books?.map((book) => (
            <BookListItem
              key={book?.id}
              updateList={updateList}
              bookId={book?.id}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Shelf;
