import React, { useEffect, useState } from "react";
import "./LandTransferModal.css";

/* ---------- Ontario brackets (marginal rates) ---------- */
// residential (1-2 single-family units)
const PROV_RES = [
  { upTo: 55000, rate: 0.005 },
  { upTo: 250000, rate: 0.01 },
  { upTo: 400000, rate: 0.015 },
  { upTo: 2000000, rate: 0.02 },
  { upTo: Infinity, rate: 0.025 },
];
// other / commercial (tops out at 2%)
const PROV_OTHER = [
  { upTo: 55000, rate: 0.005 },
  { upTo: 250000, rate: 0.01 },
  { upTo: 400000, rate: 0.015 },
  { upTo: Infinity, rate: 0.02 },
];
const ONTARIO_REBATE_MAX = 4000;

/* ---------- Ohio conveyance fee ---------- */
// $1 per $1,000 is the state fee; counties add up to $3 per $1,000
const OHIO_STATE_RATE = 1;
const OHIO_RATES = [
  { value: 1, label: "$1 per $1,000 (state fee only)" },
  { value: 2, label: "$2 per $1,000" },
  { value: 3, label: "$3 per $1,000" },
  { value: 4, label: "$4 per $1,000 (state + maximum county fee)" },
];

// adds up the tax bracket by bracket
const taxFor = (price, bands) => {
  let tax = 0;
  let lower = 0;
  for (const { upTo, rate } of bands) {
    if (price > lower) tax += (Math.min(price, upTo) - lower) * rate;
    lower = upTo;
  }
  return tax;
};

const money = (n) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);
const usd = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

/* two-choice selector */
const Segmented = ({ label, value, onChange, options, disabled }) => (
  <div className="ltt__group">
    <span className="ltt__label">{label}</span>
    <div
      className={`ltt__seg ${disabled ? "is-disabled" : ""}`}
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          disabled={disabled}
          aria-checked={value === o.value}
          className={`ltt__segbtn ${value === o.value ? "is-on" : ""}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  </div>
);

const LandTransferModal = ({ onClose }) => {
  const [price, setPrice] = useState("");
  const [type, setType] = useState("residential"); // residential | other
  const [buyer, setBuyer] = useState("first");      // first | repeat
  const [ohio, setOhio] = useState(false);
  const [ohioRate, setOhioRate] = useState(4);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // Escape closes it, and the page behind it stops scrolling
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // any change clears an old result so it never shows stale numbers
  const change = (setter) => (value) => {
    setter(value);
    setResult(null);
  };

  const handlePrice = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    setPrice(digits ? Number(digits).toLocaleString("en-US") : "");
    setError("");
    setResult(null);
  };

  const calculate = () => {
    const amount = Number(price.replace(/\D/g, ""));
    if (!amount) {
      setError("Please enter a purchase price.");
      setResult(null);
      return;
    }
    setError("");

    // ----- Ohio: state fee + county fee -----
    if (ohio) {
      const state = (amount / 1000) * OHIO_STATE_RATE;
      const county = (amount / 1000) * (ohioRate - OHIO_STATE_RATE);
      setResult({ mode: "ohio", state, county, total: state + county });
      return;
    }

    // ----- Ontario land transfer tax -----
    const residential = type === "residential";
    const oltt = taxFor(amount, residential ? PROV_RES : PROV_OTHER);
    const eligible = residential && buyer === "first";
    const oRebate = eligible ? Math.min(oltt, ONTARIO_REBATE_MAX) : 0;

    setResult({
      mode: "ontario",
      oltt,
      oRebate,
      total: oltt - oRebate,
      rebateBlocked: !residential && buyer === "first",
    });
  };

  return (
    <div className="ltt" onClick={onClose}>
      <div
        className="ltt__box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ltt-title"
        onClick={(e) => e.stopPropagation()} // clicks inside don't close it
      >
        <button className="ltt__close" onClick={onClose} aria-label="Close">
          X
        </button>

        <h2 id="ltt-title" className="ltt__title">Land Transfer Tax Calculator</h2>

        <div className="ltt__card">
          {/* purchase price */}
          <div className="ltt__group">
            <label className="ltt__label" htmlFor="ltt-price">Purchase Price</label>
            <div className="ltt__price">
              <span>$</span>
              <input
                id="ltt-price"
                type="text"
                inputMode="numeric"
                placeholder="xxx,xxx"
                value={price}
                onChange={handlePrice}
              />
            </div>
            {error && <p className="ltt__error">{error}</p>}
          </div>

          {/* property type and buyer status (not used for Ohio) */}
          <div className="ltt__row">
            <Segmented
              label="Property Type"
              value={type}
              onChange={change(setType)}
              disabled={ohio}
              options={[
                { value: "residential", label: "Residential (1-2 Units)" },
                { value: "other", label: "Other / Commercial" },
              ]}
            />
            <Segmented
              label="Buyer Status"
              value={buyer}
              onChange={change(setBuyer)}
              disabled={ohio}
              options={[
                { value: "first", label: "First Time Buyer" },
                { value: "repeat", label: "Repeat Buyer" },
              ]}
            />
          </div>

          {/* Ohio switch */}
          <div className="ltt__toggle">
            <div>
              <div className="ltt__toggle-title">Property is in Ohio</div>
              <div className="ltt__toggle-sub">
                {ohio
                  ? "Applies Ohio's real property conveyance fee"
                  : "Off: Ontario land transfer tax applies"}
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={ohio}
              aria-label="Property is in Ohio"
              className={`ltt__switch ${ohio ? "is-on" : ""}`}
              onClick={() => change(setOhio)(!ohio)}
            >
              <span />
            </button>
          </div>

          {/* county rate, shown only for Ohio */}
          {ohio && (
            <div className="ltt__group">
              <label className="ltt__label" htmlFor="ltt-rate">
                Total conveyance fee in your county
              </label>
              <select
                id="ltt-rate"
                className="ltt__select"
                value={ohioRate}
                onChange={(e) => change(setOhioRate)(Number(e.target.value))}
              >
                {OHIO_RATES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
              <p className="ltt__note">
                The state charges $1 per $1,000 and each county adds its own
                amount, up to $3 more. Ask us if you are not sure of your
                county's rate.
              </p>
            </div>
          )}

          <button type="button" className="ltt__calc" onClick={calculate}>
            Calculate
          </button>

          {/* results */}
          {result && result.mode === "ontario" && (
            <div className="ltt__result" aria-live="polite">
              <div className="ltt__line">
                <span>Ontario land transfer tax</span>
                <span>{money(result.oltt)}</span>
              </div>
              {result.oRebate > 0 && (
                <div className="ltt__line ltt__line--minus">
                  <span>First-time buyer refund</span>
                  <span>−{money(result.oRebate)}</span>
                </div>
              )}
              <div className="ltt__line ltt__line--total">
                <span>Total land transfer tax</span>
                <span>{money(result.total)}</span>
              </div>
              {result.rebateBlocked && (
                <p className="ltt__note">
                  The first-time buyer refund applies to residential homes only,
                  so none was applied.
                </p>
              )}
            </div>
          )}

          {result && result.mode === "ohio" && (
            <div className="ltt__result" aria-live="polite">
              <div className="ltt__line">
                <span>Ohio state conveyance fee ($1 per $1,000)</span>
                <span>{usd(result.state)}</span>
              </div>
              {result.county > 0 && (
                <div className="ltt__line">
                  <span>County conveyance fee</span>
                  <span>{usd(result.county)}</span>
                </div>
              )}
              <div className="ltt__line ltt__line--total">
                <span>Total conveyance fee</span>
                <span>{usd(result.total)}</span>
              </div>
              <p className="ltt__note">
                In Ohio this fee is usually paid by the seller, and there is no
                first-time buyer refund.
              </p>
            </div>
          )}

          <p className="ltt__note">
            This is an estimate only and is not legal advice. Exemptions, small
            per-parcel fees and other charges can change the final amount.
            Contact our real estate team to confirm your figures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandTransferModal;