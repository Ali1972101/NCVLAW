import React, { useState } from "react";
import Navbar from "../assets/Navbar/Navbar";
import Footer from "./Components/Footer";
import teamBanner from "../assets/about.jpg";
import "./Team.css";
import person1 from "../assets/Person1.jpg";
import person2 from "../assets/Person2.jpg";
import person3 from "../assets/Person3.jpg";
import person4 from "../assets/Person4.jpg";
import person5 from "../assets/person5.jpg";
import person6 from "../assets/Person6.jpg";
import person7 from "../assets/Person7.jpg";
import person8 from "../assets/Person8.jpg";
import person9 from "../assets/Person9.jpg";
import person10 from "../assets/Person10.jpg";
import person11 from "../assets/Person11.jpg";
import person12 from "../assets/Person12.jpg";
import person13 from "../assets/Person13.jpg";
import person14 from "../assets/Person14.jpg";
import person15 from "../assets/Person15.jpg";

const team = [
  { name: "Melinda Armstrong", phone: "347-356-0987", email: "melinda@ncvlaw.org", photo: person1 },
  { name: "Raj Graham", phone: "984-374-3329", email: "raj@ncvlaw.org", photo: person2 },
  { name: "Sarah Bhangui", phone: "786-908-4180", email: "sarah@ncvlaw.org", photo: person3 },
  { name: "David Wilson", phone: "901-208-9006", email: "david@ncvlaw.org", photo: person4 },
  { name: "Alicia Johnson", phone: "334-233-0187", email: "alicia@ncvlaw.org", photo: person5 },
  { name: "Michelle Cockburn", phone: "864-838-2560", email: "michelle@ncvlaw.org", photo: person6 },
  { name: "James Cockburn", phone: "469-662-6397", email: "james@ncvlaw.org", photo: person7 },
  { name: "Shazda Ledford", phone: "843-996-0259", email: "ledford@ncvlaw.org", photo: person8 },
  { name: "Lisa Eric", phone: "803-460-0880", email: "lisa@ncvlaw.org", photo: person9 },
  { name: "Timothy Graham", phone: "312-206-2190", email: "timothy@ncvlaw.org", photo: person10 },
  { name: "Trenton Williams", phone: "203-510-4890", email: "trenton@ncvlaw.org", photo: person11 },
  { name: "Franklin Brown", phone: "252-412-8224", email: "franklin@ncvlaw.org", photo: person12 },
  { name: "Johnson Hunter", phone: "337-414-0649", email: "johnson@ncvlaw.org", photo: person13 },
  { name: "Robert Taylor", phone: "337-414-0649", email: "robert@ncvlaw.org", photo: person14 },
  { name: "Fiona Mitchell", phone: "803-460-0880", email: "fiona@ncvlaw.org", photo: person15 },
];

const Team = () => {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = team.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.phone.includes(q),
  );

  return (
    <div>
      <Navbar />

      <section
        className="banner banner--contact"
        style={{ backgroundImage: `url(${teamBanner})` }}
      >
        <div className="banner__stripe" />
        <div className="banner__panel">
          <h1 className="banner__title">Our Team</h1>
        </div>
      </section>

      <section className="team-grid">
        {/* search bar */}
        <div className="team-grid__search">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name"
            aria-label="Search the team"
          />
          <button type="button" aria-label="Search">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="10" cy="10" r="6.5" />
              <path d="M15 15l6 6" />
            </svg>
          </button>
        </div>

        {/* cards */}
        <div className="team-grid__list">
          {results.map((p) => (
            <article className="member" key={p.email}>
              <div className="member__photo">
                <img src={p.photo} alt={p.name} />
                <span className="member__name">{p.name}</span>
              </div>

              <div className="member__info">
                <a href={`tel:${p.phone.replace(/[^\d+]/g, "")}`}>{p.phone}</a>
                <a href={`mailto:${p.email}`}>{p.email}</a>
              </div>
            </article>
          ))}
        </div>

        {results.length === 0 && (
          <p className="team-grid__empty">No one matches your search.</p>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Team;