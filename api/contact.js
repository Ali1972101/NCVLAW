import nodemailer from "nodemailer";

const RECEIVER = "info@ncvlaw.org";

// SMTP_PORT is optional. Without it we use 465 (SSL). Set it to 587 to try STARTTLS.
const port = Number(process.env.SMTP_PORT || 465);

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port,
  secure: port === 465, // true for 465, false for 587
  connectionTimeout: 7000, // give up quickly instead of hanging
  greetingTimeout: 7000,
  socketTimeout: 9000,
  auth: {
    user: process.env.SMTP_USER, // set in Vercel: info@ncvlaw.org
    pass: process.env.SMTP_PASS, // set in Vercel: the mailbox password
  },
});

// ---------- helpers ----------
// trims, limits the length, and (by default) removes line breaks
const clean = (value, max = 200, keepNewlines = false) => {
  const text = String(value ?? "").trim().slice(0, max);
  return keepNewlines ? text : text.replace(/[\r\n]+/g, " ");
};

const escapeHtml = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------- the endpoint: POST /api/contact ----------
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("SMTP_USER or SMTP_PASS is missing in the environment variables.");
    return res.status(500).json({ error: "Email is not configured." });
  }

  const body = req.body || {};

  // spam trap: bots fill this hidden field. Pretend it worked, send nothing.
  if (body._gotcha) return res.status(200).json({ ok: true });

  // works for both forms (the pop-up and the practice-area forms)
  const name = clean(body.name || `${body.firstName || ""} ${body.lastName || ""}`);
  const email = clean(body.email);
  const phone = clean(body.phone, 40);
  const office = clean(body.office);
  const source = clean(body.source);
  const areas = Array.isArray(body.practiceAreas)
    ? body.practiceAreas.map((a) => clean(a, 60)).join(", ")
    : clean(body.practiceAreas, 300);
  const message = clean(body.message, 5000, true);

  if (!name || !phone || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Practice areas", areas],
    ["Preferred office", office],
    ["Heard about us from", source],
    ["Message", message],
  ].filter(([, value]) => value);

  try {
    await transporter.sendMail({
      from: `"NCV Law Website" <${process.env.SMTP_USER}>`,
      to: RECEIVER,
      replyTo: email, // pressing Reply answers the visitor
      subject: `New inquiry from ${name}`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html: rows
        .map(
          ([label, value]) =>
            `<p><strong>${label}:</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`
        )
        .join(""),
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Email failed:", error.message);

    // TEMPORARY: shows why it failed so we can fix it. Remove these 3 lines later.
    return res.status(500).json({
      error: "Could not send the message.",
      code: error.code,
      responseCode: error.responseCode,
      reason: error.message,
    });
  }
}