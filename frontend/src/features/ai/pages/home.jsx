import React, { useState , useRef, useEffect } from "react";
import { Upload, FileText, CheckCircle2, X, Calendar, ArrowRight, TrendingUp } from "lucide-react";
import { useInterview } from "../hooks/useInterview";
import {useNavigate} from "react-router-dom";

export default function Home() {

  const { generateReport, loading , reports } = useInterview();


  const [resume, setResume] = useState(null);
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const resumeInputRef = useRef(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all reports when component mounts
    // This is handled by the useInterview hook in the context
  }, []);

  const canGenerate = resume && selfDescription.trim() && jobDescription.trim();

  const handleGenerate = async () => {
    try {
      const resumefile = resumeInputRef.current.files[0];
      const data = await generateReport(resumefile, selfDescription, jobDescription);
      setIsGenerated(true);
      navigate(`/interview/${data.id}`);
    } catch (error) {
      console.error("Error generating report:", error);
      setIsGenerated(false);
    }
  };

  return (
    <main className="dossier-shell">
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
          position: relative;
          overflow-x: hidden;
        }

        .dossier-shell h1, .dossier-shell h2, .dossier-shell h3, .display {
          font-family: 'Zilla Slab', serif;
        }

        .mono { font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.06em; }

        .doc-header {
          border-bottom: 1px solid var(--hairline);
        }

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

        .form-card {
          background: var(--panel-2);
          border: 1px solid var(--hairline);
          border-radius: 18px;
        }

        .upload-zone {
          border: 1.5px dashed var(--hairline);
          border-radius: 14px;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .upload-zone:hover { border-color: var(--gold); background: rgba(201,162,75,0.04); }

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
          transition: filter 0.2s ease, transform 0.15s ease;
        }
        .btn-primary:hover:not(:disabled) { filter: brightness(1.12); }
        .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

        .loading-dots {
          display: inline-flex;
          gap: 0.35rem;
          align-items: center;
        }
        .loading-dots span {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--parchment);
          animation: pulse-dot 0.9s ease-in-out infinite;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.15s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes pulse-dot {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.45; }
          40% { transform: scale(1); opacity: 1; }
        }

        .result-card {
          background: var(--panel);
          border: 1px solid var(--hairline);
          border-radius: 16px;
        }

        .report-section {
          margin-top: 3rem;
          padding-top: 3rem;
          border-top: 1px solid var(--hairline);
        }

        .report-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .report-card {
          background: var(--panel-2);
          border: 1px solid var(--hairline);
          border-radius: 16px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          overflow: hidden;
        }

        .report-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--teal));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .report-card:hover {
          background: var(--panel);
          border-color: var(--gold);
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(201, 162, 75, 0.1);
        }

        .report-card:hover::before {
          opacity: 1;
        }

        .report-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .report-score-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          border-radius: 12px;
          background: rgba(201, 162, 75, 0.15);
          border: 2px solid var(--gold);
          flex-shrink: 0;
        }

        .report-score-number {
          font-family: 'Zilla Slab', serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--gold);
          line-height: 1;
        }

        .report-title {
          font-family: 'Zilla Slab', serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--parchment);
          line-height: 1.3;
        }

        .report-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.05em;
        }

        .report-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          font-size: 0.75rem;
        }

        .report-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--hairline);
          color: var(--text-muted);
          font-family: 'IBM Plex Mono', monospace;
        }

        .report-description {
          color: var(--text-muted);
          font-size: 0.875rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .report-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--hairline);
          margin-top: auto;
        }

        .report-status {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-family: 'IBM Plex Mono', monospace;
          color: var(--teal);
          letter-spacing: 0.05em;
        }

        .report-action {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          background: rgba(201, 162, 75, 0.2);
          color: var(--gold);
          transition: all 0.2s ease;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .report-card:hover .report-action {
          background: rgba(201, 162, 75, 0.3);
        }

        .reports-empty {
          text-align: center;
          padding: 3rem 1rem;
          color: var(--text-muted);
        }

        .reports-empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
      `}</style>

      <div className="doc-header">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3 mono text-xs" style={{ color: "var(--text-muted)" }}>
          <span>FILE — INTERVIEW PREPARATION DOSSIER</span>
          <span>{isGenerated ? "STATUS: READY" : "STATUS: AWAITING INPUT"}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-3xl">
          <span className="stamp-badge mono text-xs uppercase">
            <FileText size={14} /> JobPrep AI
          </span>
          <h1 className="display mt-8 text-5xl md:text-6xl font-semibold leading-[1.05]" style={{ color: "var(--parchment)" }}>
            Prepare your analysis.
          </h1>
          <p className="mt-6 text-base md:text-lg leading-7" style={{ color: "var(--text-muted)" }}>
            Upload your resume, describe your background, and share the role you are targeting.
            A single click will prepare your analysis request in this dossier-style view.
          </p>
        </div>

        <div className="mt-12 form-card p-8 md:p-10">
          <div>
            <h2 className="display text-2xl font-semibold" style={{ color: "var(--parchment)" }}>Resume</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>Upload the PDF you want to analyze.</p>

            <label className="upload-zone mt-6 flex flex-col items-center justify-center h-56 cursor-pointer">
              <Upload size={32} style={{ color: "var(--text-muted)" }} />
              <h3 className="mt-4 text-lg font-medium" style={{ color: "var(--text)" }}>Drop your resume here</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>or click to browse</p>
              <p className="mono mt-3 text-xs" style={{ color: "var(--text-muted)" }}>PDF · MAX 5MB</p>
              <input hidden ref={resumeInputRef} type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} />
            </label>

            {resume && (
              <div className="mt-5 rounded-lg px-5 py-3 flex items-center justify-between" style={{ background: "rgba(79,122,114,0.12)", border: "1px solid var(--teal)" }}>
                <span className="flex items-center gap-2 text-sm" style={{ color: "var(--teal)" }}>
                  <CheckCircle2 size={16} /> {resume.name}
                </span>
                <button onClick={() => setResume(null)} aria-label="Remove file" style={{ color: "var(--text-muted)" }}>
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="display text-2xl font-semibold" style={{ color: "var(--parchment)" }}>About you</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>Share your experience, projects, and strengths.</p>
            <textarea
              rows={8}
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
              placeholder="I have worked on..."
              className="field mt-6 w-full p-6"
            />
          </div>

          <div className="mt-8">
            <h2 className="display text-2xl font-semibold" style={{ color: "var(--parchment)" }}>Target role</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>Paste the job description you want to review.</p>
            <textarea
              rows={9}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the role description here..."
              className="field mt-6 w-full p-6"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!canGenerate || loading}
            className="btn-primary mt-8 w-full rounded-xl py-4 text-sm uppercase"
          >
            {loading ? (
              <span className="loading-dots justify-center">
                <span />
                <span />
                <span />
              </span>
            ) : (
              "Generate Analysis"
            )}
          </button>

          {!canGenerate && (
            <p className="mono mt-3 text-xs text-center" style={{ color: "var(--text-muted)" }}>
              Fill in all three sections to continue.
            </p>
          )}
        </div>

        {isGenerated && (
          <div className="result-card mt-8 p-8 md:p-10">
            <h3 className="display text-2xl font-semibold" style={{ color: "var(--parchment)" }}>Analysis request ready</h3>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>
              Your resume, self-description, and target role have been captured.
              The analysis view will be prepared here next.
            </p>
          </div>
        )}
      </div>

      {/** Show all reports of one user */}
      {reports && reports.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 report-section">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={24} style={{ color: "var(--gold)" }} />
              <h2 className="display text-3xl font-semibold" style={{ color: "var(--parchment)" }}>
                Your Reports
              </h2>
            </div>
            <p className="mt-2 text-base" style={{ color: "var(--text-muted)" }}>
              View your previous interview analyses and track your progress.
            </p>
          </div>

          <div className="report-grid">
            {reports.map((report) => {
              const createdDate = new Date(report.createdAt || report.created_at || Date.now());
              const formattedDate = createdDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              });

              return (
                <div
                  key={report._id || report.id}
                  className="report-card"
                  onClick={() => navigate(`/interview/${report._id || report.id}`)}
                >
                  <div className="report-header">
                    <div className="flex-1">
                      <h3 className="report-title">
                        {report.targetRole || report.jobTitle || 'Interview Report'}
                      </h3>
                      <div className="report-date mt-2">
                        <Calendar size={12} />
                        {formattedDate}
                      </div>
                    </div>
                    <div className="report-score-badge">
                      <span className="report-score-number">
                        {Math.round(report.score || report.matchScore || 0)}
                      </span>
                    </div>
                  </div>

                  {report.jobDescription && (
                    <p className="report-description">
                      {report.jobDescription}
                    </p>
                  )}

                  <div className="report-meta">
                    {report.score && (
                      <span className="report-tag">
                        Match: {Math.round(report.score)}%
                      </span>
                    )}
                    {report.strengths && (
                      <span className="report-tag">
                        {report.strengths.length} Strengths
                      </span>
                    )}
                    {report.skill_gaps && (
                      <span className="report-tag">
                        {report.skill_gaps.length} Skill Gaps
                      </span>
                    )}
                  </div>

                  <div className="report-footer">
                    <div className="report-status">
                      <CheckCircle2 size={12} />
                      COMPLETE
                    </div>
                    <div className="report-action">
                      <span>View</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/** Empty reports state */}
      {reports && reports.length === 0 && (
        <div className="max-w-6xl mx-auto px-6 report-section">
          <div className="reports-empty">
            <FileText size={48} className="mx-auto" style={{ color: "var(--text-muted)" }} />
            <h3 className="display text-xl mt-4" style={{ color: "var(--parchment)" }}>
              No reports yet
            </h3>
            <p className="mt-2 text-sm">
              Create your first interview report by filling the form above.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}