"use client";

import React, { useState, useEffect } from "react";

export default function GoalChange({ showModal, handleCloseModal }) {
  const handleClose = () => {
    handleCloseModal();
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ${
          showModal ? "" : "hidden"
        }`}
      >
        <div className="bg-sky-900 p-8 rounded-md relative mx-4 my-4 sm:mx-8 sm:my-8 lg:mx-16 lg:my-16">
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
