import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 min-h-screen pt-28 flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center flex-grow py-10">
          <div className="w-full max-w-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700/50">
            <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
              Contact Us
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-350">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg outline-none bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-350">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg outline-none bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-350">
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Type your message"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg outline-none bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-pink-500 text-white font-semibold py-2.5 rounded-lg hover:bg-pink-600 shadow-md hover:scale-101 active:scale-99 transition-all duration-200 border-none mt-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Contact;