import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";

function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isCartOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
      aria-hidden={!isCartOpen}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Slide-over panel */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl transition-transform duration-300 ease-out transform flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <span className="badge badge-secondary font-bold bg-pink-500 text-white border-none">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="btn btn-sm btn-circle btn-ghost text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label="Close cart drawer"
          >
            ✕
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <span className="text-5xl mb-4">🛒</span>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-250">Your Cart is Empty</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xs">
                Looks like you haven't added any books to your cart yet. Explore our course pages to find some!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn bg-pink-500 hover:bg-pink-600 text-white border-none rounded-full px-6 font-semibold mt-6"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-150 dark:border-slate-700/30 transition-all duration-200"
              >
                {/* Book Image */}
                <div className="w-16 h-20 bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300"}
                    alt={item.name}
                    className="h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate" title={item.name}>
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 truncate mb-1">
                    {item.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-pink-500">
                      ${item.price}
                    </span>
                    
                    {/* Quantity selectors */}
                    <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-full px-2 py-0.5 bg-white dark:bg-slate-800">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="text-slate-550 dark:text-slate-450 hover:text-pink-500 font-bold px-1"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="text-slate-550 dark:text-slate-450 hover:text-pink-500 font-bold px-1"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="btn btn-ghost btn-circle btn-sm text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                  aria-label="Remove item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer info (only if cart has items) */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 space-y-4">
            <div className="flex justify-between items-center text-slate-800 dark:text-slate-100 font-bold">
              <span>Subtotal</span>
              <span className="text-xl text-pink-500 font-extrabold">${cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-normal">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="btn btn-outline btn-error rounded-full px-5 flex-1 text-sm font-semibold"
              >
                Clear Cart
              </button>
              <button
                onClick={() => {
                  alert("Checkout integration is coming soon!");
                }}
                className="btn bg-pink-500 hover:bg-pink-600 border-none text-white rounded-full px-6 flex-1 text-sm font-semibold shadow-md"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
