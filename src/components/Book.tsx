import { Link } from "react-router-dom";
import { BookType } from "../types/common";

type BookProps = {
  book: BookType;
};

const Book = ({ book }: BookProps) => {
  const { _id, title, author, image, genre, publicationDate } = book;

  return (
    <Link
      to={`/book/${_id}`}
      className="card w-full bg-base-100 shadow-md hover:shadow-none hover:ring-2 transition-all p-2"
    >
      <figure>
        <img src={image} alt={title} className="h-60 w-full" />
      </figure>
      <div className="card-body p-3">
        <div className="flex items-center justify-between">
          <span className="badge badge-outline">{genre}</span>
          <span>{publicationDate}</span>
        </div>
        <h2 className="text-lg font-semibold -mb-2">{title}</h2>
        <p>{author}</p>
      </div>
    </Link>
  );
};

export default Book;
