import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../assets/Navbar/Navbar";
import Footer from "./Components/Footer";
import contactImage from "../assets/Contactimage.png";
import buildingImg from "../assets/Contactimage.png";
import lawyerImage from "../assets/Imagecall.png";
import { sendInquiry } from "../sendInquiry";
import "./Contact.css";

const contact = {
  name: "Dubai  Office",
  address1: "5th Floor 3701 Sheikh Zayed Rd, Trade Center First ",
  address2: "Dubai, United Arab Emirates",
  phone: "971 4 378 7219",
  tollFree: "971 4 224 2319",
  fax: "971  985 1012",
  email: "info@ncvlaw.org",
};

const areas = ["Business Law", "Family Law", "Real Estate Law", "Wills & Estates"];

// The map reads this address
const mapQuery = `${contact.address1}, ${contact.address2}`;

const Contact = () => {
  // all form state lives INSIDE the component
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | error

  const toggleArea = (area) => {
    setError("");
    setSelected((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // checkboxes can't use "required" as a group, so check by hand
    if (selected.length === 0) {
      setError("Please choose at least one practice area.");
      return;
    }

    const data = Object.fromEntries(new FormData(e.target));
    if (data._gotcha) return; // a bot filled the hidden trap field

    data.practiceAreas = selected.join(", ");

    setStatus("sending");
    try {
      await sendInquiry(data); // sends it to info@ncvlaw.org
      setSent(true);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

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
        </div>

        <div className="office__photo">
          <img src={buildingImg} alt={`${contact.name} building`} />
        </div>

        {/* <div className="office__map">
          <iframe
            title={`Map of ${contact.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div> */}
      </section>

      {/* get in touch form, built directly into the page */}
      <section
        className="gt"
        style={{ backgroundImage: `url(${contactImage})`, marginTop: "10px" }}
      >
        <div className="gt__overlay" />

        <div className="gt__content">
          <h2 className="gt__title">Get in Touch</h2>
          <p className="gt__intro">
            You can contact our office directly or complete the inquiry form
            below. Thank you for considering NCV Law and we will be in touch
            with you promptly.
          </p>

          <div className="gt__card">
            {sent ? (
              <p className="gt__thanks">
                Thank you! Your message has been sent. We will be in touch soon.
              </p>
            ) : (
              <form className="gt__form" onSubmit={handleSubmit}>
                <label className="gt__field">
                  <span>
                    First Name <i>*</i>
                  </span>
                  <input type="text" name="firstName" required />
                </label>

                <label className="gt__field">
                  <span>
                    Last Name <i>*</i>
                  </span>
                  <input type="text" name="lastName" required />
                </label>

                <label className="gt__field">
                  <span>
                    Email <i>*</i>
                  </span>
                  <input type="email" name="email" required />
                </label>

                <label className="gt__field">
                  <span>
                    Phone <i>*</i>
                  </span>
                  <input type="tel" name="phone" required />
                </label>

                <fieldset className="gt__areas">
                  <legend>
                    Practice Areas <i>*</i>
                  </legend>
                  <div className="gt__checks">
                    {areas.map((area) => (
                      <label className="gt__check" key={area}>
                        <input
                          type="checkbox"
                          checked={selected.includes(area)}
                          onChange={() => toggleArea(area)}
                        />
                        <span>{area}</span>
                      </label>
                    ))}
                  </div>
                  {error && <p className="gt__error">{error}</p>}
                </fieldset>

                <label className="gt__field gt__field--full">
                  <span>Message</span>
                  <textarea name="message" rows="4" />
                </label>

                <label className="gt__field gt__field--full">
                  <span>
                    Preferred Office <i>*</i>
                  </span>
                  <select name="office" required>
                    <option>Dubai</option>
                    <option>Canada</option>

                  </select>
                </label>

                <label className="gt__field gt__field--full">
                  <span>
                    How did you hear about us? <i>*</i>
                  </span>
                  <select name="source" required>
                    <option>Google</option>
                    <option>Social media</option>
                    <option>Referral</option>
                    <option>Other</option>
                  </select>
                </label>

                {/* spam trap: real visitors never see or fill this */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex="-1"
                  autoComplete="off"
                  className="hp"
                />

                {status === "error" && (
                  <p className="gt__error" style={{ gridColumn: "1 / -1" }}>
                    Sorry, something went wrong. Please try again, or email us
                    at info@ncvlaw.org.
                  </p>
                )}

                <button
                  type="submit"
                  className="gt__submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* find a lawyer banner */}
      <section
        className="findbanner"
        style={{ backgroundImage: `url(${lawyerImage})` }}
      >
        <div className="findbanner__stripe" />

        <div className="findbanner__panel">
          <h1 className="findbanner__title">Find a Lawyer</h1>
          <p className="findbanner__text">
            Get in touch with our office and we’ll connect you with the lawyer
            best suited to your needs. Our team is here to provide clarity,
            answer your questions, and help you move forward with confidence.
          </p>
          <Link to="/Team" className="findbanner__btn">
            Our Team
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;