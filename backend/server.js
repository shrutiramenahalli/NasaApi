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

// APOD Route
app.get("/api/apod", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
    )
    res.json(response.data)
  } catch (error) {
    console.error("Error fetching APOD:", error.message)
    res.status(500).json({ error: "Failed to fetch APOD" })
  }
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

// EPIC Route
app.get("/api/epic", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/EPIC/api/natural?api_key=${NASA_API_KEY}`
    )

    const epicData = response.data.map((img) => {
      const date = img.date.split(" ")[0].replaceAll("-", "/")
      return {
        imageUrl: `https://epic.gsfc.nasa.gov/archive/natural/${date}/png/${img.image}.png`,
        caption: img.caption,
        date: img.date,
      }
    })

    res.json(epicData)
  } catch (error) {
    console.error("Error fetching EPIC data:", error.message)
    res.status(500).json({ error: "Failed to fetch EPIC data" })
  }
})

// NASA Media Library Route
app.get("/api/media", async (req, res) => {
  try {
    const response = await axios.get(
      `https://images-api.nasa.gov/search?q=earth`
    )
    res.json(response.data)
  } catch (error) {
    console.error("Error fetching Media Library:", error.message)
    res.status(500).json({ error: "Failed to fetch NASA Media" })
  }
})

// Serve React Frontend AFTER defining API routes
app.use(express.static(path.join(__dirname, "frontend/build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"))
})

// Start the Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
