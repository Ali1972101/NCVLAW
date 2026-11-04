import { useState } from "react";
import Navbar from "../assets/Navbar/Navbar";
import Footer from "./Components/Footer";
import "./Family.css";
import bannerImg from "../assets/Familyimage.png";
import approachImg from "../assets/Lawyerphoto.jpg";
import person1 from "../assets/Person1.jpg";
import person2 from "../assets/Person2.jpg";
import person4 from "../assets/Person4.jpg";
import person5 from "../assets/person5.jpg";
import person6 from "../assets/Person6.jpg";
import person7 from "../assets/Person7.jpg";
import person8 from "../assets/Person8.jpg";
import person9 from "../assets/Person9.jpg";
import person12 from "../assets/Person12.jpg";
import person13 from "../assets/Person13.jpg";
import bgImage from "../assets/Contactimage.png";
import { sendInquiry } from "../SendInquiry";

const title = "Family Law";

const items = [
  "Family Law Litigation",
  "Cohabitation and Marriage Contracts",
  "Parenting Issues",
  "Family Law Mediation",
  "Child Support",
  "Divorce Proceedings",
  "Collaborative Family Law",
  "Spousal Support",
  "Separation Agreements",
  "Family Law Dispute Resolution",
  "Parenting Plans",
  "Succession Planning",
  "Dividing Farm and Business Assets",
];

const areas = ["Business Law", "Family Law", "Real Estate Law", "Wills & Estates"];

const lawyers = [
  { name: "Shazda Ledford",    phone: "843-996-0259", email: "ledford@ncvlaw.org",  photo: person8 },
  { name: "Alicia Johnson",    phone: "334-233-0187", email: "alicia@ncvlaw.org",   photo: person5 },
  { name: "Johnson Hunter",    phone: "337-414-0649", email: "johnson@ncvlaw.org",  photo: person13 },
  { name: "James Cockburn",    phone: "469-662-6397", email: "james@ncvlaw.org",    photo: person7 },
  { name: "Franklin Brown",    phone: "252-412-8224", email: "franklin@ncvlaw.org", photo: person12 },
  { name: "Lisa Eric",         phone: "803-460-0880", email: "lisa@ncvlaw.org",     photo: person9 },
  { name: "Raj Graham",        phone: "984-374-3329", email: "raj@ncvlaw.org",      photo: person2 },
  { name: "Michelle Cockburn", phone: "864-838-2560", email: "michelle@ncvlaw.org", photo: person6 },
  { name: "David Wilson",      phone: "901-208-9006", email: "david@ncvlaw.org",    photo: person4 },
  { name: "Melinda Armstrong", phone: "347-356-0987", email: "melinda@ncvlaw.org",  photo: person1 },
];

// small scales-of-justice icon beside each item
const ScalesIcon = () => (
  <svg className="svc-item__icon" viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 8v44M20 52h24" />
    <path d="M12 20h40" />
    <path d="M12 20l-8 16a8 8 0 0 0 16 0zM52 20l-8 16a8 8 0 0 0 16 0z" />
  </svg>
);

const Family = () => {
  // all form state lives INSIDE the component
  const [selected, setSelected] = useState(["Family Law"]); // pre-ticked for this page
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
              <ScalesIcon />
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
            The Family Law Team at NCV Law provides experienced, compassionate
            guidance through all aspects of family law, including separation,
            divorce, parenting and decision-making responsibility for children,
            child support, spousal support, and property division. We
            understand that family law matters are often emotionally and
            financially challenging, which is why we take the time to
            understand each client’s unique circumstances and goals.
          </p>

          <p className="approach__body">
            Whenever possible, we help clients achieve practical, cost-effective
            resolutions through negotiation, mediation, and collaborative law.
            When litigation is necessary, our lawyers are skilled advocates
            with extensive experience handling complex and high-conflict family
            law disputes at all levels of court.
          </p>

          <p className="approach__body">
            Our team-based approach ensures clients benefit from the collective
            knowledge of our lawyers, dedicated support staff, and trusted
            professional networks. We also have extensive experience advising
            high-net-worth individuals, business owners, and farmers on the
            unique legal and financial issues that can arise following a
            separation.
          </p>

          <p className="approach__body">
            Whatever challenges your family is facing, you can count on the
            Family Law Team at NCV Law to provide trusted advice, strategic
            advocacy, and unwavering support every step of the way.
          </p>
        </div>

        <div className="approach__image">
          <img src={approachImg} alt="The NCV Law Family Law team" />
        </div>
      </section>

      {/* lawyers */}
      <section className="lawyers">
        <h2 className="lawyers__title">Family Law Lawyers</h2>
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

export default Family;