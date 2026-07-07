const express = require("express");

const upload = require("../middlewares/upload.middleware");
const { authMiddleware } = require("../middlewares/auth.middleware");

const {
    generateInterviewReport,
} = require("../controllers/ai.controller");

const router = express.Router();

router.post(
    "/generate-report",
    authMiddleware,
    upload.single("resume"),
    generateInterviewReport
);

module.exports = router;