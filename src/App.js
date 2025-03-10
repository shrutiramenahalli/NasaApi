import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import APODPage from "./pages/APODPage"
import MarsRoverPage from "./pages/MarsRoverPage"
import EPICPage from "./pages/EPICPage"
import NEOPage from "./pages/NEOPage"
import Home from "./pages/Home"
import MediaLibraryPage from "./pages/MediaLibraryPage"
import Header from "./components/Header"

const cors = require("cors")
app.use(
  cors({
    origin: "https://nasa-explorer-app-00eacef84580.herokuapp.com",
  })
)

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <nav style={styles.navbar}>
          <Link to="/">Home</Link>
          <Link to="/apod">APOD</Link>
          <Link to="/mars-rover">Mars Rover</Link>
          <Link to="/epic">EPIC</Link>
          <Link to="/neo">Near-Earth Objects</Link>
          <Link to="/media-library">NASA Media</Link>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apod" element={<APODPage />} />
            <Route path="/mars-rover" element={<MarsRoverPage />} />
            <Route path="/epic" element={<EPICPage />} />
            <Route path="/neo" element={<NEOPage />} />
            <Route path="/media-library" element={<MediaLibraryPage />} />
          </Routes>
        </div>
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
