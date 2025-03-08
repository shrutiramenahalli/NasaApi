import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import APODPage from "./pages/APODPage"
import MarsRoverPage from "./pages/MarsRoverPage"
import EPICPage from "./pages/EPICPage"
import NEOPage from "./pages/NEOPage"
import MediaLibraryPage from "./pages/MediaLibraryPage"

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <h1>🌌 NASA Data Explorer 🚀</h1>
        <nav style={styles.navbar}>
          <Link to="/apod">APOD</Link>
          <Link to="/mars-rover">Mars Rover</Link>
          <Link to="/epic">EPIC</Link>
          <Link to="/neo">Near-Earth Objects</Link>
          <Link to="/media-library">NASA Media</Link>
        </nav>
        <Routes>
          <Route path="/apod" element={<APODPage />} />
          <Route path="/mars-rover" element={<MarsRoverPage />} />
          <Route path="/epic" element={<EPICPage />} />
          <Route path="/neo" element={<NEOPage />} />
          <Route path="/media-library" element={<MediaLibraryPage />} />
        </Routes>
      </div>
    </Router>
  )
}

const styles = {
  container: { textAlign: "center", padding: "20px" },
  navbar: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    padding: "10px",
    backgroundColor: "#222",
    color: "white",
  },
}

export default App
