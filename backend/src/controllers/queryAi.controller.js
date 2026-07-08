const { pool } = require("../db/db");

async function saveInterviewReport({
  userId,
  title,
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
      title,
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
      $1, $2, $3, $4, $5, $6,
      $7, $8, $9, $10, $11,
      $12, $13
    )

    RETURNING *;
  `;

  const values = [
    userId,
    title,
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

async function interviewReportController(req, res) {
    try {

        const { interviewID } = req.params;
        const userId = req.user.id;

        const query = `
            SELECT *
            FROM interview_reports
            WHERE id = $1
            AND user_id = $2;
        `;

        const result = await pool.query(query, [
            interviewID,
            userId
        ]);

        if(result.rows.length===0){
            return res.status(404).json({
                message:"Interview report not found."
            });
        }

        return res.status(200).json(result.rows[0]);

    }
    catch(err){

        console.error(err);

        return res.status(500).json({
            message:"Internal Server Error"
        });

    }
}

async function allInterviewReportsController(req, res) {
  const userId = req.user.id;

  const query = `
    SELECT
      id,
      title,
      score,
      strengths,
      weaknesses,
      skill_gaps,
      prep_plan,
      created_at
    FROM interview_reports
    WHERE user_id=$1
    ORDER BY created_at DESC;
  `;

  const reportsResult = await pool.query(query, [userId]);

  res.status(200).json({
    userId,
    reports: reportsResult.rows,
  });
}

module.exports = {
  saveInterviewReport,
  interviewReportController,
  allInterviewReportsController,
};
