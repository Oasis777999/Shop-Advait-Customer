import React, { useState } from "react";

const ProductImageSlider = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="d-flex gap-3">
      {/* Left Thumbnail Column */}
      <div className="d-flex flex-column align-items-center overflow-auto" style={{ maxHeight: "500px" }}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`thumb-${idx}`}
            onClick={() => setActiveImage(img)}
            className={`img-thumbnail mb-2 ${activeImage === img ? "border-primary" : ""}`}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              cursor: "pointer",
              borderWidth: activeImage === img ? "2px" : "1px"
            }}
          />
        ))}
      </div>

      {/* Main Image Display */}
      <div className="border rounded shadow-sm d-flex align-items-center justify-content-center" style={{ width: "500px", height: "500px" }}>
        <img
          src={activeImage}
          alt="Main"
          className="img-fluid"
          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default ProductImageSlider;
