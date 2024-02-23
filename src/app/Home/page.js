"use client";

import { La_Belle_Aurore } from "next/font/google";
import React, { useState } from "react";
import BarChart from "@/_components/BarChart";
import LineChart from "@/_components/LineChart";
import PieChart from "@/_components/PieChart";
import { UserData } from "../Data";

const Home = () => {
  const [sliderColor, setSliderColor] = useState("#000000");
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.usersGained),
        backgroundColor: ["#1861a5", "#b8c0cd"],
        borderColor: "#2e2f2e",
        borderWidth: 1,
      },
    ],
  });
  return (
    <>
      <header className="bg-purple-700 bg-opacity-75 px-6 text-white py-2">
        <h1 className="text-lg font-semibold justify-start">FitFusion</h1>
      </header>
      <section className="w-screen flex justify-center mt-10">
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
      </section>
      {/* /* -------------------------Chart JS-----------------------*/}
      <section className="flex justify-center h-screen">
        <div className="w-1/4 relative top-40 right-30 mr-20">
          <PieChart chartData={userData} />
          <h1>Calorie Goal</h1>
        </div>
        <div className="w-1/4 relative top-40 right-30">
          <PieChart chartData={userData} />
          <h1>Calorie Goal</h1>
        </div>
      </section>
      <section className="flex justify-center h-screen">
        <div className="w-1/2 relative top-40 right-30 mr-20">
          <LineChart chartData={userData} />
        </div>
      </section>
    </>
  );
};

export default Home;
