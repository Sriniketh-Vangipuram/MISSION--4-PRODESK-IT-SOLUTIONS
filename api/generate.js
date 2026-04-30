import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, role, company, skills, tone } = req.body;

    const prompt = `
Write a ${tone} professional cover letter.

Candidate Name: ${name}
Role: ${role}
Company: ${company}
Skills: ${skills}

Rules:
- 250–300 words
- Professional tone
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Failed to generate";

    return res.status(200).json({ text });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}