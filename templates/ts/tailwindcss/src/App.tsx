import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-[400px] h-[600px] bg-gradient-to-br from-gray-900 via-slate-900 to-black overflow-hidden">
      <div className="h-full flex flex-col p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-2">
            Vite + React
          </h1>
          <p className="text-slate-400 text-sm">
            Edit <code className="bg-slate-700/70 px-2 py-1 rounded text-xs text-blue-300">src/App.tsx</code> and save
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="relative group bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
          >
            <span className="relative z-10">count is {count}</span>
          </button>
          
          <p className="text-slate-500 text-sm">
            Click to increment
          </p>
        </div>

        <div className="border-t border-slate-700/50 pt-4 mt-4">
          <div className="grid grid-cols-2 gap-3 text-center text-sm">
            <a
              href="https://vitejs.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Vite Docs
            </a>
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
            >
              React Docs
            </a>
          </div>
          
          <div className="mt-4 text-center text-xs text-slate-600">
            Tailwind CSS + React + Vite
          </div>
        </div>
      </div>
    </div>
  )
}

export default App