export default function BookLoader() {
  return (
    <div className="w-full flex flex-col animate-pulse">
      <div className="relative">
        <div className="aspect-video bg-slate-200" />
      </div>

      <div className="flex flex-row mt-2 gap-2 items-center">
        <div className="flex flex-col space-y-1 grow">
          <p className="bg-slate-200 text-slate-200 text-[8px]">Loading...</p>
          <p className="bg-slate-200 text-slate-200 text-[8px]">Loading...</p>
          <p className="bg-slate-200 text-slate-200 text-[8px]">Loading...</p>
        </div>
      </div>
    </div>
  );
}
