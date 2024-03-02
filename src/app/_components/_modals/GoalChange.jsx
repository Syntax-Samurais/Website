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
          <form>
            <div>
              <label
                htmlFor="goalWeight"
                className="block text-left text-white"
              >
                Goal Weight
              </label>
              <input
                type="number"
                id="goalWeight"
                name="goalWeight"
                className="w-full rounded-md p-2 text-black"
              />
            </div>
            <div>
              <label
                htmlFor="weightGoalDate"
                className="block text-left text-white"
              >
                Weight Goal Date
              </label>
              <input
                type="date"
                id="weightGoalDate"
                name="weightGoalDate"
                className="w-full rounded-md p-2 text-black"
              />
            </div>
            <div>
              <label
                htmlFor="goalCalories"
                className="block text-left text-white"
              >
                Goal Calories
              </label>
              <input
                type="number"
                id="goalCalories"
                name="goalCalories"
                className="w-full rounded-md p-2 text-black"
              />
            </div>
            <div>
              <label htmlFor="goalMiles" className="block text-left text-white">
                Goal Miles
              </label>
              <input
                type="number"
                id="goalMiles"
                name="goalMiles"
                className="w-full rounded-md p-2 text-black"
              />
            </div>
            <button
              type="submit"
              className="bg-SecondaryBlue text-white p-2 rounded-md w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
