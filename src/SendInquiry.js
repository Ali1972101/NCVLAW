export async function sendInquiry(data) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000); // 15 seconds

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("Failed to send");
  } finally {
    clearTimeout(timer);
  }
}