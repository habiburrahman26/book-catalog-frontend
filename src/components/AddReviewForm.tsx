import { SubmitHandler, useForm } from "react-hook-form";
import { useAddReviewMutation } from "../redux/features/review/reviewApi";
import { useEffect, useState } from "react";
import { ErrorApiResponseType } from "../types/common";
import { toast } from "react-hot-toast";
import Error from "./ui/Error";

type PropsType = {
  bookId: string;
  handleShowAddReviewForm: () => void;
};

type Inputs = {
  rating: number;
  comment: string;
};

const AddReviewForm = ({ bookId, handleShowAddReviewForm }: PropsType) => {
  const [error, setError] = useState<ErrorApiResponseType>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [addReview, { data, isLoading, error: responseError }] =
    useAddReviewMutation();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError?.data);
    }

    if (data?.data?.title) {
      toast.success("Review added successfully");
      handleShowAddReviewForm();
    }
  }, [data, responseError,handleShowAddReviewForm]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setError(undefined);
    addReview({
      id: bookId,
      ...data,
    });
  };

  return (
    <div className="border rounded p-3 my-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="number"
            id="rating"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2"
            placeholder="Rating"
            {...register("rating", { required: "Rating is required" })}
          />
          {errors.rating && (
            <span className="text-xs text-red-500 font-medium">
              {errors.rating?.message}
            </span>
          )}
        </div>
        <div>
          <textarea
            id="comment"
            cols={30}
            rows={3}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Comment..."
            {...register("comment", { required: "Comment is required" })}
          ></textarea>
          {errors.comment && (
            <span className="text-xs text-red-500 font-medium">
              {errors.comment?.message}
            </span>
          )}
        </div>

        {error?.errorMessages && (
          <Error message={error?.errorMessages?.[0]?.message} />
        )}

        <div className="flex justify-end gap-4 pt-3">
          <button
            type="button"
            className="btn btn-xs btn-outline"
            onClick={handleShowAddReviewForm}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-xs btn-primary"
            disabled={isLoading}
          >
            {isLoading && (
              <span className="loading loading-spinner loading-xs text-white"></span>
            )}
            <span>Add</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
