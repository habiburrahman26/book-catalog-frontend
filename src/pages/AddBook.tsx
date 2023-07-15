const AddBook = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[calc(100vh-12vh)] lg:py-0">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
            Add New Book
          </h1>
          <form className="space-y-4 md:space-y-6">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              />
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
              />
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
              />
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
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-4 w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              <span className="loading loading-spinner loading-sm text-white"></span>
              <span>Add Book</span>
            </button>
          </form>
        </div>
      </div>
      <div>
        {/* {error?.errorMessages && (
          <Error message={error?.errorMessages?.[0]?.message} />
        )} */}
      </div>
    </section>
  );
};

export default AddBook;
