import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const { loading, handleLogin } = useAuth();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  };

  const theme = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap');

      .dossier-shell {
        --ink: #141b22;
        --panel: #1b2530;
        --panel-2: #263140;
        --hairline: #3a4552;
        --parchment: #ece5d3;
        --text: #e7e2d6;
        --text-muted: #8c93a0;
        --red: #b23a2e;
        --gold: #c9a24b;
        --teal: #4f7a72;
        min-height: 100vh;
        background: var(--ink);
        background-image:
          radial-gradient(ellipse 900px 600px at 15% -5%, rgba(201,162,75,0.07), transparent 60%),
          radial-gradient(ellipse 900px 700px at 100% 10%, rgba(79,122,114,0.08), transparent 60%);
        color: var(--text);
        font-family: 'Inter', sans-serif;
      }
      .dossier-shell h1, .dossier-shell h2, .dossier-shell h3, .display { font-family: 'Zilla Slab', serif; }
      .mono { font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.06em; }

      .stamp-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        border: 1.5px solid var(--red);
        color: var(--red);
        padding: 0.35rem 0.9rem;
        border-radius: 2px;
        transform: rotate(-2deg);
      }

      .file-body {
        background: var(--panel-2);
        border: 1px solid var(--hairline);
        border-radius: 14px;
      }

      .field {
        background: var(--ink);
        border: 1px solid var(--hairline);
        border-radius: 12px;
        color: var(--text);
      }
      .field:focus { outline: none; border-color: var(--gold); }
      .field::placeholder { color: var(--text-muted); }

      .btn-primary {
        background: var(--red);
        color: var(--parchment);
        font-family: 'IBM Plex Mono', monospace;
        letter-spacing: 0.08em;
        transition: filter 0.2s ease;
      }
      .btn-primary:hover { filter: brightness(1.12); }

      .checklist-item { border-bottom: 1px solid var(--hairline); }
      .checklist-item:last-child { border-bottom: none; }

      .spinner {
        border: 4px solid var(--panel-2);
        border-top-color: var(--gold);
        border-radius: 999px;
        animation: spin 0.9s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }

      @media (prefers-reduced-motion: reduce) {
        .spinner { animation: none; }
      }
    `}</style>
  );

  if (loading) {
    return (
      <main className="dossier-shell flex items-center justify-center">
        {theme}
        <div className="file-body flex flex-col items-center px-12 py-10">
          <div className="spinner w-14 h-14" />
          <h2 className="display mt-6 text-2xl font-semibold" style={{ color: "var(--parchment)" }}>
            Retrieving your file…
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            Preparing your JobPrep AI dossier.
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="dossier-shell flex">
      {theme}

      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 relative">
        <div className="max-w-lg">
          <span className="stamp-badge mono text-xs uppercase">JobPrep AI</span>

          <h1 className="display mt-6 text-5xl font-semibold leading-[1.05]" style={{ color: "var(--parchment)" }}>
            Land your dream job
            <span className="block" style={{ color: "var(--gold)" }}>with AI.</span>
          </h1>

          <p className="mt-8 text-lg leading-8" style={{ color: "var(--text-muted)" }}>
            Search jobs, build ATS-optimized resumes, prepare for interviews,
            and receive personalized roadmaps — all in one file.
          </p>

          <div className="mt-12">
            {[
              "AI Resume Builder",
              "Smart Interview Preparation",
              "Personalized Career Roadmaps",
              "Latest Job Openings",
            ].map((item) => (
              <div key={item} className="checklist-item flex items-center gap-3 py-3 text-sm" style={{ color: "var(--text)" }}>
                <span className="mono" style={{ color: "var(--teal)" }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="file-body w-full max-w-md p-10">
          <div className="text-center">
            <span className="mono text-xs" style={{ color: "var(--text-muted)" }}>ACCESS REQUEST</span>
            <h2 className="display mt-3 text-4xl font-semibold" style={{ color: "var(--parchment)" }}>
              Welcome Back
            </h2>
            <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
              Login to continue your JobPrep AI journey.
            </p>
          </div>

          <form autoComplete="off" className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mono text-xs" style={{ color: "var(--text-muted)" }}>EMAIL</label>
              <input
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                type="email"
                placeholder="Enter your email"
                className="field mt-2 w-full px-4 py-3"
              />
            </div>

            <div>
              <label className="mono text-xs" style={{ color: "var(--text-muted)" }}>PASSWORD</label>
              <input
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                type="password"
                placeholder="Enter your password"
                className="field mt-2 w-full px-4 py-3"
              />
            </div>

            <button className="btn-primary w-full rounded-xl py-3.5 text-sm uppercase">
              Login
            </button>
          </form>

          <p className="mt-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            Don't have an account?
            <Link to={"/register"}>
              <span className="ml-2 cursor-pointer font-semibold" style={{ color: "var(--gold)" }}>
                Register
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;