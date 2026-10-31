import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../assets/Navbar/Navbar";
import Footer from "./Components/Footer";
import bannerImage from "../assets/ncvoffice.png";
import officeImage from "../assets/ncvreception.png";
import Aboutimage from "../assets/about.jpg"; // check the exact upper/lower case of this file name
import "./About.css";

const events = [
  {
    year: "2024",
    title: "Opened our second office",
    text: "NCV Law welcomed new clients and grew the team to serve more of the community.",
  },
  {
    year: "2021",
    title: "Added Wills & Estates",
    text: "We expanded our services to help families plan ahead with confidence.",
  },
  {
    year: "2018",
    title: "Real Estate team joins",
    text: "Our real estate practice grew to handle residential and commercial matters.",
  },
  {
    year: "2015",
    title: "Business Law practice launched",
    text: "We began supporting local businesses with contracts, corporate and growth advice.",
  },
  {
    year: "2012",
    title: "NCV Law founded",
    text: "Our firm opened its doors with a simple goal: excellence in our community.",
  },
];

const About = () => {
  const wrapRef = useRef(null);
  const cardRefs = useRef([]);
  const [markerY, setMarkerY] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      const rect = wrap.getBoundingClientRect();
      const y = Math.min(
        Math.max(window.innerHeight / 2 - rect.top, 0),
        rect.height,
      );
      setMarkerY(y);

      let closest = 0;
      let best = Infinity;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const mid = card.offsetTop + card.offsetHeight / 2;
        const distance = Math.abs(mid - y);
        if (distance < best) {
          best = distance;
          closest = index;
        }
      });
      setActive(closest);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div>
      <Navbar />

      {/* banner */}
      <section
        className="aboutbanner"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="aboutbanner__stripe" />
        <div className="aboutbanner__panel">
          <h1 className="aboutbanner__title">Get to Know Us</h1>
        </div>
      </section>

      {/* text + photo */}
      <section className="aboutinfo">
        <div className="aboutinfo__text">
          <h2 className="aboutinfo__title">Experience You Can Rely On</h2>
          <p className="aboutinfo__body">
            NCV Law provides trusted, professional legal services to residents
            and businesses in our community. We offer clear, practical guidance
            to help you confidently navigate complex legal matters. Every matter
            is handled in an approachable and supportive way, so you feel
            informed, understood, and supported every step of the way.
          </p>
        </div>

        <div className="aboutinfo__image">
          <img src={officeImage} alt="The NCV Law office" />
        </div>
      </section>

      {/* timeline */}
      <section className="timeline">
        <div className="timeline__wrap" ref={wrapRef}>
          <div className="timeline__line" />
          <div
            className="timeline__marker"
            style={{ transform: `translate(-50%, ${markerY}px)` }}
          />

          {events.map((e, i) => (
            <article
              key={e.year}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`timeline__card ${
                i % 2 === 0 ? "timeline__card--right" : "timeline__card--left"
              } ${active === i ? "timeline__card--active" : ""}`}
            >
              <h3 className="timeline__year">{e.year}</h3>
              <h4 className="timeline__title">{e.title}</h4>
              <p className="timeline__text">{e.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* "Lawyers Who Care" banner (class names changed from "lawyers" to "caring") */}
      <section
        className="caring"
        style={{ backgroundImage: `url(${Aboutimage})` }}
      >
        <div className="caring__stripe" />

        <div className="caring__panel">
          <h2 className="caring__title">Lawyers Who Care</h2>
          <p className="caring__text">
            At NCV Law, we combine up-to-date legal insight with practical
            expertise to deliver results our clients can rely on. We are proud
            to keep building the trust our clients and community place in us
            with every matter we handle.
          </p>
          <Link to="/Team" className="caring__btn">
            Meet The Team
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;