"use client";

import React from "react";

export default function GoalChange({ showModal, handleCloseModal }) {
  const handleClose = () => {
    handleCloseModal();
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ${
          showModal ? "" : "hidden"
        }`}
        onClick={handleClose}
      >
        <div
          className="bg-sky-900 p-8 rounded-md relative mx-auto my-auto w-3/4 h-3/4 sm:w-2/3 sm:h-2/3"
          onClick={handleClick}
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-white"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold text-center mb-12">
            Welcome <br /> Back
          </h2>
        </div>
      </div>
    </>
  );
}
