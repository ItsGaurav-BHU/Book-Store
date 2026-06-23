import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [authUser, setAuthUser] = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const [sticky, setSticky] = useState(false);
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      element.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      element.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync local search query state with search URL parameter changes
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem("Users");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === "") {
      navigate(location.pathname === "/course" ? "/course" : location.pathname, { replace: true });
      return;
    }

    const isCoursePage = location.pathname === "/course";
    navigate(`/course?search=${encodeURIComponent(query)}`, { replace: isCoursePage });
  };

  const NavItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-pink-500 font-bold bg-transparent focus:text-pink-500"
              : "hover:text-pink-500 transition-colors duration-200"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/course"
          className={({ isActive }) =>
            isActive
              ? "text-pink-500 font-bold bg-transparent focus:text-pink-500"
              : "hover:text-pink-500 transition-colors duration-200"
          }
        >
          Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-pink-500 font-bold bg-transparent focus:text-pink-500"
              : "hover:text-pink-500 transition-colors duration-200"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        sticky
          ? "bg-base-100/90 backdrop-blur-md shadow-lg dark:bg-slate-900/90 dark:border-b dark:border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="navbar max-w-screen-2xl mx-auto px-4 md:px-20 py-3">
        {/* LEFT / LOGO */}
        <div className="navbar-start">
          {/* MOBILE MENU */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-slate-800 dark:text-slate-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 dark:bg-slate-900 rounded-box mt-3 w-52 p-3 shadow-2xl border border-slate-200/50 dark:border-slate-800"
            >
              {NavItems}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-pink-500 to-indigo-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
            BookStore
          </Link>
        </div>

        {/* CENTER NAVIGATION */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 font-medium">
            {NavItems}
          </ul>
        </div>

        {/* RIGHT CONTROLS */}
        <div className="navbar-end gap-3">
          {/* SEARCH INPUT */}
          <div className="hidden sm:block relative">
            <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-pink-500 transition-all duration-200">
              <input
                type="search"
                placeholder="Search books..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="outline-none text-sm text-slate-900 dark:text-white bg-transparent placeholder-slate-450 dark:placeholder-slate-400 w-36 md:w-48"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 text-slate-500 dark:text-slate-450"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* SHOPPING CART INDICATOR */}
          <button
            role="button"
            className="btn btn-ghost btn-circle hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-slate-700 dark:text-slate-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="badge badge-sm badge-secondary indicator-item font-bold bg-pink-500 border-none text-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
          </button>

          {/* DARK MODE TOGGLE */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="btn btn-ghost btn-circle hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              // SUN ICON
              <svg className="h-6 w-6 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Z"/>
              </svg>
            ) : (
              // MOON ICON
              <svg className="h-6 w-6 fill-current text-slate-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z"/>
              </svg>
            )}
          </button>

          {/* USER PROFILE OR LOGIN */}
          {authUser ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar placeholder bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none"
              >
                <div className="text-neutral-content rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {authUser.fullname ? authUser.fullname.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-base-100 dark:bg-slate-900 rounded-box w-56 border border-slate-200/50 dark:border-slate-800 space-y-2"
              >
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <p className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate">
                    {authUser.fullname}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {authUser.email}
                  </p>
                </div>
                <li>
                  <button
                    className="btn btn-error btn-sm w-full text-white font-medium hover:bg-red-600 border-none mt-2"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn bg-pink-500 text-white border-none hover:bg-pink-600 transition-all duration-300 shadow-md font-semibold px-5 rounded-full"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Login
            </button>
          )}
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Navbar;