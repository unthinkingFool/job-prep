import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

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

      .file-body {
        background: var(--panel-2);
        border: 1px solid var(--hairline);
        border-radius: 14px;
      }

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
            Opening a new file…
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            Preparing your JobPrep AI experience.
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;