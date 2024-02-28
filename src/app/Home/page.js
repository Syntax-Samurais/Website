"use client";

import { La_Belle_Aurore } from "next/font/google";
import React, { useState, useEffect } from "react";
import NavBar from "../_components/NavBar.jsx";
import Header from "../_components/Header.jsx";
// import BarChart from "../_components/BarChart.js";
// import Header from "../_components/_header.jsx";
import PieChart from "../_components/PieChart";
import LineChart from "../_components/LineChart";
// import PieChart from "../_components/PieChart";
// import LineChart from "../_components/LineChart";
import { globalId } from "../_components/_modals/LoginModal.jsx";

const Home = () => {
  // console.log(globalId);
  const [sliderColor, setSliderColor] = useState("#000000");
  const defaultChar = {
    labels: [],
    datasets: [
      {
        label: "Loading User Data",
        data: [],
        backgroundColor: ["#1861a5", "#b8c0cd"],
        borderColor: "#2e2f2e",
        borderWidth: 1,
      },
    ],
  };

  const [mileChartData, setMileChartData] = useState(defaultChar);
  const [calorieChartData, setCalorieChartData] = useState(defaultChar);
  const [WeightChartData, setWeightChartData] = useState(defaultChar);
  const [goalWeight, setGoalWeight] = useState(150);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/Home?id=${globalId}`);
        const tempItems = await res.json();
        console.log(tempItems);

        let weeklyRunGoal = tempItems.goals[0].goal_weekly_miles;
        let totalMilesRan = 0;
        tempItems.runData.map(
          (run) => (totalMilesRan += Number(run.miles_ran)),
        );

        setMileChartData({
          labels: ["Miles Ran", "Goal Miles"],
          datasets: [
            {
              // label: "Users Gained",
              data: [totalMilesRan, weeklyRunGoal - totalMilesRan],
              //tempItems.map((data) => data.username),
              backgroundColor: ["#1861a5", "#b8c0cd"],
              borderColor: "#2e2f2e",
              borderWidth: 1,
            },
          ],
        });

        let weeklyCalorieGoal = tempItems.goals[0].goal_calorie_intake * 7;
        let totalCaloriesConsumed = 0;
        tempItems.calorieData.map(
          (meal) => (totalCaloriesConsumed += Number(meal.calories)),
        );

        setCalorieChartData({
          labels: ["Calorie Consumed", "Calorie Goal"],
          datasets: [
            {
              // label: "Users Gained",
              data: [
                totalCaloriesConsumed,
                weeklyCalorieGoal - totalCaloriesConsumed,
              ],
              //tempItems.map((data) => data.username),
              backgroundColor: ["#1861a5", "#b8c0cd"],
              borderColor: "#2e2f2e",
              borderWidth: 1,
            },
          ],
        });

        setGoalWeight(tempItems.goals[0].goal_weight);
        // let weeklyCalorieGoal = tempItems.goals[0].goal_calorie_intake * 7;
        // let totalCaloriesConsumed = 0;
        // tempItems.calorieData.map((meal) => totalCaloriesConsumed += Number(meal.calories))
        let entryDates = [];
        let weightEntries = [];
        tempItems.weightData.map((entry) => {
          entryDates.push(entry.date);
          weightEntries.push(Number(entry.weight));
        });

        // let weightEntries = [];
        // tempItems.weightData.map(
        //   (entry) => weightEntries.push(Number(entry.weight))
        // );

        setWeightChartData({
          labels: entryDates,
          datasets: [
            {
              label: "Weight Data",
              data: weightEntries,
            },
            // {
            //   label: "test",
            //   data: [
            //     150,
            //     100,
            //     120,
            //     90,
            //     60
            //   ],
            //   //tempItems.map((data) => data.username),
            //   backgroundColor: ["#1861a5", "#b8c0cd"],
            //   borderColor: "#2e2f2e",
            //   borderWidth: 1,
            // },
          ],
        });
        setLoading(false);
      } catch (e) {
        console.error(`Error fetching data: ${e}`);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Header />
      <NavBar />
      {/* /* -------------------------Chart JS-----------------------*/}
      <section className="flex flex-col justify-center h-full w-screen my-16">
        <div className="flex relative h-3/4 w-3/4 m-auto">
          <div className="flex flex-col h-auto w-1/2">
            <div className="flex h-3/4 justify-center">
              <div className="w-32 h-32 self-center absolute rounded-full bg-slate-500 shadow-xl"></div>
              <PieChart chartData={calorieChartData} />
            </div>
            <span className="text-center py-4 text-3xl text-white font-medium">
              Calorie Goal
            </span>
          </div>
          <div className="flex flex-col h-auto w-1/2">
            <div className="flex h-3/4 justify-center">
              <div className="w-32 h-32 self-center absolute rounded-full bg-slate-500 shadow-lg"></div>
              <PieChart chartData={mileChartData} />
            </div>
            <span className="text-center py-4 text-white font-medium text-3xl">
              Miles Ran
            </span>
          </div>
        </div>
        <div className="justify-center w-3/4 h-1/4 m-auto">
          <LineChart chartData={WeightChartData} goalWeight={160} />
        </div>
      </section>
    </>
  );
};

export default Home;
