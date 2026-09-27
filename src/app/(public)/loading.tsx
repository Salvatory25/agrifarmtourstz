export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white">
      {/* Animated logo + spinner */}
      <div className="flex flex-col items-center gap-6">
        {/* Pulsing brand mark */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-green-700 animate-ping absolute inset-0 opacity-20" />
          <div className="w-16 h-16 rounded-full bg-green-800 flex items-center justify-center relative z-10 shadow-lg">
            {/* Simple leaf SVG matching the logo style */}
            <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
              <path d="M20 4 C20 4 8 8 8 20 C8 28 14 34 20 36 C26 34 32 28 32 20 C32 8 20 4 20 4Z" fill="#fff" fillOpacity="0.9"/>
              <path d="M20 36 C20 36 20 20 20 10" stroke="#1a4a15" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M20 18 C20 18 14 14 12 10 C16 10 20 14 20 18Z" fill="#1a4a15"/>
            </svg>
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <p className="text-green-800 font-bold text-xl tracking-wide">AGRI FARM TOURS</p>
          <p className="text-amber-500 text-sm font-medium mt-1">Experience Nature. Live the Farm.</p>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-600 to-amber-400 rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  )
}
