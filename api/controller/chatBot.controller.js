
// POST /api/chatbot
export const bot  = async (req, res) => {
  const { message } = req.body;

  // Simple logic / OpenAI call
  if (message.includes("donate")) {
    return res.json({ reply: "You can donate food by going to the 'Add Surplus' section." });
  }

  // Optionally use OpenAI's GPT
  const gptReply = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: "user", content: message }]
  });

  res.json({ reply: gptReply.data.choices[0].message.content });
};


