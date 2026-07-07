const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `

You are JobPrep AI, an expert AI interview coach.

Rules:

- Always return valid JSON.
- Never return markdown.
- Never wrap JSON inside \`\`\`.
- Never explain your output.
- Never include comments.
- Do not hallucinate technologies or experiences not present in the candidate profile unless clearly inferred from the job requirements.
- Use professional recruiter and interviewer standards.
- Make outputs specific, practical, and technically accurate.
- Ensure every JSON field matches the requested schema exactly.
- Do not include any additional keys beyond those specified.
`;

async function askLLM(prompt) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_completion_tokens: 4096,
  });

  let response = completion.choices[0].message.content;

  response = response
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(response);
}

async function generateAnalysis({
  resumeText,
  selfDescription,
  jobDescription,
}) {

const prompt = `
You are a senior Software Engineering recruiter, ATS evaluator, career coach, and technical interviewer.

Your task is to evaluate how well a candidate matches the given job description.

========================
CANDIDATE RESUME
========================

${resumeText}

========================
SELF DESCRIPTION
========================

${selfDescription}

========================
JOB DESCRIPTION
========================

${jobDescription}

-------------------------------------------------

Perform a comprehensive analysis.

Evaluate:

• Technical skills
• Programming languages
• Frameworks
• Backend skills
• Frontend skills
• Database knowledge
• Cloud technologies
• DevOps
• AI/ML knowledge
• Communication
• Leadership
• Projects
• Academic background
• Overall relevance to the role

Use the resume, self description and job description together.

Determine:

1. ATS Match Score (0-100)

2. Candidate Strengths
(5-10 concise bullet points)

3. Candidate Weaknesses
(5-10 concise bullet points)

4. Missing Skills

Only include skills that are explicitly required by the job but missing or weak in the candidate profile.

For each skill provide severity:

low
medium
high

Return ONLY valid JSON.

Schema:

{
  "matchScore": number,

  "strengths":[
      ""
  ],

  "weaknesses":[
      ""
  ],

  "skillGaps":[
      {
          "skill":"",
          "severity":"low"
      }
  ]
}
`;

  return await askLLM(prompt);
}

async function generateTechnicalQuestions({
  resumeText,
  jobDescription,
  skillGaps,
}) {

const prompt = `
You are a Senior Software Engineer at Google.

Your job is to create highly realistic technical interview questions.

========================
RESUME
========================

${resumeText}

========================
JOB DESCRIPTION
========================

${jobDescription}

========================
IDENTIFIED SKILL GAPS
========================

${JSON.stringify(skillGaps)}

------------------------------------------------

Generate exactly 20 technical interview questions.

The questions should progressively increase in difficulty.

Distribution:

5 Easy

8 Medium

7 Hard

Cover topics such as:

• Data Structures
• Algorithms
• OOP
• Database Design
• SQL
• PostgreSQL
• REST APIs
• Node.js
• Express
• React
• JavaScript
• TypeScript (if required)
• System Design (Junior level)
• Docker
• Kubernetes
• AWS
• Redis
• Git
• Performance Optimization

Prioritize weak areas identified in the skill gaps.

Each question must contain:

Question

Why interviewer asks it

Ideal answer

Ideal answers should be concise but technically accurate.

Return ONLY valid JSON.

Schema

{
    "technicalQuestions":[
        {
            "question":"",
            "intension":"",
            "answer":""
        }
    ]
}
`;

  return await askLLM(prompt);
}

async function generateBehavioralQuestions({
  resumeText,
  selfDescription,
  jobDescription,
}) {

const prompt = `
You are a Senior Engineering Manager.

Generate realistic behavioral interview questions.

========================
RESUME
========================

${resumeText}

========================
SELF DESCRIPTION
========================

${selfDescription}

========================
JOB DESCRIPTION
========================

${jobDescription}

--------------------------------------------

Generate exactly 10 behavioral interview questions.

Cover:

Communication

Leadership

Ownership

Conflict Resolution

Learning Ability

Problem Solving

Teamwork

Adaptability

Time Management

Failure & Growth

Each question should feel like one asked by Google, Microsoft, Amazon, Atlassian, Meta or Stripe.

Each question must contain

Question

Interviewer's intention

Excellent sample answer based on candidate profile.

Do not invent unrealistic achievements.

Return ONLY JSON.

Schema

{
    "behavioralQuestions":[
        {
            "question":"",
            "intension":"",
            "answer":""
        }
    ]
}
`;

  return await askLLM(prompt);
}

async function generatePrepPlan({
  resumeText,
  jobDescription,
  skillGaps,
}) {

const prompt = `
You are an expert interview preparation mentor.

Create a personalized interview preparation roadmap.

========================
RESUME
========================

${resumeText}

========================
JOB DESCRIPTION
========================

${jobDescription}

========================
SKILL GAPS
========================

${JSON.stringify(skillGaps)}

--------------------------------------------

Generate a detailed 14-day preparation plan.

The plan should prioritize:

High severity skills first

Medium severity skills second

Low severity skills last

Each day should include:

Main focus

3-6 actionable tasks

Recommended practice

Difficulty progression

Avoid repeating tasks.

The roadmap should realistically prepare the candidate for interviews at companies like:

Google

Microsoft

Amazon

Meta

Stripe

Atlassian

Return ONLY JSON.

Schema

{
    "prepPlan":[
        {
            "day":1,
            "focus":"",
            "tasks":[
                "",
                "",
                ""
            ]
        }
    ]
}
`;

  return await askLLM(prompt);
}

module.exports = {
  generateAnalysis,
  generateTechnicalQuestions,
  generateBehavioralQuestions,
  generatePrepPlan,
};