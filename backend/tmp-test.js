const { generateAnalysis } = require('./src/services/ai.service');
(async () => {
  try {
    const result = await generateAnalysis({
      resumeText: 'Software engineer with React and Node experience',
      selfDescription: 'I am a full stack developer',
      jobDescription: 'Need a React and Node engineer'
    });
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('ERROR:', err && err.message);
    console.error(err);
    process.exit(1);
  }
})();
