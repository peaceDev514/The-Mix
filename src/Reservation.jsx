import "./Reservation.css";
import ReservationImg from './assets/reservation.png';

function Reservation() {
  return (
    <section id="reservation" className="reservation" 
	  style={{ background: `url(${ReservationImg})` }}>

      {/* Background Overlay */}
      <div className="reservation-overlay"></div>

      <div className="reservation-content">

        <span className="reservation-label">
          Reservations
        </span>

        <h2>
          Make Your
          <br />
          Reservation
        </h2>

        <p className="reservation-text">
          Join us for an unforgettable dining experience.
          Reserve your table and let us take care of the rest.
        </p>


        {/* Opening Hours */}

        <div className="opening-hours">

          <span className="hours-title">
            Opening Hours
          </span>

          <div className="hours-row">
            <span>Monday — Sunday</span>
            <span>8:00 AM — 3:00 AM</span>
          </div>

        </div>


        {/* Reservation Button */}

        <a href="#contact" className="reservation-button">
          Reserve a Table
        </a>

      </div>

    </section>
  );
}

export default Reservation;
