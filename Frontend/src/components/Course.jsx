import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CardSkeleton = () => (
  <div className="mt-6 my-3 px-3">
    <div className="card w-full bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-slate-700/50 rounded-2xl overflow-hidden flex flex-col h-[380px] animate-pulse">
      <div className="bg-slate-100 dark:bg-slate-900/60 h-48 w-full"></div>
      <div className="card-body p-5 flex flex-col justify-between flex-grow">
        <div className="space-y-3">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-full w-1/3"></div>
        </div>
      </div>
    </div>
  </div>
);

function Course() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const searchVal = searchParams.get("search") || "";
  const debouncedSearchVal = useDebounce(searchVal, 300);

  useEffect(() => {
    const getBooks = async () => {
      try {
        setLoading(true);
        // Note: In production, URL should come from import.meta.env.VITE_API_URL
        const res = await axios.get("http://localhost:4001/book");
        setBooks(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load the book list. Please make sure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };
    getBooks();
  }, []);

  useEffect(() => {
    if (debouncedSearchVal.trim() === "") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (b) =>
          b.name.toLowerCase().includes(debouncedSearchVal.toLowerCase()) ||
          b.title.toLowerCase().includes(debouncedSearchVal.toLowerCase()) ||
          (b.category && b.category.toLowerCase().includes(debouncedSearchVal.toLowerCase()))
      );
      setFilteredBooks(filtered);
    }
  }, [debouncedSearchVal, books]);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 min-h-screen flex flex-col items-center justify-center text-center pt-28">
          <div className="p-8 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 max-w-md shadow-lg">
            <div className="text-4xl mb-3">⚠️</div>
            <h2 className="text-xl font-bold text-red-750 dark:text-red-400 mb-2">Error Loading Books</h2>
            <p className="text-sm text-red-650 dark:text-red-450/80 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn bg-pink-500 hover:bg-pink-600 text-white border-none rounded-full px-6 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 min-h-screen pt-28 flex flex-col justify-between">
        <div className="flex-grow">
          {/* Header section */}
          <div className="items-center justify-center text-center">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              We're delighted to have you{" "}
              <span className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent"> Here! :)</span>
            </h1>
            <p className="mt-8 text-slate-555 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              Browse our complete catalog of professional books and courses. Expand your skills,
              dive into new technologies, and continue your learning journey with our curated collections.
            </p>
            <Link to="/">
              <button className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-600 shadow-md hover:scale-103 active:scale-97 transition-all duration-200">
                Back to Home
              </button>
            </Link>
          </div>

          {/* Grid listing */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
            {loading ? (
              // Display 8 skeletons while loading
              Array.from({ length: 8 }).map((_, idx) => <CardSkeleton key={idx} />)
            ) : filteredBooks.length === 0 ? (
              // Empty State
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-4 animate-bounce">📚</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No Books Found</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
                  We couldn't find any books matching "{searchVal}". Try checking for typos or searching a different term.
                </p>
              </div>
            ) : (
              // Display filtered books
              filteredBooks.map((item) => (
                <Cards key={item._id || item.id} item={item} />
              ))
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Course;
