import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-200 px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-9xl font-black text-pink-500 animate-pulse tracking-widest">
          404
        </h1>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Page Not Found
          </h2>
          <p className="text-sm text-slate-555 dark:text-slate-400 leading-normal max-w-xs mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div>
          <Link
            to="/"
            className="btn bg-pink-500 hover:bg-pink-600 border-none text-white rounded-full px-8 font-semibold shadow-md inline-block transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
