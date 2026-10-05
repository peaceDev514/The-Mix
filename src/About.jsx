import "./About.css";
import food from "./assets/food6.png";

function About() {
  return (
    <>
	  <section id="about">
      {/* Why Choose Us */}
      <section className="why-us">
        <div className="why-us-header">
          <span className="section-label">Why Choose Us</span>

          <h2>
            Good food.
            <br />
            Great moments.
          </h2>

          <p>
            At TableMannas, we bring together quality ingredients,
            delicious flavours, and warm hospitality to create an
            experience worth coming back for.
          </p>
        </div>

        <div className="why-us-cards">

          <article className="why-card">
            <span className="card-number">01</span>

            <div className="card-icon">
              🍽
            </div>

            <h3>Quality Ingredients</h3>

            <p>
              We carefully select quality ingredients to ensure
              every meal is fresh, flavourful, and satisfying.
            </p>
          </article>

          <article className="why-card">
            <span className="card-number">02</span>

            <div className="card-icon">
              ✦
            </div>

            <h3>Authentic Flavours</h3>

            <p>
              Every dish is prepared with care and rich flavours
              that make every visit a memorable experience.
            </p>
          </article>

          <article className="why-card">
            <span className="card-number">03</span>

            <div className="card-icon">
              ♡
            </div>

            <h3>Exceptional Service</h3>

            <p>
              From the moment you arrive, our goal is to make you
              feel welcome and well taken care of.
            </p>
          </article>

        </div>
      </section>


      {/* About Us */}
      <section className="about-section">

        <div className="about-image">
          <img
            src={food}
            alt="TableMannas restaurant"
          />
        </div>

        <div className="about-content">

          <span className="section-label">
            About Us
          </span>

          <h2>
            A place for
            <br />
            great food & good moments.
          </h2>

          <p>
            Welcome to The Mix, where great food, quality
            ingredients, and a welcoming atmosphere come together.
          </p>

          <p>
            The Mix & Lounge is a vibrant dining and entertainment destination located on UNIOSUN School Road, Osogbo, Osun State, Nigeria. We bring people together through delicious meals, refreshing drinks, exceptional service, and unforgettable experiences.

From mouthwatering local and continental dishes to grills, shawarma, cocktails, and exciting lounge experiences, we offer something for everyone. Whether you're looking for a casual meal, a fun night out with friends, a family gathering, or a special celebration, Table Mannas is the perfect place to eat, relax, connect, and make lasting memories.

At The Mix, we are passionate about great food, quality service, and creating memorable moments for every guest. We also offer convenient food delivery, bringing your favourite meals straight to your doorstep.

The Mix Restaurant & Lounge 
Grab life by the taste....
          </p>

          <a href="#about" className="about-button">
            Discover More
          </a>

        </div>

      </section>
	  </section>
    </>
  );
}

export default About;
