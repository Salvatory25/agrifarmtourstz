export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="h-72 bg-green-800 animate-pulse flex items-end px-6 pb-12">
        <div className="max-w-7xl mx-auto w-full space-y-3">
          <div className="h-3 w-20 bg-white/20 rounded-full" />
          <div className="h-10 w-80 bg-white/20 rounded-full" />
        </div>
      </div>
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-none overflow-hidden border border-gray-100 shadow-sm animate-pulse">
              <div className="h-52 bg-gray-100" />
              <div className="p-6 space-y-3">
                <div className="h-3 w-16 bg-gray-100 rounded-full" />
                <div className="h-5 w-3/4 bg-gray-100 rounded-full" />
                <div className="h-3 w-full bg-gray-100 rounded-full" />
                <div className="h-3 w-2/3 bg-gray-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
