const express = require("express")
const axios = require("axios")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors())
const PORT = process.env.PORT || 5000
const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY"

const cache = {}
const CACHE_DURATION = 5 * 60 * 1000

// 🌌 APOD Route
app.get("/api/apod", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
    )
    res.json(response.data)
  } catch (error) {
    console.error("Error fetching APOD:", error)
    res.status(500).json({ error: "Failed to fetch APOD" })
  }
})

// 🔴 Mars Rover Route
app.get("/api/mars-rover", async (req, res) => {
  if (cache.mars && Date.now() - cache.mars.timestamp < CACHE_DURATION) {
    console.log("Serving Mars Rover data from cache")
    return res.json(cache.mars.data)
  }

  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`
    )
    cache.mars = { data: response.data, timestamp: Date.now() } // Store data in cache
    res.json(response.data)
  } catch (error) {
    console.error("Error fetching Mars Rover data:", error)
    res.status(500).json({ error: "Failed to fetch Mars Rover data" })
  }
})

// 🌍 EPIC Route
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

    console.log("EPIC Data Sent:", epicData)
    res.json(epicData)
  } catch (error) {
    console.error(
      "Error fetching EPIC data:",
      error.response?.data || error.message
    )
    res.status(500).json({ error: "Failed to fetch EPIC data" })
  }
})

// 📸 NASA Media Library Route
app.get("/api/media", async (req, res) => {
  try {
    const response = await axios.get(
      `https://images-api.nasa.gov/search?q=earth`
    )
    res.json(response.data)
  } catch (error) {
    console.error("Error fetching Media Library:", error)
    res.status(500).json({ error: "Failed to fetch NASA Media" })
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
