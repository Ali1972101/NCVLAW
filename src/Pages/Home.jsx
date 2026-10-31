import React, { useState, useEffect } from "react";
import Navbar from "../assets/Navbar/Navbar";
import community from "../assets/Community.png";
import service from "../assets/service.png";
import time from "../assets/Time.png";
import solution from "../assets/Solution.png";
import "./Home.css";
import Services from "./Components/Service";
import { Link } from "react-router-dom";
import teamPhoto from "../assets/about.jpg";
import Footer from "./Components/Footer";
import { useNavigate } from "react-router-dom";

const slides = [
  { src: community, word: "Community" },
  { src: solution, word: "A Solution" },
  { src: service, word: "Full service" },
  { src: time, word: "Your time" },
];

const Home = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      4000,
    );
    return () => clearInterval(id);
  }, []);

  const current = slides[index];

  return (
    <div>
      <Navbar />

      <section className="hero">
        <div className="hero__text">
          <h1 className="hero__title">
            Because
            <span key={current.word} className="hero__word">
              {current.word}
            </span>
            Matters.
          </h1>

          <p className="hero__sub">
            Whatever your legal issue, we're here for you. It's the neighbourly
            thing to do.
          </p>

          <div className="hero__buttons">
            <button onClick={()=> navigate ("/Team")} className="btn btn--solid">Find a Lawyer</button>
            <button onClick={()=> navigate ("/Servicepage")} className="btn btn--outline">Our Services</button>
          </div>
        </div>

        <div className="hero__image">
          <img
            key={current.src}
            className="hero__img"
            src={current.src}
            alt={current.word}
          />
        </div>
      </section>

      <section style={{ textAlign: "center", padding: "2px", fontSize: "20px", backgroundColor: " #4f8f1f", color: "white" }}>
        <p >
          We offer a full range of legal services to meet your needs. With
          flexibility, prompt communication, and a local touch, we’re here for
          you.
        </p>
      </section>
      <Services />
      <section className="about">
      <div className="about__image">
        <img src={teamPhoto} alt="The NCV Law team" />
      </div>

      <div className="about__text">
        <h2 className="about__title">About NCV Law</h2>

        <p className="about__body">
          NCV Law has proudly served our community for many years, providing
          trusted, professional legal services to individuals and businesses.
          Our lawyers stay current with changes in the law to deliver clear,
          reliable, and up-to-date advice. We understand legal matters can be
          complex and stressful, and we are committed to guiding our clients
          with clarity, professionalism, and an approachable, supportive
          manner. We are here to help.
        </p>

        <Link to="/About" className="about__btn">
          Learn More
        </Link>
         </div>
    </section>
    <Footer />
    </div>

  );
};

export default Home;
