import React, { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const NeoChart = () => {
  const [neoData, setNeoData] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/neo")
      .then((res) => res.json())
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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Near-Earth Objects (Top 10 by Size)</h2>
      <ResponsiveContainer width="100%" height={300} minHeight={300}>
        <BarChart data={neoData}>
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: "Diameter (km)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="diameter" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default NeoChart
