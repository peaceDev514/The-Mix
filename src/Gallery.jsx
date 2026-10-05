import { useState } from "react";
import "./Gallery.css";

import food1 from "./assets/food4.png";
import food2 from "./assets/food6.png";
import food3 from "./assets/food7.png";
import food4 from "./assets/about.jpg";
import food5 from "./assets/food.png";
import food6 from "./assets/dining.jpg";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      image: food1,
      title: "Signature Dishes",
      category: "Our Kitchen",
      className: "gallery-large",
    },
    {
      image: food2,
      title: "Freshly Prepared",
      category: "Food",
      className: "gallery-small",
    },
    {
      image: food3,
      title: "Good Food",
      category: "Dining",
      className: "gallery-small",
    },
    {
      image: food4,
      title: "Restaurant Experience",
      category: "Atmosphere",
      className: "gallery-medium",
    },
    {
      image: food5,
      title: "Rich Flavours",
      category: "Specials",
      className: "gallery-medium",
    },
    {
      image: food6,
      title: "Made With Care",
      category: "Our Kitchen",
      className: "gallery-wide",
    },
  ];

  return (
    <section id="gallery" className="gallery-section">

      <div className="gallery-header">
        <div>
          <span className="gallery-label">A Taste Of The Mix</span>

          <h2>
            Moments Worth
            <br />
            <span>Remembering</span>
          </h2>
        </div>

        <p>
          Take a look inside our world of great food, warm
          atmosphere, and memorable dining experiences.
        </p>
      </div>

      <div className="gallery-grid">
        {images.map((item, index) => (
          <div
            className={`gallery-item ${item.className}`}
            key={index}
          >
            <img
              src={item.image}
              alt={item.title}
            />

            <div className="gallery-overlay">
              <div className="gallery-info">
                <span>{item.category}</span>
                <h3>{item.title}</h3>
              </div>

              <button
                className="gallery-arrow"
                onClick={() => setSelectedImage(item)}
                aria-label={`View ${item.title}`}
              >
                ↗
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="gallery-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="gallery-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            ×
          </button>

          <img
            src={selectedImage.image}
            alt={selectedImage.title}
            onClick={(e) => e.stopPropagation()}
          />

          <div
            className="gallery-lightbox-info"
            onClick={(e) => e.stopPropagation()}
          >
            <span>{selectedImage.category}</span>
            <h3>{selectedImage.title}</h3>
          </div>
        </div>
      )}

    </section>
  );
}

export default Gallery;
