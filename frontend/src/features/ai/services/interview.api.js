import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/ai",
  withCredentials: true,
});

export async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  try {
    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);

    const response = await api.post(
      "/interview/generate-report",
      formData
    );

    return response.data;
  } catch (error) {
    console.error("Generate Report Error:", error);
    throw error;
  }
}

export async function getInterviewReport(interviewID) {
  try {
    const response = await api.get(`/interview/${interviewID}`);
    return response.data;
  } catch (error) {
    console.error("Fetch Report Error:", error);
    throw error;
  }
}

export async function getAllInterviewReports() {
  try {
    const response = await api.get("/interview/reports");
    return response.data;
  } catch (error) {
    console.error("Fetch Reports Error:", error);
    throw error;
  }
}