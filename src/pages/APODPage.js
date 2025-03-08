import React, { useEffect, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import { BounceLoader } from "react-spinners"
import { BounceLoader } from "react-spinners"

const APODPage = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("http://localhost:5000/api/apod")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching APOD:", error))
  }, [])

  return (
    <div style={styles.page}>
      <h2>🌠 Astronomy Picture of the Day</h2>
      {data ? (
        <>
          <h3>{data.title}</h3>
          <LazyLoadImage
            src={data.url}
            alt={data.title}
            style={styles.image}
            effect="blur" // 👈 Lazy load with smooth blur effect
          />
          <p>{data.explanation}</p>
        </>
      ) : (
        <div style={styles.spinnerContainer}>
          <BounceLoader color="#36D7B7" loading={!data} size={50} />
          <p>Loading NASA's Astronomy Picture of the Day...</p>
        </div>
      )}
    </div>
  )
}

const styles = {
  page: { textAlign: "center", padding: "20px" },
  image: { width: "60%", borderRadius: "10px" },
}

export default APODPage
