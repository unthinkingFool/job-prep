import React, { useState , useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate , useParams } from "react-router-dom";
import {
  ShieldCheck,
  AlertTriangle,
  MessageSquare,
  MessagesSquare,
  ListChecks,
  CalendarDays,
  ChevronRight,
} from "lucide-react";



const sections = [
  { id: "strengths", label: "Strengths" },
  { id: "weaknesses", label: "Weaknesses" },
  { id: "technical", label: "Technical Questions" },
  { id: "behavioral", label: "Behavioral Questions" },
  { id: "gaps", label: "Skill Gaps" },
  { id: "plan", label: "Prep Plan" },
];

function ScoreSeal({ score }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="seal-wrap">
      <svg width="150" height="150" viewBox="0 0 150 150">
        <circle cx="75" cy="75" r="70" fill="none" stroke="var(--hairline)" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx="75" cy="75" r={radius} fill="none" stroke="var(--panel-2)" strokeWidth="10" />
        <circle
          cx="75"
          cy="75"
          r={radius}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 75 75)"
        />
      </svg>
      <div className="seal-center">
        <span className="seal-number">{score}</span>
        <span className="seal-unit">MATCH</span>
      </div>
    </div>
  );
}

export default function InterviewReport() {
  const [openSection, setOpenSection] = useState("strengths");

  const { interviewReport: report , fetchReportID } = useInterview();
  const { id: interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      fetchReportID(interviewId);
    }
  }, [interviewId, fetchReportID]);

  const sectionIcons = {
    strengths: ShieldCheck,
    weaknesses: AlertTriangle,
    technical: MessageSquare,
    behavioral: MessagesSquare,
    gaps: ListChecks,
    plan: CalendarDays,
  };

  if (!report) {
    return (
      <main className="dossier-shell">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="section-card p-10 text-center">
            <h1 className="display text-3xl font-semibold" style={{ color: "var(--parchment)" }}>Preparing your report</h1>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>
              The interview analysis is still loading. Please wait a moment and try again if needed.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const renderSectionContent = () => {
    switch (openSection) {
      case "strengths":
        return (
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} style={{ color: "var(--teal)" }} />
              <h2 className="display text-2xl font-semibold" style={{ color: "var(--parchment)" }}>Strengths</h2>
            </div>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>
              The strongest areas of your profile, framed as interview-ready talking points.
            </p>
            <ul className="bullet-list mt-6">
              {report.strengths.map((item, index) => (
                <li key={index}>
                  <span className="bullet-dot" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case "weaknesses":
        return (
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} style={{ color: "var(--red)" }} />
              <h2 className="display text-2xl font-semibold" style={{ color: "var(--parchment)" }}>Weaknesses</h2>
            </div>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>
              Focus areas that may come up in interviews, with a clear plan to address them.
            </p>
            <ul className="bullet-list mt-6">
              {report.weaknesses.map((item, index) => (
                <li key={index}>
                  <span className="bullet-dot" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case "technical":
        return (
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare size={18} style={{ color: "var(--gold)" }} />
              <h2 className="display text-2xl font-semibold" style={{ color: "var(--parchment)" }}>Technical Questions</h2>
            </div>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>
              Sample technical prompts and the kind of strong answer structure that would impress an interviewer.
            </p>
            <div className="mt-6 space-y-4">
              {report.technical_questions.map((item, index) => (
                <div key={index} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--hairline)" }}>
                  <p className="text-sm font-semibold" style={{ color: "var(--parchment)" }}>{item.question}</p>
                  <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>{item.answer}</p>
                  <p className="mt-3 mono text-[11px] uppercase" style={{ color: "var(--gold)" }}>{item.intension}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "behavioral":
        return (
          <div>
            <div className="flex items-center gap-2">
              <MessagesSquare size={18} style={{ color: "var(--gold)" }} />
              <h2 className="display text-2xl font-semibold" style={{ color: "var(--parchment)" }}>Behavioral Questions</h2>
            </div>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>
              Situational prompts that show how you lead, communicate, and take ownership.
            </p>
            <div className="mt-6 space-y-4">
              {report.behavioral_questions.map((item, index) => (
                <div key={index} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--hairline)" }}>
                  <p className="text-sm font-semibold" style={{ color: "var(--parchment)" }}>{item.question}</p>
                  <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>{item.answer}</p>
                  <p className="mt-3 mono text-[11px] uppercase" style={{ color: "var(--gold)" }}>{item.intension}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "gaps":
        return (
          <div>
            <div className="flex items-center gap-2">
              <ListChecks size={18} style={{ color: "var(--teal)" }} />
              <h2 className="display text-2xl font-semibold" style={{ color: "var(--parchment)" }}>Skill Gaps</h2>
            </div>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>
              The knowledge areas that could improve your odds in the next interview cycle.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {report.skill_gaps.map((item, index) => (
                <div key={index} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--hairline)" }}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold" style={{ color: "var(--parchment)" }}>{item.skill}</span>
                    <span className={`chip ${item.severity}`}>{item.severity.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "plan":
        return (
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays size={18} style={{ color: "var(--gold)" }} />
              <h2 className="display text-2xl font-semibold" style={{ color: "var(--parchment)" }}>Prep Plan</h2>
            </div>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>
              A compact, practical prep path for the next few days.
            </p>
            <div className="mt-6 space-y-4">
              {report.prep_plan.map((item, index) => (
                <div key={index} className="plan-row">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mono text-[11px] uppercase" style={{ color: "var(--gold)" }}>Day {item.day}</span>
                    <span className="text-sm font-semibold" style={{ color: "var(--parchment)" }}>{item.focus}</span>
                    <span className="chip low">{item.difficultyProgression}</span>
                  </div>
                  <ul className="bullet-list mt-3">
                    {item.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>
                        <span className="bullet-dot" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--parchment)" }}>Recommended practice:</span> {item.recommendedPractice}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="dossier-shell margin-bottom-20">
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

        .score-card, .section-card {
          background: var(--panel-2);
          border: 1px solid var(--hairline);
          border-radius: 18px;
        }

        /* Below the 2-column breakpoint the sidebar and content stack normally
           and the whole page scrolls together — no fixed-height tricks here,
           so nothing can get clipped. */
        .content-panel {
          min-height: 420px;
        }

        .margin-bottom-20 {
          margin-bottom: 5rem;
        }

        /* At the breakpoint where the sidebar sits beside the content (same
           breakpoint as lg:grid-cols on section-grid), pin the header and
           sidebar in place and make only the content panel scroll. */
        @media (min-width: 1024px) {
          .dossier-shell {
            height: 100vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }

          .doc-header {
            flex-shrink: 0;
          }

          .report-page-wrap {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          .report-section {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
          }

          .score-card {
            flex-shrink: 0;
          }

          .section-grid {
            flex: 1;
            min-height: 0;
            display: grid;
            grid-template-rows: minmax(0, 1fr);
          }

          .section-grid > aside {
            overflow-y: auto;
          }

          .content-panel {
            height: 100%;
            overflow-y: auto;
          }
        }

        .section-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.2rem;
          border-radius: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--hairline);
          color: var(--parchment);
          text-align: left;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .section-toggle:hover {
          background: rgba(201,162,75,0.08);
          border-color: var(--gold);
        }
        .section-toggle.active {
          border-color: var(--gold);
          background: rgba(201,162,75,0.1);
        }
        .section-toggle-icon {
          transition: transform 0.2s ease;
        }
        .section-toggle-icon.open {
          transform: rotate(90deg);
        }
        .section-nav-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--hairline);
          color: var(--parchment);
          text-align: left;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .section-nav-button:hover {
          background: rgba(201,162,75,0.08);
          border-color: var(--gold);
        }
        .section-nav-button.active {
          border-color: var(--gold);
          background: rgba(201,162,75,0.1);
        }

        .card-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .seal-wrap { position: relative; width: 150px; height: 150px; }
        .seal-center {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .seal-number { font-family: 'Zilla Slab', serif; font-size: 2.35rem; font-weight: 700; color: var(--parchment); line-height: 1; }
        .seal-unit { font-family: 'IBM Plex Mono', monospace; font-size: 0.66rem; letter-spacing: 0.15em; color: var(--gold); margin-top: 0.25rem; }

        .bullet-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.9rem;
        }

        .bullet-list li {
          display: flex;
          gap: 0.7rem;
          align-items: flex-start;
          color: var(--text);
          line-height: 1.65;
        }

        .bullet-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--gold);
          margin-top: 0.55rem;
          flex-shrink: 0;
        }

        .chip {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 0.3rem 0.7rem;
          font-size: 0.72rem;
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.06em;
          color: var(--parchment);
        }
        .chip.low { background: rgba(79,122,114,0.2); color: var(--teal); }
        .chip.medium { background: rgba(201,162,75,0.2); color: var(--gold); }
        .chip.high { background: rgba(178,58,46,0.2); color: var(--red); }

        .plan-row {
          border-bottom: 1px solid var(--hairline);
          padding-bottom: 1rem;
          margin-bottom: 1rem;
        }
        .plan-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
          margin-bottom: 0;
        }
      `}</style>

      <div className="doc-header">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3 mono text-xs" style={{ color: "var(--text-muted)" }}>
          <span>FILE — INTERVIEW REPORT</span>
          <span>STATUS: GENERATED</span>
        </div>
      </div>

      <div className="report-page-wrap max-w-7xl mx-auto px-6 pt-4 pb-10 lg:pt-6 lg:pb-16 w-full">
        <section className="report-section space-y-4">
          <div className="score-card p-8 md:p-10" style={{ flexShrink: 0 }}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <ScoreSeal score={report.score} />
              <div className="max-w-2xl">
                <span className="card-tag">INTERVIEW REPORT SUMMARY</span>
                <h1 className="display mt-3 text-3xl md:text-4xl font-semibold" style={{ color: "var(--parchment)" }}>
                  AI-generated interview analysis
                </h1>
                <p className="mt-4 text-base leading-7" style={{ color: "var(--text-muted)" }}>
                  This report highlights strong technical fundamentals, a few experience gaps, and a focused prep plan to improve your interview readiness.
                </p>
              </div>
            </div>
          </div>

          <div className="section-grid grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="section-card p-4 self-start">
              <div className="mono text-[11px] uppercase" style={{ color: "var(--text-muted)" }}>
                Sections
              </div>
              <div className="mt-4 space-y-2">
                {sections.map((section) => {
                  const Icon = sectionIcons[section.id];
                  return (
                    <button
                      key={section.id}
                      className={`section-nav-button ${openSection === section.id ? "active" : ""}`}
                      onClick={() => setOpenSection(section.id)}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} style={{ color: openSection === section.id ? "var(--gold)" : "var(--text-muted)" }} />
                        <span className="text-sm font-medium">{section.label}</span>
                      </div>
                      <ChevronRight size={16} className="opacity-70" />
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="section-card content-panel p-8">
              {renderSectionContent()}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
