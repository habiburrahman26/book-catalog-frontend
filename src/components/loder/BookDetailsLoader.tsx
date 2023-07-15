const BookDetailsLoader = () => {
  return (
    <div className="container mx-auto px-4 flex flex-col animate-pulse">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="bg-slate-200 basis-1/2 h-80"></div>
        <div className="flex flex-col gap-4 basis-1/2">
          <div className="flex justify-between">
            <p className="bg-slate-200 text-slate-200 h-6 w-1/4"></p>
            <p className="bg-slate-200 text-slate-200 h-6 w-1/4"></p>
          </div>
          <p className="bg-slate-200 text-slate-200 h-8 w-3/4"></p>
          <p className="bg-slate-200 text-slate-200 h-7 w-1/2"></p>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsLoader;
