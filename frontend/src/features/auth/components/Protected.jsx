import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">

        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl top-20 left-20"></div>
        <div className="absolute w-80 h-80 bg-violet-600/20 rounded-full blur-3xl bottom-20 right-20"></div>

        <div className="relative z-10 flex flex-col items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-12 py-10 shadow-2xl">

          <div className="w-14 h-14 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin"></div>

          <h2 className="mt-6 text-2xl font-semibold text-white">
            Loading...
          </h2>

          <p className="mt-2 text-slate-400">
            Preparing your JobPrep AI experience.
          </p>

        </div>

      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;