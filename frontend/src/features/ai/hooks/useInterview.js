import {generateInterviewReport,getInterviewReport,getAllInterviewReports} from "../services/interview.api";
import {useContext} from "react";
import {AIContext} from "../ai.context";


export const useInterview = () => {
  
    const context = useContext(AIContext);
    if (!context) {
        throw new Error("useInterview must be used within an AIProvider");
    }

    const{ interviewReport, setInterviewReport, loading, setLoading, reports, setReports} = context;

    const generateReport = async (resumeFile, selfDescription, jobDescription) => {
        setLoading(true);
        try {
            const response = await generateInterviewReport({ resume: resumeFile, selfDescription, jobDescription });
            const normalizedReport = response?.report ?? response;
            setInterviewReport(normalizedReport);
            return normalizedReport;
        } catch (error) {
            console.error("Error generating interview report:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchReportID = async (interviewID) => {
        setLoading(true);
        try {
            const response = await getInterviewReport(interviewID);
            const normalizedReport = response?.report ?? response;
            setInterviewReport(normalizedReport);
            return normalizedReport;
        } catch (error) {
            console.error("Error fetching interview report:", error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    };

    const fetchAllReports = async () => {
        setLoading(true);
        try {
            const allReports = await getAllInterviewReports();
            setReports(allReports);
            return allReports;
        } catch (error) {
            console.error("Error fetching all interview reports:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        interviewReport,
        loading,
        reports,
        generateReport,
        fetchReportID,
        fetchAllReports
    };
  



}