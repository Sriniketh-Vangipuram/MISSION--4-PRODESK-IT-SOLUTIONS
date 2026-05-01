export default async function handler(req, res) {
  try {
    const { name, role, company, skills, tone } = req.body;

    // simulate delay
    await new Promise(r => setTimeout(r, 2000));

    let aiText = null;

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-large",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            inputs: `
Write a ${tone || "professional"} cover letter.

Name: ${name}
Role: ${role}
Company: ${company}
Skills: ${skills}
`
          })
        }
      );

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        aiText = data?.[0]?.generated_text;
      }

    } catch (e) {
      console.log("HF failed, using fallback");
    }

    res.status(200).json({
      text: aiText || fallbackTemplate(name, role, company, skills)
    });

  } catch (err) {
    console.error(err);

    res.status(200).json({
      text: fallbackTemplate(
        req.body.name,
        req.body.role,
        req.body.company,
        req.body.skills
      )
    });
  }
}


// ✅ MUST BE OUTSIDE HANDLER
function fallbackTemplate(name, role, company, skills) {
  return `
Dear Hiring Manager at ${company},

I am writing to express my strong interest in the ${role} position at your esteemed organization. My experience in ${skills} has equipped me with the technical and analytical skills required to contribute effectively to your team.

I have consistently demonstrated the ability to build scalable solutions, solve complex problems, and adapt quickly to new technologies.

I am particularly excited about the opportunity to work at ${company} and contribute to its continued success.

Thank you for your time and consideration.

Sincerely,  
${name}
`;
}