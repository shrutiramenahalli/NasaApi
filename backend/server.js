const express = require("express")
const axios = require("axios")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000
const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY"

// CORS Configuration
app.use(cors())
app.use(express.json())

// Test API Route
app.get("/api/test", (req, res) => {
  res.json({ message: "NASA API Backend is working!" })
})

// Mars Rover API
app.get("/api/mars-rover", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`
    )
    res.json(response.data)
  } catch (error) {
    console.error("Error fetching Mars Rover data:", error.message)
    res.status(500).json({ error: "Failed to fetch Mars Rover data" })
  }
})

// NEO (Near-Earth Objects) API
app.get("/api/neo", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?api_key=${NASA_API_KEY}`
    )
    res.json(response.data)
  } catch (error) {
    console.error("Error fetching NEO data:", error.message)
    res.status(500).json({ error: "Failed to fetch NEO data" })
  }
})

// Serve React Frontend AFTER defining API routes
app.use(express.static(path.join(__dirname, "frontend/build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"))
})

// Start the Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
