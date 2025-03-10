import React, { useEffect, useState } from "react"
import NeoChart from "../components/NeoChart"

const NEOPage = () => {
  const [neoData, setNeoData] = useState([])

  useEffect(() => {
    fetch("https://nasa-explorer-app-00eacef84580.herokuapp.com/api/neo")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch NEO data")
        return res.json()
      })
      .then((data) => {
        console.log("Fetched NEO Data:", data)
        const neoObjects = Object.values(data.near_earth_objects).flat()
        const formattedData = neoObjects.slice(0, 10).map((neo) => ({
          name: neo.name,
          diameter: neo.estimated_diameter.kilometers.estimated_diameter_max,
        }))
        setNeoData(formattedData)
      })
      .catch((error) => console.error("Error fetching NEO data:", error))
  }, [])

  return (
    <div className="api-section">
      <h2>🌍 Near-Earth Objects</h2>
      <NeoChart data={neoData} />
    </div>
  )
}

export default NEOPage
