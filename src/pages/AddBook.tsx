import { SubmitHandler, useForm } from 'react-hook-form';
import { useAddBookMutation } from '../redux/features/book/bookApi';
import { ErrorApiResponseType } from '../types/common';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Error from '../components/ui/Error';

type Inputs = {
  title: string;
  author: string;
  image: string;
  publicationDate: number;
  genre: string;
};

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [error, setError] = useState<ErrorApiResponseType>();
  const navigate = useNavigate();

  const [addBook, { data, isLoading, error: responseError }] =
    useAddBookMutation();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError?.data);
    }

    if (data?.data?.title) {
      toast.success('Book added successfully');
      navigate('/all-books');
    }
  }, [data, navigate, responseError]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setError(undefined);
    addBook(data);
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[calc(100vh-12vh)] lg:py-0">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
            Add New Book
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
          >
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && (
                <span className="text-xs text-red-500 font-medium">
                  {errors.title?.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="author"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                {...register('author', { required: 'Author is required' })}
              />
              {errors.author && (
                <span className="text-xs text-red-500 font-medium">
                  {errors.author?.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Image
              </label>
              <input
                type="url"
                id="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                {...register('image', { required: 'Image is required' })}
              />
              {errors.image && (
                <span className="text-xs text-red-500 font-medium">
                  {errors.image?.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="genre"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Genre
              </label>
              <input
                type="text"
                id="genre"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                {...register('genre', { required: 'Genre is required' })}
              />
              {errors.genre && (
                <span className="text-xs text-red-500 font-medium">
                  {errors.genre?.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="publishedYear"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Published Year
              </label>
              <input
                type="number"
                id="publishedYear"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                {...register('publicationDate', {
                  required: 'Published Year is required',
                  valueAsNumber: true,
                })}
              />
              {errors.publicationDate && (
                <span className="text-xs text-red-500 font-medium">
                  {errors.publicationDate?.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-4 w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {isLoading && (
                <span className="loading loading-spinner loading-sm text-white"></span>
              )}
              <span>Add Book</span>
            </button>
          </form>
        </div>
      </div>
      <div>
        {error?.errorMessages && (
          <Error message={error?.errorMessages?.[0]?.message} />
        )}
      </div>
    </section>
  );
};

export default AddBook;
