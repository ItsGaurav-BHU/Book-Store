import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./Cards";

// Right Arrow
function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white w-10 h-10 rounded-full cursor-pointer z-10 flex items-center justify-center shadow-lg border-none transition-all active:scale-95"
      onClick={onClick}
      aria-label="Next slide"
    >
      ▶
    </button>
  );
}

// Left Arrow
function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white w-10 h-10 rounded-full cursor-pointer z-10 flex items-center justify-center shadow-lg border-none transition-all active:scale-95"
      onClick={onClick}
      aria-label="Previous slide"
    >
      ◀
    </button>
  );
}

function Freebook() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBook = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:4001/book");
        const data = res.data.filter((data) => data.category === "Free");
        setBook(data);
      } catch (error) {
        console.error("Error fetching free books:", error);
      } finally {
        setLoading(false);
      }
    };

    getBook();
  }, []);

  const settings = {
    dots: true,
    infinite: book.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, book.length),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, book.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, book.length),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-16">
      <div>
        <h2 className="font-extrabold text-2xl pb-2 bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent inline-block">
          Free Offered Courses
        </h2>
        <p className="text-slate-555 dark:text-slate-400 mt-2 text-sm leading-relaxed max-w-2xl">
          Get started on your learning journey with our top free books and resources. No payment required.
        </p>
      </div>

      <div className="mt-8 relative px-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="card bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-slate-700/50 rounded-2xl p-4 h-[380px] animate-pulse">
                <div className="bg-slate-100 dark:bg-slate-900/60 h-40 w-full rounded-xl"></div>
                <div className="space-y-3 mt-4">
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                  <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-full w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : book.length === 0 ? (
          <div className="py-12 text-center text-slate-500 dark:text-slate-400">
            No free courses available at the moment.
          </div>
        ) : (
          <Slider {...settings}>
            {book.map((item) => (
              <div key={item._id || item.id}>
                <Cards item={item} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default Freebook;