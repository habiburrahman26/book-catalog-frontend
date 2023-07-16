import { Link, useParams } from "react-router-dom";
import { useGetBookQuery } from "../redux/features/book/bookApi";
import BookDetailsLoader from "../components/loder/BookDetailsLoader";
import Error from "../components/ui/Error";
import { Review } from "../types/common";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import DeleteModal from "../components/DeleteModal";

const BookDetails = () => {
  const isLoggedIn = useAuth();
  const { bookId } = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleDeleteModal = () => {
    setOpenDeleteModal((prevState) => !prevState);
  };

  //! get book data
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
              <span className="text-base">Author:</span>{" "}
              <span>{book?.data?.author}</span>
            </p>
            <p>
              <span className="text-base">Publication Date:</span>{" "}
              <span>{book?.data?.publicationDate}</span>
            </p>

            {/* edit and delete button start */}
            {isLoggedIn && (
              <div className="flex gap-4 pt-6">
                <Link
                  to={`/edit-book/${bookId}`}
                  className="flex items-center gap-2 btn btn-xs btn-outline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                  <span>Edit</span>
                </Link>
                <button
                  type="button"
                  onClick={handleDeleteModal}
                  className="flex items-center gap-2 btn btn-xs btn-outline border-[#F24C3D]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#F24C3D"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>

                  <span className="text-[#F24C3D]">Delete</span>
                </button>
              </div>
            )}

            {/* edit and delete button end */}
          </div>
        </div>
        <div className="pt-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl pb-4">Reviews</h2>
            {isLoggedIn && (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2"
              >
                Add Review
              </button>
            )}

            {!isLoggedIn && (
              <div>
                <span>Please login to write review</span>
                <Link
                  to="/sign-in"
                  className=" btn btn-primary btn-outline btn-sm ml-4 rounded"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {book?.data?.reviews.length > 0 &&
            book?.data?.reviews.map((review: Review) => (
              <div key={review.userEmail} className="pb-5">
                <div className="flex items-center gap-3">
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

  return (
    <section className="pt-10 px-4 min-h-[calc(100vh-15vh)]">
      {content}{" "}
      <DeleteModal
        isOpen={openDeleteModal}
        handleModal={handleDeleteModal}
        title={book?.data?.title}
        id={bookId}
      />
    </section>
  );
};

export default BookDetails;
