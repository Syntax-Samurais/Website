"use client";

import { La_Belle_Aurore } from "next/font/google";
import React, { useState } from "react";
import NavBar from "../_components/NavBar.jsx";
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
      <NavBar />
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
