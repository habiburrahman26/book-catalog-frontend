import { Link } from 'react-router-dom';
import { BookType } from '../types/common';
import { useAddToWishlistMutation } from '../redux/features/wishlist/wishlistApi';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

type BookProps = {
  book: BookType;
};

const Book = ({ book }: BookProps) => {
  const { _id, title, author, image, genre, publicationDate } = book;

  const [addToWishlist, { data, isLoading, error }] =
    useAddToWishlistMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (data) {
      toast.success(data?.message);
    }
  }, [data, error]);

  return (
    <div className="card w-full bg-base-100 shadow-md hover:shadow-none hover:ring-2 transition-all p-2 relative group">
      <figure>
        <img src={image} alt={title} className="h-60 w-full" />
      </figure>
      <div className="card-body p-3">
        <div className="flex items-center justify-between">
          <span className="badge badge-outline">{genre}</span>
          <span>{publicationDate}</span>
        </div>
        <Link
          to={`/book/${_id}`}
          className="text-lg font-semibold -mb-2 hover:text-blue-500 transition-all"
        >
          {title}
        </Link>
        <p>{author}</p>
      </div>

      <button
        title="add to wishlist"
        className=" opacity-0 group-hover:opacity-100 transition-opacity duration-300text-xs flex items-center gap-2 btn  btn-sm btn-circle bg-gray-50 absolute top-5 right-4"
        onClick={() => addToWishlist({ bookId: _id })}
        disabled={isLoading}
      >
        {!isLoading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        )}
        {isLoading && (
          <span className="loading loading-spinner loading-md"></span>
        )}
      </button>
    </div>
  );
};

export default Book;
