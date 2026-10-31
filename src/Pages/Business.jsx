import React, { useState } from "react";
import Navbar from "../assets/Navbar/Navbar";
import Footer from "./Components/Footer";
import "./Business.css";
import bannerImg from "../assets/Businessimage.png";
import approachImg from "../assets/womenlaptop.png";
import person1 from "../assets/Person1.jpg";
import person2 from "../assets/Person2.jpg";
import person3 from "../assets/Person3.jpg";
import person4 from "../assets/Person4.jpg";
import person5 from "../assets/Person5.jpg";
import person7 from "../assets/Person7.jpg";
import person9 from "../assets/Person9.jpg";
import person10 from "../assets/Person10.jpg";
import person11 from "../assets/Person11.jpg";
import person12 from "../assets/Person12.jpg";
import bgImage from "../assets/Contactimage.png";

const title = "Business Law";

const items = [
  "Starting a Business or Not-for-Profit",
  "Corporate Maintenance & Reorganizations",
  "Buying or Selling a Business",
  "Commercial Contracts",
  "Intellectual Property",
  "Financing & Secured Transactions",
  "Commercial Leasing",
  "Shareholder & Partnership Agreements",
];

const DocIcon = () => (
  <svg className="svc-item__icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 2h9l4 4v16H6z" />
    <path d="M15 2v4h4" />
    <path d="M9 11h7M9 14h7M9 17h5" />
  </svg>
);

const lawyers = [
  {
    name: "Melinda Armstrong",
    phone: "347-356-0987",
    email: "melinda@ncvlaw.org",
    photo: person1,
  },
  {
    name: "Raj Graham",
    phone: "984-374-3329",
    email: "raj@ncvlaw.org",
    photo: person2,
  },
  {
    name: "Sarah Bhangui",
    phone: "786-908-4180",
    email: "sarah@ncvlaw.org",
    photo: person3,
  },
  {
    name: "David Wilson",
    phone: "901-208-9006",
    email: "david@ncvlaw.org",
    photo: person4,
  },
  {
    name: "Alicia Johnson",
    phone: "334-233-0187",
    email: "alicia@ncvlaw.org",
    photo: person5,
  },

  {
    name: "Trenton Williams",
    phone: "203-510-4890",
    email: "trenton@ncvlaw.org",
    photo: person11,
  },
  {
    name: "James Cockburn",
    phone: "469-662-6397",
    email: "james@ncvlaw.org",
    photo: person7,
  },
  {
    name: "Franklin Brown",
    phone: "252-412-8224",
    email: "franklin@ncvlaw.org",
    photo: person12,
  },
  {
    name: "Lisa Eric",
    phone: "803-460-0880",
    email: "lisa@ncvlaw.org",
    photo: person9,
  },
  {
    name: "Timothy Graham",
    phone: "312-206-2190",
    email: "timothy@ncvlaw.org",
    photo: person10,
  },
];

const areas = [
  "Business Law",
  "Family Law",
  "Real Estate Law",
  "Wills & Estates",
];

const Business = () => {
  // form state lives inside the component that shows the form
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const toggleArea = (area) => {
    setError("");
    setSelected((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // checkboxes can't use "required" as a group, so check by hand
    if (selected.length === 0) {
      setError("Please choose at least one practice area.");
      return;
    }

    const data = Object.fromEntries(new FormData(e.target));
    data.practiceAreas = selected;
    console.log(data); // TODO: send this to your email service or backend
    setSent(true);
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
              <DocIcon />
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
            At NCV Law, our Business Law team provides expert, practical
            guidance to help you navigate complex legal challenges and grow your
            business. We support clients at every stage whether starting,
            running, reorganizing, or buying and selling a business while
            offering advice on succession planning and long-term sustainability.
          </p>
        </div>

        <div className="approach__image">
          <img src={approachImg} alt="Our team advising a client" />
        </div>
      </section>

      {/* lawyers */}
      <section className="lawyers">
        <h2 className="lawyers__title">Business Law Lawyers</h2>
        <p className="lawyers__sub">
          We work with you to meet your legal needs and partner with other
          professionals to ensure you have access to expert advice for all your
          business matters.
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
                    <option>Guelph</option>
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

                <button type="submit" className="gt__submit">
                  Submit
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

export default Business;
