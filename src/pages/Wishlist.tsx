import { Link } from 'react-router-dom';
import BookLoader from '../components/loder/BookLoader';
import Error from '../components/ui/Error';
import { useGetWishlistQuery } from '../redux/features/wishlist/wishlistApi';
import { BookType } from '../types/common';
import DeleteBookButton from '../components/DeleteBookButton';

const Wishlist = () => {
  const {
    data: wishlists,
    isLoading,
    isError,
  } = useGetWishlistQuery(undefined);

  let content = null;

  if (isLoading) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 justify-items-center gap-5">
        <BookLoader />
        <BookLoader />
        <BookLoader />
        <BookLoader />
      </div>
    );
  }

  if (!isLoading && isError) {
    content = <Error message="Something went wrong!" />;
  }

  if (!isLoading && !isError && wishlists?.data?.length === 0) {
    content = <Error message="No data found!" />;
  }

  if (!isLoading && !isError && wishlists?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 justify-items-center gap-5">
        {...wishlists?.data?.map((b: { _id: string; bookId: BookType }) => (
          <div
            key={b.bookId._id}
            className="card w-full bg-base-100 shadow-md hover:shadow-none hover:ring-2 transition-all p-2 relative group"
          >
            <figure>
              <img
                src={b.bookId.image}
                alt={b.bookId.title}
                className="h-60 w-full"
              />
            </figure>
            <div className="card-body p-3">
              <div className="flex items-center justify-between">
                <span className="badge badge-outline">{b.bookId.genre}</span>
                <span>{b.bookId.publicationDate}</span>
              </div>
              <Link
                to={`/book/${b.bookId._id}`}
                className="text-lg font-semibold -mb-2 hover:text-blue-500 transition-all"
              >
                {b.bookId.title}
              </Link>
              <p>{b.bookId.author}</p>
            </div>

            <DeleteBookButton id={b?._id} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="pt-10 px-4 min-h-[calc(100vh-15vh)]">{content}</section>
  );
};

export default Wishlist;
