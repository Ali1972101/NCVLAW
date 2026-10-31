import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../assets/Navbar/Navbar";
import Footer from "./Components/Footer";
import contactImage from "../assets/Contactimage.png"; // banner photo
import buildingImg from "../assets/Contactimage.png";  // building photo
import ContactModal from "./ContactModal";
import lawyerImage from "../assets/Imagecall.png"; // banner photo
import "./Contact.css";

const contact = {
  name: "Guelph Office",
  address1: "245 Hanlon Creek Boulevard, Unit 102",
  address2: "Guelph, ON N1C 0A1",
  phone: "519 837 2100",
  tollFree: "800 746 0685",
  fax: "519 837 1617",
  email: "info@ncvlaw.org",
};

// The map reads this address
const mapQuery = `${contact.address1}, ${contact.address2}`;

const Contact = () => {
  const [showForm, setShowForm] = useState(false); // is the pop-up open?

  return (
    <div>
      <Navbar />

      <section
        className="banner banner--contact"
        style={{ backgroundImage: `url(${contactImage})` }}
      >
        <div className="banner__stripe" />
        <div className="banner__panel">
          <h1 className="banner__title">Contact Us</h1>
        </div>
      </section>

      <section className="office">
        <div className="office__info">
          <h2 className="office__title">{contact.name}</h2>

          <p className="office__address">
            {contact.address1}
            <br />
            {contact.address2}
          </p>

          <div className="office__contact">
            <p>
              Phone:{" "}
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                {contact.phone}
              </a>
            </p>
            <p>Fax: {contact.fax}</p>
            <p>
              Toll Free:{" "}
              <a href={`tel:${contact.tollFree.replace(/\s/g, "")}`}>
                {contact.tollFree}
              </a>
            </p>
            <p>
              Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>

          <p className="office__text">
            We acknowledge that SV Law’s offices are situated on treaty land
            that is steeped in rich indigenous history. These treaty lands have
            been and continue to be home to many First Nations, Inuit and Métis
            Peoples.
          </p>

          <p className="office__text">
            We acknowledge the Mississaugas of the Credit First Nation of the
            Anishinaabek Peoples on whose treaty lands and territory we are
            situated and we recognize our responsibility for the stewardship of
            the land on which we live and work.
          </p>

          {/* opens the pop-up */}
          <button
            type="button"
            className="office__btn"
            onClick={() => setShowForm(true)}
          >
            Get In Touch
          </button>
        </div>

        <div className="office__photo">
          <img src={buildingImg} alt={`${contact.name} building`} />
        </div>

        <div className="office__map">
          <iframe
            title={`Map of ${contact.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      <section
  className="findbanner"
  style={{ backgroundImage: `url(${lawyerImage})` }}
>
  {/* light green diagonal stripe */}
  <div className="findbanner__stripe" />

  {/* dark green panel with the text */}
  <div className="findbanner__panel">
    <h1 className="findbanner__title">Find a Lawyer</h1>
    <p className="findbanner__text">
      Get in touch with our office and we’ll connect you with the lawyer best
      suited to your needs. Our team is here to provide clarity, answer your
      questions, and help you move forward with confidence.
    </p>
    <Link to="/Team" className="findbanner__btn">
      Our Team
    </Link>
  </div>
</section>

      {/* the pop-up form, shown only when showForm is true */}
      {showForm && <ContactModal onClose={() => setShowForm(false)} />}



      <Footer />
    </div>
  );
};

export default Contact;