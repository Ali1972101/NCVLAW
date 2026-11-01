// Sends the form data to our own backend (api/contact.js),
// which emails it to info@ncvlaw.org.
export async function sendInquiry(data) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to send");
}