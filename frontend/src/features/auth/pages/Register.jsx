import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {

  const navigate=useNavigate();

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const {loading,handleRegister}=useAuth()

  const handleSubmit= async (e)=>{
    e.preventDefault()
    await handleRegister({username, email, password})
    navigate("/")
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl top-20 left-20"></div>
        <div className="absolute w-80 h-80 bg-violet-600/20 rounded-full blur-3xl bottom-20 right-20"></div>

        {/* Loading Card */}
        <div className="relative z-10 flex flex-col items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-12 py-10 shadow-2xl">
          {/* Spinner */}
          <div className="w-14 h-14 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin"></div>

          <h2 className="mt-6 text-2xl font-semibold text-white">Loading...</h2>

          <p className="mt-2 text-slate-400 text-center">
            Preparing your JobPrep AI experience.
          </p>
        </div>
      </main>
    );
  }

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

          <form autoComplete="off" className="mt-10 space-y-6" onSubmit={handleSubmit}>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Username
              </label>

              <input
                onChange={(e)=>{setusername(e.target.value)}}
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
                onChange={(e)=>{setemail(e.target.value)}}
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
                onChange={(e)=>{setpassword(e.target.value)}}
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