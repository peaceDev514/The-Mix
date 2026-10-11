
import { useState } from "react";
import "./Contact.css";

function Contact() {
  const whatsappNumber = "2349011445400";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `
Hello TableMannas,

My name is ${formData.name}.
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
    `;

    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Section Heading */}
        <div className="contact-heading">
          <span className="contact-subtitle">GET IN TOUCH</span>

          <h2>
            Let's Start a <span>Conversation</span>
          </h2>

          <p>
            Have a question, reservation request, or special enquiry?
            We'd love to hear from you.
          </p>
        </div>

        {/* Contact Content */}
        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info">
            <h3>Contact Information</h3>

            <p className="contact-intro">
              Reach out to us for reservations, enquiries, or more
              information about our services.
            </p>

            <div className="contact-detail">
              <div className="detail-icon">
                <span className="material-icons">location_on</span>
              </div>

              <div>
                <h4 className="detail-title">Our Location</h4>
                <p className="detail-text">
                  Table Mannas Building
                </p>
              </div>
            </div>

            <div className="contact-detail">
              <div className="detail-icon">
                <span className="material-icons">phone</span>
              </div>

              <div>
                <h4 className="detail-title">Phone Number</h4>
                <p className="detail-number">
                  +234 901 144 5400
                </p>
              </div>
            </div>

            <div className="contact-detail">
              <div className="detail-icon">
                <span className="material-icons">email</span>
              </div>

              <div>
                <h4 className="detail-title">Email Address</h4>
                <p className="detail-text">
                  Contact us for enquiries
                </p>
              </div>
            </div>

            <button
              type="button"
              className="whatsapp-button"
              onClick={openWhatsApp}
            >
              <span className="material-icons">chat</span>
              Chat With Us on WhatsApp
            </button>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h3>Send Us a Message</h3>

            <p className="form-intro">
              Fill in the details below and we'll get back to you.
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Full Name</label>

                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email Address</label>

                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-phone">Phone Number</label>

                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Your Message</label>

                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="How can we help you?"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="submit-button">
                Send Message
                <span className="material-icons">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

