async function generate() {
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const company = document.getElementById("company").value;
  const skills = document.getElementById("skills").value;
  const tone = document.getElementById("tone").value;

  if (!name || !role || !company) {
    alert("Fill all required fields");
    return;
  }

  const loading = document.getElementById("loading");
  const output = document.getElementById("output");

  loading.classList.remove("hidden");
  output.value = "";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, role, company, skills, tone })
    });

    console.log("status",res.status);
    const data = await res.json();
    console.log("data",data);
    // UX delay (important)
    setTimeout(() => {
      loading.classList.add("hidden");
      if (data.text) {
        output.value = data.text;
      } else {
        console.log("API Response:", data);
        output.value = "Failed to generate cover letter";
      }
    }, 3000);

  } catch (err) {
    loading.classList.add("hidden");
    alert("Error generating letter");
  }
}