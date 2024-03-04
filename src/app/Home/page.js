"use client";
import React, { useState, useEffect } from "react";
import NavBar from "../_components/NavBar.jsx";
import Header from "../_components/Header.jsx";
import PieChart from "../_components/PieChart";
import LineChart from "../_components/LineChart";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Home = () => {
  const router = useRouter();
  let cookieUser = Cookies.get("user");
  const globalId = cookieUser;

  useEffect(() => {
    if (cookieUser === 0 || cookieUser === null) {
      router.push(`/`);
    }
  }, [globalId, router]);
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
  const [goalWeight, setGoalWeight] = useState(0);
  const [weeklyRunGoal, setRunGoal] = useState(0);
  const [totalMilesRan, setMilesRan] = useState(0);
  const [weeklyCalorieGoal, setCalorieGoal] = useState(0);
  const [totalCaloriesConsumed, setCaloriesConsumed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/Home?id=${globalId}`);
        const tempItems = await res.json();
        console.log(tempItems);

        let weekRunGoal = tempItems.goals[0].goal_weekly_miles;
        let totMilesRan = 0;
        tempItems.runData.map((run) => (totMilesRan += Number(run.miles_ran)));
        setRunGoal(weekRunGoal);
        setMilesRan(totMilesRan);

        let mileCompletionColor = "#1861A5";
        let chartBGColor = "#718199";
        if (totMilesRan > weekRunGoal) {
          mileCompletionColor = "#00ff00";
          chartBGColor = "#1861A5";
        } else if (totMilesRan === weekRunGoal) {
          mileCompletionColor = "#1861A5";
          chartBGColor = "#1861A5";
        } else {
          mileCompletionColor = "#1861A5";
          chartBGColor = "#718199";
        }
        setMileChartData({
          labels: ["Miles Ran", "Miles To Goal"],
          datasets: [
            {
              data: [
                totMilesRan,
                weekRunGoal - totMilesRan <= 0 ? 0 : weekRunGoal - totMilesRan,
              ],
              backgroundColor: [mileCompletionColor, chartBGColor],
              borderColor: "#2e2f2e",
              borderWidth: 1,
            },
          ],
        });

        let weekCalGoal = tempItems.goals[0].goal_calorie_intake * 7;
        let totCalConsumed = 0;
        tempItems.calorieData.map(
          (meal) => (totCalConsumed += Number(meal.calories)),
        );
        setCalorieGoal(weekCalGoal);
        setCaloriesConsumed(totCalConsumed);

        let calorieCompletionColor = "#1861A5";
        let calChartBGColor = "#718199";
        if (totCalConsumed > weekCalGoal) {
          calorieCompletionColor = "#ff0000"; // Change to red if exceeded goal
          calChartBGColor = "#1861A5";
        } else if (totCalConsumed === weekCalGoal) {
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
                totCalConsumed,
                weekCalGoal - totCalConsumed <= 0
                  ? 0
                  : weekCalGoal - totCalConsumed,
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
          const date = entry.date.slice(0, 10);
          entryDates.push(date);
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

  const renderCalories = () => {
    if (weeklyCalorieGoal === 0 || weeklyCalorieGoal === null) {
      return (
        <h1 className="text-PrimaryGrey space-y-2 mr-32 pr-32">
          No Data Found!<br></br>Click
          <span className="text-PrimaryBlue font-bold underline">
            <a href="/goals"> here</a>
          </span>{" "}
          to set<br></br> a goal.
        </h1>
      );
    } else {
      return (
        <div className="flex flex-col h-auto w-1/4 justify-center mr-16 pr-16">
          <div className="flex h-3/4 justify-center">
            <div className="w-32 h-32 flex justify-center content-center self-center absolute rounded-full bg-PrimaryGrey shadow-lg">
              <span className="text-center self-center font-bold text-white">
                {totalCaloriesConsumed}/<br></br>
                {weeklyCalorieGoal}
              </span>
            </div>
            <PieChart chartData={calorieChartData} />
          </div>
          <span className="text-center py-4 text-white font-medium text-3xl">
            Calorie Goal
          </span>
        </div>
      );
    }
  };
  const renderMilesRan = () => {
    if (weeklyRunGoal === 0 || weeklyRunGoal === null) {
      return (
        <h1 className="text-PrimaryGrey space-y-2 ml-32 pl-32">
          No Run Data Found!<br></br>Click
          <span className="text-PrimaryBlue font-bold underline">
            <a href="/goals"> here</a>
          </span>{" "}
          to set<br></br>a new goal.
        </h1>
      );
    } else {
      return (
        <div className="flex flex-col h-auto w-1/4 justify-center ml-16 pl-16">
          <div className="flex h-3/4 justify-center">
            <div className="w-32 h-32 flex justify-center content-center self-center absolute rounded-full bg-PrimaryGrey shadow-lg">
              <span className="text-center self-center font-bold text-white">
                {totalMilesRan}/<br></br>
                {weeklyRunGoal}
              </span>
            </div>
            <PieChart chartData={mileChartData} />
          </div>
          <span className="text-center py-4 text-white font-medium text-3xl">
            Miles Ran
          </span>
        </div>
      );
    }
  };

  return (
    <>
      <Header />
      <NavBar />
      {/* /* -------------------------Chart JS-----------------------*/}
      <section className="flex justify-center flex-col h-full w-screen mt-16">
        <div className="flex relative h-96 w-full m-auto justify-center">
          {renderCalories()}
          {renderMilesRan()}
        </div>
        <div className="flex justify-center w-3/4 h-80 m-auto">
          <LineChart chartData={WeightChartData} goalWeight={160} />
        </div>
      </section>
    </>
  );
};

export default Home;
