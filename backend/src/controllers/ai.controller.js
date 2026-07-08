const {
  generateAnalysis,
  generateTechnicalQuestions,
  generateBehavioralQuestions,
  generatePrepPlan,
} = require("../services/ai.service");

const { saveInterviewReport } = require("./queryAi.controller");
const {extractResumeText}=require("../services/pdf.service")

const generateInterviewReport = async (req, res) => {
  try {
    const {  selfDescription, jobDescription } = req.body;
    if(!req.file){
        return res.status(400).json({
            message: " resume pfd is required"
        });
    }

    const resumeText = await extractResumeText(req.file.buffer);

    if (!resumeText || !selfDescription || !jobDescription) {
      return res.status(400).json({
        message:
          "resumeText, selfDescription and jobDescription are required.",
      });
    }

    // Step 1: Overall analysis
    const analysis = await generateAnalysis({
      resumeText,
      selfDescription,
      jobDescription,
    });

    // Step 2: Generate remaining sections in parallel
    const [technical, behavioral, prep] = await Promise.all([
      generateTechnicalQuestions({
        resumeText,
        jobDescription,
        skillGaps: analysis.skillGaps,
      }),

      generateBehavioralQuestions({
        resumeText,
        selfDescription,
        jobDescription,
      }),

      generatePrepPlan({
        resumeText,
        jobDescription,
        skillGaps: analysis.skillGaps,
      }),
    ]);

    // Step 3: Save to PostgreSQL
    const savedReport = await saveInterviewReport({
      userId: req.user.id,
      title: analysis.title ?? analysis.TItle ?? "Interview Report",
      resumeText,
      selfDescription,
      jobDescription,
      analysis,
      technicalQuestions: technical.technicalQuestions,
      behavioralQuestions: behavioral.behavioralQuestions,
      prepPlan: prep.prepPlan,
      modelName: "llama-3.3-70b-versatile",
    });

    // Step 4: Return response
    return res.status(200).json({
      message: "Interview report generated successfully.",
      report: savedReport,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Failed to generate interview report.",
      error: err.message,
    });
  }
};





module.exports = {
  generateInterviewReport,
  
};