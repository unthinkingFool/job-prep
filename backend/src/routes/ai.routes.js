const express = require("express");

const upload = require("../middlewares/upload.middleware");
const { interviewReportController } = require("../controllers/queryAi.controller");
const { allInterviewReportsController } = require("../controllers/queryAi.controller");

const { authMiddleware } = require("../middlewares/auth.middleware");

const {
    generateInterviewReport,
} = require("../controllers/ai.controller");

const router = express.Router();

router.post(
    "/interview/generate-report",
    authMiddleware,
    upload.single("resume"),
    generateInterviewReport
);


router.get("/interview/:interviewID", authMiddleware, interviewReportController);

router.get("/interview/reports", authMiddleware, allInterviewReportsController);


module.exports = router;