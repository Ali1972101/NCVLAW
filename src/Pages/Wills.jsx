import React, { useState } from "react";
import Navbar from "../assets/Navbar/Navbar";
import Footer from "./Components/Footer";
import "./Wills.css";
import bannerImg from "../assets/willsimage.png";
import approachImg from "../assets/shakinghands.png";
import person6 from "../assets/person6.jpg";
import person7 from "../assets/person7.jpg";
import person8 from "../assets/person8.jpg";
import person9 from "../assets/person9.jpg";
import person10 from "../assets/person10.jpg";
import person11 from "../assets/person11.jpg";
import person12 from "../assets/person12.jpg";
import person13 from "../assets/person13.jpg";
import person14 from "../assets/person14.jpg";
import person15 from "../assets/person15.jpg";
import bgImage from "../assets/Contactimage.png";

const title = "Wills & Estates";

const items = ["Estate Planning", "Estate Administration", "Estate Litigation"];

const areas = ["Business Law", "Family Law", "Real Estate Law", "Wills & Estates"];

const lawyers = [
  { name: "Shazda Ledford",    phone: "843-996-0259", email: "ledford@ncvlaw.org",  photo: person8 },
  { name: "Franklin Brown",    phone: "252-412-8224", email: "franklin@ncvlaw.org", photo: person12 },
  { name: "Lisa Eric",         phone: "803-460-0880", email: "lisa@ncvlaw.org",     photo: person9 },
  { name: "Fiona Mitchell",    phone: "803-460-0880", email: "fiona@ncvlaw.org",    photo: person15 },
  { name: "James Cockburn",    phone: "469-662-6397", email: "james@ncvlaw.org",    photo: person7 },
  { name: "Trenton Williams",  phone: "203-510-4890", email: "trenton@ncvlaw.org",  photo: person11 },
  { name: "Michelle Cockburn", phone: "864-838-2560", email: "michelle@ncvlaw.org", photo: person6 },
  { name: "Robert Taylor",     phone: "337-414-0649", email: "robert@ncvlaw.org",   photo: person14 },
  { name: "Timothy Graham",    phone: "312-206-2190", email: "timothy@ncvlaw.org",  photo: person10 },
  { name: "Johnson Hunter",    phone: "337-414-0649", email: "johnson@ncvlaw.org",  photo: person13 },
];

const DocIcon = () => (
  <svg className="svc-item__icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 3h10l4 4v6" />
    <path d="M5 3v18h8" />
    <path d="M8 9h7M8 13h4" />
    <path d="M21 15l-7 7-3 1 1-3 7-7z" />
  </svg>
);

const Wills = () => {
  // form state lives inside the component that shows the form
  const [selected, setSelected] = useState(["Wills & Estates"]); // pre-ticked for this page
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const toggleArea = (area) => {
    setError("");
    setSelected((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
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
        <ul className="svc-list__box svc-list__box--3">
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
            Planning for your family’s future can feel overwhelming, but NCV
            Law’s Wills and Estates team provides guidance and support every
            step of the way. We offer comprehensive estate planning, including
            wills, trusts, and powers of attorney, as well as estate
            administration, probate services, and estate litigation. Our goal
            is always to provide sensible, thoughtful solutions that help take
            the worry out of estate planning. We work with you to understand
            your needs and provide the right advice to ensure your wishes are
            carried out. When you’re ready, we’re here to help you put a plan
            in place that reflects your wishes and ensures your family and
            estate are cared for the way you intend.
          </p>
        </div>

        <div className="approach__image">
          <img src={approachImg} alt="A client meeting with our lawyer" />
        </div>
      </section>

      {/* lawyers */}
      <section className="lawyers">
        <h2 className="lawyers__title">Wills &amp; Estates Lawyers</h2>
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
                    <option>Guelph</option>
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

                <button type="submit" className="gt__submit">Submit</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Wills;