import React, { useEffect, useState } from "react";
import { sendInquiry } from "../SendInquiry";
import "./ContactModal.css";

const ContactModal = ({ onClose }) => {
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | error

  // Close with the Escape key, and stop the page scrolling behind the form
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));
    if (data._gotcha) return; // a bot filled the hidden trap field

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
    <div className="modal" onClick={onClose}>
      <div
        className="modal__box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close">
          X
        </button>

        <h2 id="modal-title" className="modal__title">Get In Touch</h2>
        <p className="modal__intro">
          You can contact our office directly or complete the inquiry form
          below. Thank you for considering NCV Law and we will be in touch with
          you promptly.
        </p>

        {sent ? (
          <p className="modal__thanks">
            Thank you! Your message has been sent. We will be in touch soon.
          </p>
        ) : (
          <form className="modal__form" onSubmit={handleSubmit}>
            <label className="field field--full">
              <span>Name <i>*</i></span>
              <input type="text" name="name" required />
            </label>

            <label className="field">
              <span>Email <i>*</i></span>
              <input type="email" name="email" required />
            </label>

            <label className="field">
              <span>Phone <i>*</i></span>
              <input type="tel" name="phone" required />
            </label>

            <label className="field field--full">
              <span>Message <i>*</i></span>
              <textarea name="message" rows="4" required />
            </label>

            <label className="field field--full">
              <span>Preferred Office <i>*</i></span>
              <select name="office" required>
                <option>ohio</option>
              </select>
            </label>

            <label className="field field--full">
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
              <p className="modal__error">
                Sorry, something went wrong. Please try again, or email us at
                info@ncvlaw.org.
              </p>
            )}

            <button
              type="submit"
              className="modal__submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;