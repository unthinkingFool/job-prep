<div align="center">

# 🎯 Job Prep — AI-Powered Interview Preparation Platform

### Stop guessing what an interviewer will ask. Know it, before you walk in.

**Job Prep** turns your resume and a target job description into a personalized, AI-generated interview preparation report — ATS scoring, skill-gap analysis, tailored technical & behavioral questions, and a 14-day prep roadmap — in seconds.

[🎥 Watch the Demo](https://www.loom.com/share/0a8ba6bab29c44dfa34983c125e6a384) · [📂 Source Code](https://github.com/unthinkingFool/job-prep) · [🐛 Report an Issue](https://github.com/unthinkingFool/job-prep/issues)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-JSONB-4169E1?logo=postgresql&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-Llama%203.3%2070B-F55036)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens)
![License](https://img.shields.io/badge/status-active%20development-brightgreen)

</div>

---

## 📺 Demo

[![Watch the demo on Loom](https://cdn.loom.com/sessions/thumbnails/0a8ba6bab29c44dfa34983c125e6a384-with-play.gif)](https://www.loom.com/share/0a8ba6bab29c44dfa34983c125e6a384)

**[▶️ Click here to watch the full walkthrough](https://www.loom.com/share/0a8ba6bab29c44dfa34983c125e6a384)**

---

## 💡 The Problem

Most interview prep tools give candidates the same generic list of "Top 50 questions for X role." They don't know your resume. They don't know the job you're actually applying for. They don't tell you where you're weak, what's missing, or how to spend the next two weeks.

**Job Prep fixes that.** Every report is generated specifically for *you* and the *exact job* you're targeting — not pulled from a static template.

---

## ✨ What It Does

| Step | Action |
|------|--------|
| 📄 | Upload your resume (PDF) |
| 🧠 | AI extracts and understands your resume content |
| 💬 | Add a short personal introduction |
| 🎯 | Paste any Job Description |
| ⚡ | Get a full personalized report — in seconds |

**Each report includes:**

- ✅ **ATS Match Score** — how well your resume aligns with the job description
- ✅ **Strength & Weakness Analysis** — a clear, honest breakdown
- ✅ **Missing Skill Identification** — the gaps recruiters will notice
- ✅ **20 Personalized Technical Interview Questions** — tailored to your background and the role
- ✅ **10 Behavioral Interview Questions with Sample Answers**
- ✅ **A Customized 14-Day Interview Preparation Roadmap**

---

## 🏗️ Tech Stack

### Frontend
- **React.js** + **React Router**
- **Axios** for API communication
- **Tailwind CSS** for styling
- **Custom Hooks** for shared logic

### Backend
- **Node.js** + **Express.js**
- **PostgreSQL** for persistence
- **JWT Authentication**
- **Multer** for file uploads
- **PDF Parsing** for resume ingestion
- **REST APIs**

### AI Layer
- **Groq API**
- **Llama 3.3 70B Versatile**
- Custom **Prompt Engineering**
- **Structured JSON Generation** with strict schema enforcement

### Database
A PostgreSQL schema designed to persist full interview reports, including:

- Resume content
- Job description
- ATS score
- Strengths & weaknesses
- Skill gaps
- Technical questions
- Behavioral questions
- Personalized preparation plan
- AI model metadata

---

## 🧩 Engineering Challenges Solved

The hardest part of this project wasn't the UI — it was making the **AI reliable and production-ready**. Key problems solved:

- Designing production-grade, role-aware prompts
- Enforcing strict, valid JSON output from the LLM
- Gracefully handling malformed or partial AI responses
- Extracting clean text from PDF resumes
- Parsing and validating AI-generated content before storage
- Persisting nested AI outputs using **PostgreSQL JSONB**
- Running multiple LLM generations in parallel for speed
- Designing a scalable, modular backend architecture
- Structuring APIs for future extensibility

> This project reinforced a core lesson: **building AI products is far more than calling an API.** The real engineering challenge is designing systems that are robust, maintainable, and production-ready.

---

## 📈 Roadmap — What's Next

- 🔹 AI Resume Builder
- 🔹 AI Career Roadmaps
- 🔹 Mock Interview Simulator
- 🔹 Interview History Dashboard
- 🔹 Better Prompt Optimization
- 🔹 Performance Improvements

---

## 📁 Project Structure

```
job-prep/
├── backend/     # Express API, auth, PDF parsing, AI orchestration, PostgreSQL models
└── frontend/    # React app, UI components, custom hooks, routing
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/unthinkingFool/job-prep.git
cd job-prep

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

Set up your environment variables (Groq API key, PostgreSQL connection string, JWT secret) in a `.env` file in the `backend/` directory, then run each service:

```bash
# Backend
cd backend
npm start

# Frontend (in a separate terminal)
cd frontend
npm start
```

---

## 👤 Author

**Swapnil Das**
Data Engineer & GenAI Full-Stack Developer

- GitHub: [@unthinkingFool](https://github.com/unthinkingFool)
- LinkedIn: [Swapnil Das](https://www.linkedin.com/in/swapnil-das-603824236)

---

<div align="center">

If this project is interesting to you, consider giving it a ⭐ on GitHub!

</div>
