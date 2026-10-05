import { useEffect, useState } from "react";
import food from "./assets/food.png";
import food1 from "./assets/food1.png";
import food2 from "./assets/food2.png";
import food3 from "./assets/food4.png";
import "./Home.css";

const images = [
	food,
	food1,
	food2,
	food3
];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
	<>
    <section
      id="home"
      className="home"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
      }}
    >
      {/* Dark overlay */}
      <div className="home-overlay"></div>

      {/* Hero content */}
      <div className="home-content">
        <p className="subtitle">
          RESTAURANT · GRILL · DINING
        </p>

        <h1>
          Taste The
          <br />
          Difference
        </h1>

        <p className="description">
          Experience delicious meals prepared with passion
          and served in an unforgettable atmosphere.
        </p>

        <a href="#menu" className="home-btn">
          Explore Our Menu
        </a>
      </div>
    </section>
	  </>
  );
}

export default Home;
