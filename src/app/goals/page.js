"use client";

import { La_Belle_Aurore } from "next/font/google";
import React, { useState, useEffect } from "react";
import NavBar from "../_components/NavBar.jsx";
import Header from "../_components/Header.jsx";
import { globalId } from "../_components/_modals/LoginModal.jsx";

const Goals = () => {
  const [currentWeight, setCurrentWeight] = useState(0);
  const [goalWeight, setGoalWeight] = useState(0);

  return (
    <div>
      <Header />
      <NavBar />
      <UserWeightGoal />
    </div>
  );
};

const UserWeightGoal = () => {
  return (
    <div className="flex justify-center items-center pt-12">
      <div className="bg-blue-950 p-8 rounded-lg text-center text-white">
        <p className="text-lg font-bold">
          I want to lose 10 pounds this month!
        </p>
        <button>
          <p className="text-lg font-bold">Modify</p>
        </button>
      </div>
    </div>
  );
};

export default Goals;
