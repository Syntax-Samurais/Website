"use client";
import React, { useState, useEffect } from "react";
import NavBar from "../_components/NavBar.jsx";
import Header from "../_components/Header.jsx";
import PieChart from "../_components/PieChart";
import LineChart from "../_components/LineChart";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

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
    return (
      <div className="flex flex-col justify-center w-full md:w-1/2">
        <div className="flex justify-center content-center">
          <div className="flex aspect-square justify-center self-center h-72 w-72 bg-slate-500 rounded-full text-center">
            <div className="w-32 h-32 flex justify-center content-center self-center absolute rounded-full bg-PrimaryGrey shadow-lg">
              <span className="text-center self-center font-bold text-white">
                {weeklyCalorieGoal === 0 || weeklyCalorieGoal === null ? (
                  <>
                    <p>
                      No Calorie <br></br> Data Found
                    </p>
                    <div className="py-1"></div>
                    <Link
                      className="text-PrimaryBlue font-bold underline"
                      href="/goals"
                    >
                      Set a goal
                    </Link>
                  </>
                ) : (
                  <>
                    {totalCaloriesConsumed} /<br />
                    {weeklyCalorieGoal}
                  </>
                )}
              </span>
            </div>
            <PieChart chartData={calorieChartData} />
          </div>
        </div>
        <div className="text-center mt-4 text-white font-medium text-3xl">
          Weekly Calories Consumed
        </div>
      </div>
    );
  };
  const renderMilesRan = () => {
    return (
      <div className="flex flex-col justify-center w-full md:w-1/2 py-20 md:py-0">
        <div className="flex justify-center content-center">
          <div className="flex aspect-square justify-center self-center h-72 w-72 bg-slate-500 rounded-full text-center">
            <div className="w-32 h-32 flex justify-center content-center self-center absolute rounded-full bg-PrimaryGrey shadow-lg">
              <span className="text-center self-center font-bold text-white">
                {weeklyRunGoal === 0 || weeklyRunGoal === null ? (
                  <>
                    <p>No Run Data Found!</p>
                    <div className="py-1"></div>
                    <Link
                      className="text-PrimaryBlue font-bold underline"
                      href="/goals"
                    >
                      Set a goal
                    </Link>
                  </>
                ) : (
                  <>
                    {totalMilesRan} /<br />
                    {weeklyRunGoal}
                  </>
                )}
              </span>
            </div>
            <PieChart chartData={mileChartData} />
          </div>
        </div>
        <div className="text-center mt-4 text-white font-medium text-3xl">
          Miles Ran
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <NavBar />
      <section className="w-full sm:w-3/4 h-fit sm:h-4/5 flex flex-col flex-wrap flex-1 mt-16 m-auto max-w-navWrap">
        <div className="flex flex-row flex-wrap h-fit sm:h-96 w-full mx-auto">
          {renderCalories()}
          {renderMilesRan()}
          <LineChart chartData={WeightChartData} goalWeight={goalWeight} />
        </div>
        {/* <div className="flex justify-center h-80 w-full md:mt-8">
         
        </div> */}
      </section>
    </>
  );
};

export default Home;
