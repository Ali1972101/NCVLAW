import nodemailer from "nodemailer";

const RECEIVER = "info@ncvlaw.org";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const clean = (value, max = 200, keepNewlines = false) => {
  const text = String(value ?? "").trim().slice(0, max);
  return keepNewlines ? text : text.replace(/[\r\n]+/g, " ");
};

const escapeHtml = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  if (body._gotcha) return res.status(200).json({ ok: true });

  const name = clean(body.name || `${body.firstName || ""} ${body.lastName || ""}`);
  const email = clean(body.email);
  const phone = clean(body.phone, 40);
  const office = clean(body.office);
  const source = clean(body.source);
  const areas = Array.isArray(body.practiceAreas)
    ? body.practiceAreas.map((area) => clean(area, 60)).join(", ")
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
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html: rows
        .map(
          ([label, value]) =>
            `<p><strong>${escapeHtml(label)}:</strong><br>${escapeHtml(value)}</p>`,
        )
        .join(""),
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Failed to send inquiry email:", error);
    return res.status(500).json({ error: "Unable to send inquiry." });
  }
}
