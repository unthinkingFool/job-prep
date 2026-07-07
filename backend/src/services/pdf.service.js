const pdf = require("pdf-parse");

async function extractResumeText(fileBuffer) {
    const data = await pdf(fileBuffer);

    return data.text.trim();
}

module.exports = {
    extractResumeText,
};