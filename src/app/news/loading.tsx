export default function NewsLoading() {
  return (
    <div className="pt-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        {/* Title skeleton */}
        <div className="mb-12">
          <div className="h-10 bg-gray-200 w-72 mb-3 animate-pulse" />
          <div className="w-12 h-1 bg-[#1e40af]/30 mb-6" />
          <div className="h-6 bg-gray-200 w-full max-w-2xl animate-pulse" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-gray-200 bg-[#f3f4f6] h-[350px] p-4 flex flex-col justify-between">
              <div className="w-full aspect-video bg-gray-200 animate-pulse" />
              <div className="space-y-3 mt-4 flex-grow">
                <div className="h-4 bg-gray-200 w-1/4 animate-pulse" />
                <div className="h-6 bg-gray-200 w-3/4 animate-pulse" />
                <div className="h-3 bg-gray-200 w-2/3 mt-2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
