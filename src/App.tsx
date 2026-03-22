import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center items-center mb-8">
          <a href="https://vite.dev" target="_blank" className="mr-4">
            <img src={viteLogo} className="w-20 h-20 hover:drop-shadow-lg transition-all duration-300 hover:scale-110" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="ml-4">
            <img src={reactLogo} className="w-20 h-20 animate-spin hover:drop-shadow-lg transition-all duration-300" alt="React logo" />
          </a>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Vite + React + TypeScript</h1>
        <h2 className="text-xl text-gray-600 mb-8">with Tailwind CSS</h2>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
          >
            Count is {count}
          </button>

          <p className="text-gray-600 mb-4">
            Edit <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">src/App.tsx</code> and save to test HMR
          </p>

          <div className="flex flex-col space-y-2">
            <a
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              href="https://vite.dev/"
              target="_blank"
            >
              📚 Read Vite Docs
            </a>
            <a
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              href="https://react.dev/"
              target="_blank"
            >
              ⚛️ Learn React
            </a>
            <a
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              href="https://tailwindcss.com/"
              target="_blank"
            >
              🎨 Tailwind CSS Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App