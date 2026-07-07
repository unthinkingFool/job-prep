const { pool } = require("../db/db");

async function saveInterviewReport({
  userId,
  resumeText,
  selfDescription,
  jobDescription,
  analysis,
  technicalQuestions,
  behavioralQuestions,
  prepPlan,
  modelName,
}) {
  const query = `
    INSERT INTO interview_reports (
      user_id,
      job_description,
      resume_text,
      self_description,
      score,
      strengths,
      weaknesses,
      technical_questions,
      behavioral_questions,
      skill_gaps,
      prep_plan,
      model_name
    )

    VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10,
      $11, $12
    )

    RETURNING *;
  `;

  const values = [
    userId,
    jobDescription,
    resumeText,
    selfDescription,
    analysis.matchScore,
    JSON.stringify(analysis.strengths),
    JSON.stringify(analysis.weaknesses),
    JSON.stringify(technicalQuestions),
    JSON.stringify(behavioralQuestions),
    JSON.stringify(analysis.skillGaps),
    JSON.stringify(prepPlan),
    modelName,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
}

module.exports = {
  saveInterviewReport,
};