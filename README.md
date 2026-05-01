# AI Cover Letter Generator (SaaS Style)

A production-ready web application that generates professional cover letters using AI-style logic and API integration.

---

## 🚀 Live Demo
(Add your deployed link here)

---

## 📌 Features

- Dynamic Cover Letter Generation
- Async API Handling (Serverless Backend)
- Loading State (Simulated AI Processing)
- Fallback Mechanism (Prevents API failure crashes)
- Copy to Clipboard Feature
- Clean & Responsive UI

---

## 🧠 Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Serverless Functions (Vercel)
- API: Hugging Face (with fallback system)
- Deployment: Vercel

---

## ⚙️ How It Works

1. User enters:
   - Name
   - Job Role
   - Company
   - Skills
   - Tone

2. Frontend sends request to backend (`/api/generate`)

3. Backend:
   - Attempts AI API call (Hugging Face)
   - If API fails → uses fallback template

4. Response is displayed with proper formatting

---

## 🔐 Security

- API keys stored in `.env`
- `.env` excluded via `.gitignore`
- No sensitive data exposed

---

## 📂 Project Structure
ai-cover-saas/
│
├── api/
│ └── generate.js
│
├── public/
│ ├── index.html
│ ├── styles.css
│ └── script.js
│
├── .env
├── .gitignore
└── package.json


---

## 🧪 Run Locally

```bash
npm install
vercel dev
