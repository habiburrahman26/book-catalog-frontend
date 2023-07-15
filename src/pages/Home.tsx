/* eslint-disable no-unsafe-optional-chaining */
import Book from '../components/Book';
import BookLoader from '../components/loder/BookLoader';
import Error from '../components/ui/Error';
import { useGetBooksQuery } from '../redux/features/book/bookApi';
import { BookType } from '../types/common';

const Home = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery(undefined);

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

  if (!isLoading && !isError && books?.data?.length === 0) {
    content = <Error message="No Book found!" />;
  }

  console.log(books);

  if (!isLoading && !isError && books?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 justify-items-center gap-5">
        {...books?.data
          ?.slice(0, 10)
          ?.map((b: BookType) => <Book key={b._id} book={b} />)}
      </div>
    );
  }

  return (
    <section className="pt-10 px-4 min-h-[calc(100vh-15vh)]">{content}</section>
  );
};

export default Home;
