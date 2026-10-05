import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const whatsappNumber = "2349011445400";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappMessage = `
Hello TableMannas,

I would like to make an enquiry.

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

Message:
${formData.message}
    `.trim();

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappLink, "_blank");
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello The Mix, I would like to make an enquiry."
    );

    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank"
    );
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        {/* CONTACT INFORMATION */}
        <div className="contact-info">

          <span className="contact-label">
            Get In Touch
          </span>

          <h2>
            We'd Love
            <br />
            <span>To Hear From You.</span>
          </h2>

          <p className="contact-intro">
            Whether you're planning a visit, making an enquiry,
            or simply want to know more about us, we're always
            happy to hear from you.
          </p>

          <div className="contact-details">

            <div className="contact-detail">
              <span className="detail-number">01</span>

              <div>
                <span className="detail-title">
                  Visit Us
                </span>

                <p>
                  Head Office: Table Mannas Building, Uniosun School Road, Off Shaha Market, Okebaale, Osogbo. 
                  <br />
                  Osun State, Nigeria
                </p>
              </div>
            </div>

            <div className="contact-detail">
              <span className="detail-number">02</span>

              <div>
                <span className="detail-title">
                  Call Us
                </span>

                <a href="tel:+2349011445400">
                  +234 901 144 5400
                </a>
              </div>
            </div>

            <div className="contact-detail">
              <span className="detail-number">03</span>

              <div>
                <span className="detail-title">
                  Opening Hours
                </span>

                <p>
                  Monday — Friday
                  <br />
                  8:00 AM — 3:00 AM
                </p>

              </div>
            </div>

          </div>

          {/* WHATSAPP BUTTON */}
          <button
            type="button"
            className="whatsapp-button"
            onClick={openWhatsApp}
          >
            <span className="whatsapp-icon">
              ↗
            </span>

            <span>
              Chat With Us On WhatsApp
            </span>
          </button>

        </div>

        {/* CONTACT FORM */}
        <div className="contact-form-wrapper">

          <div className="form-heading">
            <span>Send A Message</span>

            <h3>
              Let's Start
              <br />
              A Conversation.
            </h3>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="name">
                  Your Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                Your Message
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="contact-submit"
            >
              <span>Send Message</span>
              <span>↗</span>
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default Contact;
