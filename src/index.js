import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">🚀 Welcome to NASA Explorer</h1>
      <p className="text-lg">Discover space through NASA's Open APIs</p>
      <div className="mt-6">
        <a href="/apod" className="px-4 py-2 bg-blue-500 rounded-md mr-4">
          Astronomy Picture of the Day
        </a>
        <a href="/mars-rover" className="px-4 py-2 bg-green-500 rounded-md">
          Mars Rover Photos
        </a>
      </div>
    </main>
  )
}
