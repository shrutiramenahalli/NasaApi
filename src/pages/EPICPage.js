import React, { useEffect, useState } from "react"

const EPICPage = () => {
  const [images, setImages] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/epic")
      .then((res) => res.json())
      .then((data) => {
        console.log("EPIC API Response:", data) // Debugging
        setImages(data.slice(0, 10)) // Show 10 images
      })
      .catch((error) => console.error("Error fetching EPIC data:", error))
  }, [])

  return (
    <div style={styles.page}>
      <h2>🌍 Earth Polychromatic Imaging Camera (EPIC)</h2>
      <div style={styles.gallery}>
        {images.length > 0 ? (
          images.map((img, index) => (
            <div key={index} style={styles.card}>
              <img src={img.imageUrl} alt="Earth" style={styles.image} />
              <p>{img.caption}</p>
              <small>{img.date}</small>
            </div>
          ))
        ) : (
          <p>Loading or No Images Found</p>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: { textAlign: "center", padding: "20px" },
  gallery: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  },
  card: {
    width: "220px",
    padding: "10px",
    textAlign: "center",
    border: "1px solid #ddd",
  },
  image: { width: "200px", borderRadius: "10px" },
}

export default EPICPage
