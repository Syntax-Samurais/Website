"use client";

import { La_Belle_Aurore } from "next/font/google";
import React, { useState } from "react";

const Home = () => {
  const [sliderColor, setSliderColor] = useState("#000000");
  return (
    <>
      <header className="bg-purple-700 bg-opacity-75 px-6 text-white py-2">
        <h1 className="text-lg font-semibold justify-start">FitFusion</h1>
      </header>
      <main class="w-screen flex justify-center mt-10">
        <div className="grid grid-cols-4 gap-4 w-1/2 absolute ">
          <h1 className="text-black ml-5">Dashboard</h1>
          <h1 className="text-black ml-9">My Goals</h1>
          <h1 className="text-black ml-32">My Diet</h1>
          <h1 className="text-black ml-32">My Cardio</h1>
        </div>
        <input
          style={{ "--thumb-color": "#ffffff" }}
          type="range"
          min="0"
          max="100"
          value="50"
          className="w-1/2 h-9 bg-gray-200 rounded-full outline-none appearance-none"
        ></input>
      </main>
    </>
  );
};

export default Home;
