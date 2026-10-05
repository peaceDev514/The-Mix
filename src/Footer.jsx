import "./Footer.css";

function Footer() {
  const whatsappNumber = "2349011445400";

  const whatsappMessage = encodeURIComponent(
    "Hello TableMannas, I would like to make an enquiry."
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* TOP */}
        <div className="footer-top">

          <div className="footer-brand">
            <span className="footer-label">
              Welcome To
            </span>

            <h2>The Mix</h2>

            <p>
              Great food, rich flavours and memorable
              moments. We're here to make every visit
              worth remembering.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-whatsapp"
            >
              Chat With Us On WhatsApp
              <span>↗</span>
            </a>
          </div>


          {/* NAVIGATION */}
          <div className="footer-column">
            <h3>Explore</h3>

            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#menu">Our Menu</a>
            <a href="#gallery">Gallery</a>
            <a href="#reservation">Reservation</a>
            <a href="#contact">Contact</a>
          </div>


          {/* CONTACT */}
          <div className="footer-column">
            <h3>Contact</h3>

            <p>
              Head Office: Table Mannas Building, Uniosun School Road, Off Shaha Market, Okebaale, Osogbo,
              <br />
              Osun State, Nigeria
            </p>

            <a href="tel:+2349011445400">
              +234 901 144 5400
            </a>

            <a href="mailto:tablemannas2022@gmail.com">
              tablemannas2022@gmail.com
            </a>
          </div>


          {/* OPENING HOURS */}
          <div className="footer-column">
            <h3>Opening Hours</h3>

            <div className="footer-hours">
              <span>Monday — Friday</span>
              <strong>8:00 AM — 3:00 AM</strong>
            </div>

          </div>

        </div>


        {/* MIDDLE LINE */}
        <div className="footer-divider"></div>


        {/* BOTTOM */}
        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} TableMannas.
            All rights reserved.
          </p>

          <div className="footer-socials">

            <a
              href="#"
              aria-label="Instagram"
            >
              Instagram
            </a>

            <a
              href="#"
              aria-label="Facebook"
            >
              Facebook
            </a>

            <a
              href="#"
              aria-label="TikTok"
            >
              TikTok
            </a>

          </div>

          <a
            href="#home"
            className="back-to-top"
          >
            Back To Top ↑
          </a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
