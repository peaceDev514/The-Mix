import "./About.css";
import aboutImg from "./assets/mix1.jpg";

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
            At The Mix, we bring together quality ingredients,
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
            src={aboutImg}
            alt="The Mix restaurant"
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
            Welcome to The Mix

The Mix is one of Osogbo’s vibrant destinations for food, drinks, games, music, and unforgettable entertainment. Located on UNIOSUN School Road, Oke-Baale, we bring together great food, refreshing drinks, exciting games, and a lively atmosphere all under one roof.

Whether you’re looking for a relaxed place to hang out with friends, enjoy a delicious meal, sip on your favourite drink, play games, or experience the nightlife, The Mix has something for everyone.

From our carefully prepared meals and grills to cocktails, mocktails, milkshakes, shisha, and an exciting selection of games including snooker, table tennis, and air hockey, every visit is designed to give you a memorable experience.

At The Mix, we believe that good food tastes better, great drinks flow better, and every moment is better when shared. We also host exciting events, campus experiences, parties, and entertainment nights that keep Osogbo buzzing.

Come for the food. Stay for the vibes. Leave with memories.

The Mix — Where Food, Fun & Vibes Come Together.
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
