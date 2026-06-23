import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post("http://localhost:4001/user/signup", userInfo);
      if (res.data) {
        toast.success("Signup Successfully");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        setAuthUser(res.data.user);
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900 transition-colors duration-200 px-4">
        <div className="w-full max-w-md relative">
          <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700/50 relative">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Home / Close button */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-750"
              >
                ✕
              </Link>

              <h3 className="font-bold text-2xl mb-6">Signup</h3>

              {/* Name */}
              <div className="mt-4 space-y-1">
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Name</label>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg outline-none bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  {...register("fullname", { required: "Name is required" })}
                />
                {errors.fullname && (
                  <span className="text-xs text-red-500 block mt-1">
                    {errors.fullname.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="mt-4 space-y-1">
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-3-0">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg outline-none bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-xs text-red-500 block mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="mt-4 space-y-1">
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg outline-none bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && (
                  <span className="text-xs text-red-500 block mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
                <button className="btn bg-pink-500 text-white hover:bg-pink-600 border-none px-6 rounded-full font-semibold w-full sm:w-auto">
                  Signup
                </button>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Have account?{" "}
                  <button
                    type="button"
                    className="underline text-pink-500 hover:text-pink-600 font-medium transition-colors"
                    onClick={() => {
                      const modal = document.getElementById("my_modal_3");
                      if (modal) modal.showModal();
                    }}
                  >
                    Login
                  </button>{" "}
                </p>
              </div>
            </form>
            {/* Modal portal helper */}
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
