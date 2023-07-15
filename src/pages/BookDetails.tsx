import { useParams } from 'react-router-dom';
import { useGetBookQuery } from '../redux/features/book/bookApi';
import BookDetailsLoader from '../components/loder/BookDetailsLoader';
import Error from '../components/ui/Error';
import { Review } from '../types/common';

const BookDetails = () => {
  const { bookId } = useParams();
  const { data: book, isLoading, isError } = useGetBookQuery(bookId);

  let content = null;

  if (isLoading) {
    content = <BookDetailsLoader />;
  }

  if (!isLoading && isError) {
    content = <Error message="Something went wrong!" />;
  }

  if (!isLoading && !isError && book?.data === null) {
    content = <Error message="No Book found!" />;
  }

  if (!isLoading && !isError && book?.data?._id) {
    content = (
      <div className="container lg:w-1/2 mx-auto px-4 flex flex-col ">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="basis-1/2 h-80">
            <img src={book?.data?.image} alt="" className="h-80" />
          </div>
          <div className="flex flex-col basis-1/2">
            <p className="badge badge-outline badge-lg">{book?.data?.genre}</p>
            <p className="text-2xl font-semibold pt-2 pb-1">
              {book?.data?.title}
            </p>
            <p className="pb-3">
              <span className="text-base">Author:</span>{' '}
              <span>{book?.data?.author}</span>
            </p>
            <p>
              <span className="text-base">Publication Date:</span>{' '}
              <span>{book?.data?.publicationDate}</span>
            </p>
          </div>
        </div>
        <div className="pt-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl pb-4">Reviews</h2>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2"
            >
              Add Review
            </button>
          </div>

          {book?.data?.reviews.length > 0 &&
            book?.data?.reviews.map((review: Review) => (
              <div className="pb-5">
                <div key={review.userEmail} className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                      <span className="text-sm">
                        {review.userEmail.slice(0, 1).toLocaleUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p>{review.userEmail}</p>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#F2BE22"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#F2BE22"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>

                      <span>{review.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="pt-1">{review.comment}</p>
              </div>
            ))}
          {book?.data?.reviews.length === 0 && <p>No review found!</p>}
        </div>
      </div>
    );
  }

  console.log(book);

  return (
    <section className="pt-10 px-4 min-h-[calc(100vh-15vh)]">{content}</section>
  );
};

export default BookDetails;
