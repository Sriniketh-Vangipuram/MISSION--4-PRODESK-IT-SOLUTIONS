export default async function handler(req, res) {
  try {
    const { name, role, company, skills, tone } = req.body;

    if (!name || !role || !company) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const prompt = `
Write a ${tone} professional cover letter.

Candidate Name: ${name}
Role: ${role}
Company: ${company}
Skills: ${skills}

Rules:
- Keep it 250-300 words
- Professional tone
- Well structured paragraphs
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Failed to generate";

    res.status(200).json({ text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}