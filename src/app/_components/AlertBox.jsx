import React from "react";

export default function AlertBox({ onClose }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="p-12 relative animate-bounce">
        <div></div>
        <div className="text-center">
          <div className="text-3xl font-bold mb-4">🌟 You did it! 🌟</div>
          <button
            onClick={onClose}
            className="bg-Utility hover:bg-SecondaryBlue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
