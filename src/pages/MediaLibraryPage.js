import React, { useEffect, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

const MediaLibraryPage = () => {
  const [media, setMedia] = useState([])

  useEffect(() => {
    fetch("https://nasa-explorer-app-00eacef84580.herokuapp.com/api/media")
      .then((res) => res.json())
      .then((data) => {
        setMedia(data.collection.items.slice(0, 10))
      })
      .catch((error) => console.error("Error fetching media:", error))
  }, [])

  return (
    <div className="api-section" div style={styles.page}>
      <h2>📸 NASA Image & Video Library</h2>
      <div style={styles.gallery}>
        {media.length > 0 ? (
          media.map((item, index) => (
            <LazyLoadImage
              key={index}
              src={item.links[0].href}
              alt="NASA Media"
              style={styles.image}
              effect="bluu"
            />
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
  image: { width: "200px", borderRadius: "10px" },
}

export default MediaLibraryPage
