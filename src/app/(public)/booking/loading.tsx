export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="h-64 bg-green-800 animate-pulse flex items-end px-6 pb-12">
        <div className="max-w-7xl mx-auto w-full space-y-3">
          <div className="h-3 w-20 bg-white/20 rounded-full" />
          <div className="h-10 w-64 bg-white/20 rounded-full" />
        </div>
      </div>
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-5 animate-pulse">
            <div className="h-6 w-48 bg-gray-100 rounded-full" />
            <div className="h-4 w-full bg-gray-100 rounded-full" />
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded-none" />
            ))}
          </div>
          <div className="space-y-6 animate-pulse">
            <div className="bg-white rounded-none p-8 border border-gray-100 shadow-sm space-y-5">
              <div className="h-5 w-32 bg-gray-100 rounded-full" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-20 bg-gray-100 rounded-full" />
                    <div className="h-4 w-40 bg-gray-100 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
