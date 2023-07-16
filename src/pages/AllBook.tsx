/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Book from '../components/Book';
import BookLoader from '../components/loder/BookLoader';
import Error from '../components/ui/Error';
import { useGetBooksWithFilterQuery } from '../redux/features/book/bookApi';
import { BookType } from '../types/common';
import useGetGenreAndYear from '../hooks/useGetGenreAndYear';
import Select from 'react-select';

// get-books?search=novel&publicationDate=2023&genres=novel,fiction

const AllBook = () => {
  const [search, setSearch] = useState<string>('');
  const [genres, setGenre] = useState<Array<string>>([]);
  const [year, setYear] = useState<number>();

  const handleGenreChange = (selectedOption: any) => {
    if (selectedOption) {
      setGenre(selectedOption.map((g: any) => g.value).join(','));
    } else {
      setGenre([]);
    }
  };

  const handleYearChange = (selectedOption: any) => {
    if (selectedOption) {
      setYear(selectedOption.value);
    } else {
      setYear(0);
    }
  };

  const {
    bookGenre,
    publicationYear,
    isLoading: filterOptionLoading,
  } = useGetGenreAndYear();

  //! get all books
  const {
    data: books,
    isLoading,
    isError,
  } = useGetBooksWithFilterQuery({ search, genres, publicationDate: year });

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

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      width: '100%',
      padding: '4px',
      fontSize: '14px',
      borderRadius: '8px',
      backgroundColor: 'rgb(249 250 251)',
      border: '1px solid rgb(209 213 219)',
      '&:hover': {
        boxShadow: '0 0 0 #f5f5f5',
      },
      '&:focus': {
        boxShadow: 'none',
      },
      borderColor: state.isFocused ? 'none' : 'rgb(209 213 219)',
    }),
  };

  return (
    <section className="pt-10 px-4 min-h-[calc(100vh-15vh)]">
      <div className="flex justify-center gap-4 px-24">
        <div className="basis-2/6 pb-5">
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
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by title, author, or genre"
              required
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="basis-[25%]">
          <Select
            options={bookGenre}
            isMulti
            isClearable
            isLoading={filterOptionLoading}
            styles={selectStyles}
            placeholder="Filter By Genre"
            onChange={handleGenreChange}
          />
        </div>
        <div className="basis-[15%]">
          <Select
            options={publicationYear}
            isClearable
            isLoading={filterOptionLoading}
            styles={selectStyles}
            placeholder="Filter By Year"
            onChange={handleYearChange}
          />
        </div>
      </div>
      {content}
    </section>
  );
};

export default AllBook;
