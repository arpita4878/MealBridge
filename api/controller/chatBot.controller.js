export const bot = async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ reply: "Invalid message format." });
  }

  const msg = message.toLowerCase();

  // Basic logic
  if (msg.includes("donate")) {
    return res.json({ reply: "You can donate food by going to the 'Add Surplus' section in the menu." });
  }

  if (msg.includes("claim")) {
    return res.json({ reply: "To claim food, please visit the 'Available Items' section." });
  }

  if (msg.includes("hello") || msg.includes("hi")) {
    return res.json({ reply: "Hello! How can I assist you with food donation or claiming today?" });
  }

  if (msg.includes("location")) {
    return res.json({ reply: "Our service is available in selected cities. Please check the map for more info." });
  }

  if (msg.includes("volunteer")) {
    return res.json({ reply: "You can join us as a volunteer from the 'Join Volunteer' section." });
  }

  if (msg.includes("partner")) {
    return res.json({ reply: "To become a partner, please register using the 'Partner with Us' form." });
  }

  // Fallback
  return res.json({
    reply: "I'm not sure how to respond to that. Try asking about donating, claiming, volunteering, or partnership.",
  });
};
