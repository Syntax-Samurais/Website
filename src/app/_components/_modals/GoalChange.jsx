"use client";

import React, { useState, useEffect } from "react";

export default function GoalChange({ showModal, onClose }) {
  const [goal, setGoal] = useState("");
  const [newGoal, setNewGoal] = useState("");
  const [newGoal2, setNewGoal2] = useState("");

  const handleGoalChange = async (e) => {
    e.preventDefault();
    setGoal("");
    setNewGoal("");
    setNewGoal2("");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${
        showModal ? "" : "hidden"
      }`}
    >
      <div className="bg-sky-900 p-8 rounded-md relative pl-12 pr-12">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-12">Change Goal</h2>
        <form onSubmit={handleGoalChange}>
          <input
            type="text"
            placeholder="Current Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="block w-full text-white rounded-full bg-gray-300 bg-opacity-50 border-gray-300 px-4 py-2 mb-6 text-center"
          />
          <input
            type="text"
            placeholder="New Goal"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            className="block w-full text-white rounded-full bg-gray-300 bg-opacity-50 border-gray-300 px-4 py-2 mb-6 text-center"
          />
          <input
            type="text"
            placeholder="Confirm New Goal"
            value={newGoal2}
            onChange={(e) => setNewGoal2(e.target.value)}
            className="block w-full text-white rounded-full bg-gray-300 bg-opacity-50 border-gray-300 px-4 py-2 mb-6 text-center"
          />
          <button
            type="submit"
            className="block w-full text-white rounded-full bg-sky-500 px-4 py-2"
          >
            Change Goal
          </button>
        </form>
      </div>
    </div>
  );
}
