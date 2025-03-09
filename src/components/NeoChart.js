import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const NeoChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🚀 Near-Earth Objects (Top 10 by Size)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
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
