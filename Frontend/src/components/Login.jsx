import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [authUser, setAuthUser] = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      // In a real production environment, this should point to import.meta.env.VITE_API_URL
      const res = await axios.post("http://localhost:4001/user/login", userInfo);
      if (res.data) {
        toast.success("Logged in Successfully");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        setAuthUser(res.data.user);
        
        // Close modal
        const modal = document.getElementById("my_modal_3");
        if (modal) {
          modal.close();
        }
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
    <div>
      <dialog id="my_modal_3" className="modal backdrop-blur-sm">
        <div className="modal-box bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-8 relative">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Close button */}
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
              onClick={() => {
                const modal = document.getElementById("my_modal_3");
                if (modal) modal.close();
              }}
            >
              ✕
            </button>

            <h3 className="font-bold text-2xl mb-6">Login</h3>

            {/* Email */}
            <div className="mt-4 space-y-1">
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Email</label>
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
            <div className="mt-5 space-y-1">
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

            {/* Footer / Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
              <button className="btn bg-pink-500 text-white hover:bg-pink-600 border-none px-6 rounded-full font-semibold w-full sm:w-auto">
                Login
              </button>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Not registered?{" "}
                <Link
                  to="/signup"
                  onClick={() => {
                    const modal = document.getElementById("my_modal_3");
                    if (modal) modal.close();
                  }}
                  className="underline text-pink-500 hover:text-pink-600 font-medium transition-colors"
                >
                  Signup
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
