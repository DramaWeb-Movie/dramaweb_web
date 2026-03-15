export default function DramaDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 md:px-6 py-5">
        <div className="animate-pulse">
          <div className="min-h-[320px] bg-gray-200 rounded-xl mb-6" />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="aspect-2/3 bg-gray-200 rounded-xl max-w-[300px]" />
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="aspect-video bg-gray-200 rounded-xl" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
