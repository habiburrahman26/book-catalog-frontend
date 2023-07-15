import Book from "../components/Book";
import BookLoader from "../components/loder/BookLoader";
import Error from "../components/ui/Error";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { BookType } from "../types/common";

const AllBook = () => {
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

  if (!isLoading && !isError && books?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 justify-items-center gap-5">
        {books?.data?.map((b: BookType) => (
          <Book key={b._id} book={b} />
        ))}
      </div>
    );
  }

  return (
    <section className="pt-10 px-4 min-h-[calc(100vh-15vh)]">
      <div className="pb-5 w-2/5 mx-auto">
        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search title, author, or genre"
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {content}
    </section>
  );
};

export default AllBook;
