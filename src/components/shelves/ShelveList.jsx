import { useEffect, useState } from "react";
import { getAll } from "../../BooksAPI";
import Shelf from "./Shelf";

const Shelves = [
  { id: "currentlyReading", name: "Currently Reading" },
  { id: "wantToRead", name: "Want to Read" },
  { id: "read", name: "Read" },
];

function ShelveList() {
  const [bookList, setBookList] = useState([]);
  const [reValidateList, setReValidateList] = useState(true);

  const reValidateBookData = () => {
    setReValidateList((prev) => !prev);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const list = await getAll();
      setBookList(list);
    };
    fetchBooks();
  }, [reValidateList]);

  return (
    <div className="list-books-content">
      <div>
        {Shelves.map((shelf) => (
          <Shelf
            key={shelf.id}
            shelf={shelf}
            books={bookList?.filter((book) => book.shelf === shelf.id)}
            updateList={reValidateBookData}
          />
        ))}
      </div>
    </div>
  );
}

export default ShelveList;
