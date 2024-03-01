"use client";

import { La_Belle_Aurore } from "next/font/google";
import React, { useState, useEffect } from "react";
import NavBar from "../_components/NavBar.jsx";
import Header from "../_components/Header.jsx";
import PieChart from "../_components/PieChart";
import LineChart from "../_components/LineChart";
import { globalId } from "../_components/_modals/LoginModal.jsx";

const Home = () => {
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
  const [weeklyRunGoalState, setRunGoal] = useState(25);
  const [totalMilesRan, setMilesRan] = useState(0);
  const [weeklyCalorieGoal, setCalorieGoal] = useState(25);
  const [totalCaloriesConsumed, setCaloriesConsumed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/Home?id=${globalId}`);
        const tempItems = await res.json();
        console.log(tempItems);

        // let weeklyRunGoal = tempItems.goals[0].goal_weekly_miles;
        let weeklyRunGoal = 29;
        let totalMilesRan = 0;
        tempItems.runData.map(
          (run) => (totalMilesRan += Number(run.miles_ran)),
        );
        setRunGoal(weeklyRunGoal);
        setMilesRan(totalMilesRan);

        let mileCompletionColor = "#1861A5";
        let chartBGColor = "#718199";
        if (totalMilesRan > weeklyRunGoal) {
          mileCompletionColor = "#00ff00";
          chartBGColor = "#1861A5";
        } else if (totalMilesRan === weeklyRunGoal) {
          mileCompletionColor = "#1861A5";
          chartBGColor = "#1861A5";
        } else {
          mileCompletionColor = "#1861A5";
          chartBGColor = "#718199";
        }
        console.log(` The weekly run goal is : ${weeklyRunGoal}`);
        setMileChartData({
          labels: ["Miles Ran", "Miles To Goal"],
          datasets: [
            {
              // label: "Users Gained",
              data: [
                totalMilesRan,
                weeklyRunGoal - totalMilesRan <= 0
                  ? 0
                  : weeklyRunGoal - totalMilesRan,
              ],
              //tempItems.map((data) => data.username),
              backgroundColor: [mileCompletionColor, chartBGColor],
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
        setCalorieGoal(weeklyCalorieGoal);
        setCaloriesConsumed(totalCaloriesConsumed);

        let calorieCompletionColor = "#1861A5";
        let calChartBGColor = "#718199";
        if (totalCaloriesConsumed > weeklyCalorieGoal) {
          calorieCompletionColor = "#ff0000"; // Change to red if exceeded goal
          calChartBGColor = "#1861A5";
          alert("YOU ARE A FAT ASS, Lose Some Weight!!!");
        } else if (totalCaloriesConsumed === weeklyCalorieGoal) {
          calorieCompletionColor = "#1861A5";
          calChartBGColor = "#1861A5";
        } else {
          calorieCompletionColor = "#1861A5";
          calChartBGColor = "#718199";
        }
        setCalorieChartData({
          labels: ["Calorie Consumed", "Calories Remaining"],
          datasets: [
            {
              data: [
                totalCaloriesConsumed,
                weeklyCalorieGoal - totalCaloriesConsumed,
              ],

              backgroundColor: [calorieCompletionColor, calChartBGColor],
              borderColor: "#2e2f2e",
              borderWidth: 1,
            },
          ],
        });

        setGoalWeight(tempItems.goals[0].goal_weight);
        let entryDates = [];
        let weightEntries = [];
        tempItems.weightData.map((entry) => {
          entryDates.push(entry.date);
          weightEntries.push(Number(entry.weight));
        });
        setWeightChartData({
          labels: entryDates,
          datasets: [
            {
              label: "Weight Entries",
              data: weightEntries,
              borderColor: "#1861A5",
            },
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
      <section className="flex justify-center flex-col h-full w-screen mt-16">
        <div className="flex relative h-96 w-full m-auto justify-center">
          <div className="flex flex-col h-auto w-1/4 justify-center">
            <div className="flex h-3/4 justify-center">
              <div className="w-32 h-32 flex justify-center content-center self-center absolute rounded-full bg-PrimaryGrey shadow-lg">
                <span className="text-center self-center font-bold text-white">
                  {totalCaloriesConsumed}/<br></br>
                  {weeklyCalorieGoal}
                </span>
              </div>
              <PieChart chartData={calorieChartData} />
            </div>
            <span className="text-center py-4 text-3xl text-white font-medium">
              Calorie Goal
            </span>
          </div>
          <div className="flex flex-col h-auto w-1/4 justify-center">
            <div className="flex h-3/4 justify-center">
              <div className="w-32 h-32 flex justify-center content-center self-center absolute rounded-full bg-PrimaryGrey shadow-lg">
                <span className="text-center self-center font-bold text-white">
                  {totalMilesRan}/<br></br>
                  {weeklyRunGoalState}
                </span>
              </div>
              <PieChart chartData={mileChartData} />
            </div>
            <span className="text-center py-4 text-white font-medium text-3xl">
              Miles Ran
            </span>
          </div>
        </div>
        <div className="flex justify-center w-3/4 h-80 m-auto">
          <LineChart chartData={WeightChartData} goalWeight={160} />
        </div>
      </section>
    </>
  );
};

export default Home;
