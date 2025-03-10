import React, { useEffect, useState } from "react"

const MarsRoverPage = () => {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    fetch("https://nasa-explorer-app-00eacef84580.herokuapp.com/api/mars-rover")
      .then((res) => res.json())
      .then((data) => setPhotos(data.photos.slice(0, 10))) // Get 10 images
      .catch((error) => console.error("Error fetching Mars photos:", error))
  }, [])

  return (
    <div className="api-section" div style={styles.page}>
      <h2>🔴 Mars Rover Photos</h2>
      <div style={styles.gallery}>
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.img_src}
            alt="Mars"
            style={styles.image}
          />
        ))}
      </div>
    </div>
  )
}

const styles = {
  page: { textAlign: "center", padding: "20px" },
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  },
  image: { width: "100%", borderRadius: "5px" },
}

export default MarsRoverPage
