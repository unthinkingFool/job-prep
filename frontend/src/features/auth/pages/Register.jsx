import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const navigate=useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* Left Section */}

      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 text-white relative overflow-hidden">

        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl top-20 left-10"></div>
        <div className="absolute w-80 h-80 bg-violet-600/20 rounded-full blur-3xl bottom-10 right-10"></div>

        <div className="relative z-10 max-w-lg">

          <p className="text-blue-400 font-semibold tracking-widest uppercase">
            JobPrep AI
          </p>

          <h1 className="text-5xl font-bold leading-tight mt-5">
            Build your career
            <span className="block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              with confidence.
            </span>
          </h1>

          <p className="mt-8 text-slate-400 leading-8 text-lg">
            Create your account and unlock AI-powered job search, resume
            optimization, interview preparation, and personalized learning
            roadmaps.
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex-1 flex items-center justify-center p-6 bg-slate-100">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-10">

          <div className="text-center">

            <h2 className="text-4xl font-bold text-slate-900">
              Create Account
            </h2>

            <p className="mt-3 text-slate-500">
              Start your AI-powered career journey.
            </p>

          </div>

          <form className="mt-10 space-y-6">

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter your username"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <button className="w-full rounded-xl bg-slate-900 py-3.5 font-semibold text-white transition hover:bg-slate-800">
              Create Account
            </button>

          </form>

          <p className="mt-8 text-center text-slate-500">
            Already have an account?
            <Link to={"/login"}><span className="ml-2 cursor-pointer font-semibold text-blue-600 hover:text-blue-700">
              Login
            </span></Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;