import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Course from "./components/Course";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import NotFound from "./pages/NotFound";
import CartDrawer from "./components/CartDrawer";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser, setAuthUser] = useAuth();

  return (
    <>
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-200">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Course /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Global Cart Slide-over */}
        <CartDrawer />
        
        {/* React Toast Alerts */}
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </>
  );
}

export default App;
