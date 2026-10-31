import React from "react";
import Navbar from "../assets/Navbar/Navbar";
import "./Servicepage.css";
import bannerImage from "../assets/Services-image.png";
import business from "../assets/business.png";
import family from "../assets/family.png";
import realestate from "../assets/realestate.png";
import wills from "../assets/wills.png";
import { Link } from "react-router-dom";
import Footer from "./Components/Footer";
import teamImg from "../assets/about.jpg";




const services = [
  { title: "Business Law", bg: business, icon: "document" , path: "/business"    },
  { title: "Family Law", bg: family, icon: "scales", path: "/Family" },
  { title: "Real Estate Law", bg: realestate, icon: "house", path: "/Realestate" },
  { title: "Wills & Estates", bg: wills, icon: "pen", path: "/Wills" },
];

const icons = {
  document: (
    <>
      <path d="M18 8h22l10 10v38H18z" />
      <path d="M40 8v10h10" />
      <path d="M25 28h18M25 35h18M25 42h18M25 49h12" />
    </>
  ),
  scales: (
    <>
      <path d="M32 8v44M20 52h24" />
      <path d="M12 20h40" />
      <path d="M12 20l-8 16a8 8 0 0 0 16 0zM52 20l-8 16a8 8 0 0 0 16 0z" />
    </>
  ),
  house: (
    <>
      <path d="M8 32L32 10l24 22" />
      <path d="M14 28v26h36V28" />
      <path d="M27 54V38h10v16" />
    </>
  ),
  pen: (
    <>
      <path d="M10 14h38v36H10z" />
      <path d="M18 24h22M18 31h22M18 38h12" />
      <path d="M56 22L36 46l-2 8 8-3 20-24z" />
    </>
  ),
};

const Servicespage = () => {
  return (
    <div>
      <Navbar />

      <section  className="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className="banner__stripe" />
        <div className="banner__panel">
          <h1 className="banner__title">Our Services</h1>
        </div>
      </section>

      <section className="services">
        <h2 className="services__title">Our Services</h2>
        <p className="services__sub">
          With our team's extensive knowledge across all these services, we can
          work together to ensure you get what you need.
        </p>

        <div className="services__grid">
          {services.map((s) => (
             <Link
                        key={s.title}
                        to={s.path}
                        className="service-card"
                        
                      >
                        <svg
                          className="service-card__icon"
                          viewBox="0 0 64 64"
                          aria-hidden="true"
                        >
                          {icons[s.icon]}
                        </svg>
                        <span className="service-card__label">{s.title}</span>
                      </Link>
          ))}
        </div>
      </section>
       <section className="team">
      <div className="team__text">
        <h2 className="team__title">Our Team</h2>

        <p className="team__body">
          We are neighbours who care about our community and are committed to
          looking after you, with the full support of our team.
        </p>

        <p className="team__body">
          We will connect you with the right lawyer for your situation, so you
          can feel confident and at ease every step of the way.
        </p>

        <Link to="/Team" className="team__btn">
          Meet the Team
        </Link>
      </div>

      <div className="team__image">
        <img src={teamImg} alt="The NCV Law team" />
      </div>
    </section>
    <Footer />

    </div>
  );
};

export default Servicespage;
