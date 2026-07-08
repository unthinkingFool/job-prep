import { createContext, useContext, useState } from "react";

export const AIContext = createContext();

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
};

export const AIProvider = ({ children }) => {
  const [interviewReport, setInterviewReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);

  return (
    <AIContext.Provider value={{ interviewReport, setInterviewReport, loading, setLoading, reports, setReports }}>
      {children}
    </AIContext.Provider>
  );
};