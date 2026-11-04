import { useState } from "react";
import Navbar from "../assets/Navbar/Navbar";
import Footer from "./Components/Footer";
import "./Realestate.css";
import bannerImg from "../assets/Realestateimage.png"; // house photo
import approachImg from "../assets/womentalking.png";
import LandTransferModal from "./LandTransferModal";
import person1 from "../assets/Person1.jpg";
import person2 from "../assets/Person2.jpg";
import person3 from "../assets/Person3.jpg";
import person4 from "../assets/Person4.jpg";
import person6 from "../assets/Person6.jpg";
import person8 from "../assets/Person8.jpg";
import person10 from "../assets/Person10.jpg";
import person11 from "../assets/Person11.jpg";
import person14 from "../assets/Person14.jpg";
import person15 from "../assets/Person15.jpg";
import bgImage from "../assets/Contactimage.png";
import { sendInquiry } from "../SendInquiry";

const title = "Real Estate Law";

const items = [
  "Buying or Selling a Home",
  "Commercial Property Matters",
  "Title Search",
  "Title Insurance",
  "Mortgage Financing",
  "Purchasing Agreements",
  "Sale Agreements",
  "Lease & Rental Agreements",
];

const areas = ["Business Law", "Family Law", "Real Estate Law", "Wills & Estates"];

const lawyers = [
  { name: "Shazda Ledford",    phone: "843-996-0259", email: "ledford@ncvlaw.org",  photo: person8 },
  { name: "Melinda Armstrong", phone: "347-356-0987", email: "melinda@ncvlaw.org",  photo: person1 },
  { name: "Timothy Graham",    phone: "312-206-2190", email: "timothy@ncvlaw.org",  photo: person10 },
  { name: "Sarah Bhangui",     phone: "786-908-4180", email: "sarah@ncvlaw.org",    photo: person3 },
  { name: "Robert Taylor",     phone: "337-414-0649", email: "robert@ncvlaw.org",   photo: person14 },
  { name: "David Wilson",      phone: "901-208-9006", email: "david@ncvlaw.org",    photo: person4 },
  { name: "Fiona Mitchell",    phone: "803-460-0880", email: "fiona@ncvlaw.org",    photo: person15 },
  { name: "Raj Graham",        phone: "984-374-3329", email: "raj@ncvlaw.org",      photo: person2 },
  { name: "Trenton Williams",  phone: "203-510-4890", email: "trenton@ncvlaw.org",  photo: person11 },
  { name: "Michelle Cockburn", phone: "864-838-2560", email: "michelle@ncvlaw.org", photo: person6 },
];

const HouseIcon = () => (
  <svg className="svc-item__icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v11h14V10" />
    <path d="M10 21v-6h4v6" />
    <path d="M16 5V3h2v4" />
  </svg>
);

const Realestate = () => {
  // all state lives INSIDE the component
  const [showCalc, setShowCalc] = useState(false);
  const [selected, setSelected] = useState(["Real Estate Law"]); // pre-ticked for this page
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | error

  const toggleArea = (area) => {
    setError("");
    setSelected((previous) =>
      previous.includes(area)
        ? previous.filter((selectedArea) => selectedArea !== area)
        : [...previous, area],
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // checkboxes can't use "required" as a group, so check by hand
    if (selected.length === 0) {
      setError("Please choose at least one practice area.");
      return;
    }

    const data = Object.fromEntries(new FormData(event.target));
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
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="banner__stripe" />
        <div className="banner__panel">
          <h1 className="banner__title">{title}</h1>
        </div>
      </section>

      {/* list of services */}
      <section className="svc-list">
        <ul className="svc-list__box">
          {items.map((item) => (
            <li className="svc-item" key={item}>
              <HouseIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* approach */}
      <section className="approach">
        <div className="approach__text">
          <h2 className="approach__title">The NCV Law Approach</h2>

          <p className="approach__body">
            The purchase or sale of a property is one of the most significant
            investments you’ll make. NCV Law’s Real Estate team provides expert
            guidance for residential, recreational, investment, and commercial
            properties. Our team assists clients at every stage from reviewing
            agreements of purchase and sale, conducting title and compliance
            searches, to preparing deeds, mortgages, and closing documents.
          </p>

          <p className="approach__body approach__body--second">
            With personalized advice and careful attention to detail, we help
            both buyers and sellers navigate challenges, make informed
            decisions, and achieve practical, successful outcomes. We provide
            essential information and resources to ensure a smooth transaction
            and protect your legal and financial interests.
          </p>

          <button
            type="button"
            className="approach__btn"
            onClick={() => setShowCalc(true)}
          >
            Land Transfer Tax Calculator
          </button>
        </div>

        <div className="approach__image">
          <img src={approachImg} alt="A lawyer meeting with a client" />
        </div>
      </section>

      {/* the calculator pop-up */}
      {showCalc && <LandTransferModal onClose={() => setShowCalc(false)} />}

      {/* lawyers */}
      <section className="lawyers">
        <h2 className="lawyers__title">Real Estate Law Lawyers</h2>
        <p className="lawyers__sub">
          Our team is dedicated to providing tailored solutions for every legal
          challenge, collaborating across specialties to offer you reliable,
          comprehensive legal support.
        </p>

        <div className="lawyers__grid">
          {lawyers.map((p) => (
            <article className="lawyer" key={p.email}>
              <div className="lawyer__photo">
                <img src={p.photo} alt={p.name} />
                <span className="lawyer__name">{p.name}</span>
              </div>

              <div className="lawyer__info">
                <a href={`tel:${p.phone.replace(/[^\d+]/g, "")}`}>{p.phone}</a>
                <a href={`mailto:${p.email}`}>{p.email}</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* get in touch form */}
      <section
        className="gt"
        style={{ backgroundImage: `url(${bgImage})`, marginTop: "10px" }}
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
                  <span>First Name <i>*</i></span>
                  <input type="text" name="firstName" required />
                </label>

                <label className="gt__field">
                  <span>Last Name <i>*</i></span>
                  <input type="text" name="lastName" required />
                </label>

                <label className="gt__field">
                  <span>Email <i>*</i></span>
                  <input type="email" name="email" required />
                </label>

                <label className="gt__field">
                  <span>Phone <i>*</i></span>
                  <input type="tel" name="phone" required />
                </label>

                <fieldset className="gt__areas">
                  <legend>Practice Areas <i>*</i></legend>
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
                  <span>Preferred Office <i>*</i></span>
                  <select name="office" required>
                    <option>Dubai</option>
                    <option>Canada</option>

                  </select>
                </label>

                <label className="gt__field gt__field--full">
                  <span>How did you hear about us? <i>*</i></span>
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

      <Footer />
    </div>
  );
};

export default Realestate; 