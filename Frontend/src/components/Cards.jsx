import React from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

function Cards({ item }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const isInCart = cart.some((cartItem) => cartItem._id === item._id);

  const handleCartClick = (e) => {
    e.preventDefault();
    if (isInCart) {
      removeFromCart(item._id);
      toast.success(`${item.name} removed from cart`);
    } else {
      addToCart(item);
      toast.success(`${item.name} added to cart`);
    }
  };

  return (
    <div className="mt-6 my-3 px-3">
      <div className="card w-full bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 dark:border-slate-700/50 rounded-2xl overflow-hidden flex flex-col h-[380px]">
        {/* Book Image */}
        <figure className="bg-slate-50 dark:bg-slate-900/60 p-4 h-48 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-700/30">
          <img
            src={item.image || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300"}
            alt={item.name}
            className="h-full max-w-full object-contain hover:scale-108 transition-transform duration-300"
            loading="lazy"
          />
        </figure>

        {/* Card Content */}
        <div className="card-body p-5 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex justify-between items-start gap-2">
              <h2 className="font-bold text-lg leading-tight truncate-2-lines text-slate-800 dark:text-slate-100" title={item.name}>
                {item.name}
              </h2>
              <span className="badge badge-sm bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 border-none shrink-0 font-medium px-2 py-2">
                {item.category}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2" title={item.title}>
              {item.title}
            </p>
          </div>

          {/* Action Row */}
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-xl font-extrabold text-slate-850 dark:text-slate-100">
              ${item.price}
            </span>

            <button
              onClick={handleCartClick}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                isInCart
                  ? "bg-slate-100 dark:bg-slate-700 hover:bg-red-50 hover:text-red-650 hover:border-red-200 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                  : "bg-transparent border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
              }`}
            >
              {isInCart ? "Remove" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;