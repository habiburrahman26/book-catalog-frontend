import { useEffect, useState } from 'react';
import { useGetBooksQuery } from '../redux/features/book/bookApi';
import { BookType } from '../types/common';

type GenreType = {
  value: string;
  label: string;
};

type YearType = {
  value: number;
  label: string;
};

const useGetGenreAndYear = () => {
  const [bookGenre, setBookGenre] = useState<Array<GenreType>>([]);
  const [publicationYear, setPublicationYear] = useState<Array<YearType>>([]);
  const { data: books, isLoading } = useGetBooksQuery(undefined);

  useEffect(() => {
    if (books?.data?.length > 0) {
      const genres: string[] = books?.data?.map((b: BookType) => b.genre);
      const uniqueGenres = [...new Set(genres)];

      const options = uniqueGenres.map((g) => ({
        value: g,
        label: g,
      }));
      setBookGenre(options);
    }

    if (books?.data?.length > 0) {
      const publicationYear: number[] = books?.data?.map(
        (b: BookType) => b.publicationDate
      );
      const uniqueGenres = [...new Set(publicationYear)];

      const options = uniqueGenres.map((g) => ({
        value: g,
        label: g.toString(),
      }));

      setPublicationYear(options);
    }
  }, [books]);

  return { bookGenre, publicationYear, isLoading };
};

export default useGetGenreAndYear;
