"use client";

import React, { useState, useEffect } from "react";
import Header from "../_components/Header.jsx";
import NavBar from "../_components/NavBar.jsx";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import GoalChange from "../_components/_modals/GoalChange.jsx";
import CardioRibbon from "../_components/CardioRibbon.jsx";
import WeightRibbon from "../_components/WeightRibbon.jsx";
import CalorieRibbon from "../_components/CalorieRibbon.jsx";

import { data } from "autoprefixer";

const Goals = () => {
  const router = useRouter();
  let cookieUser = Cookies.get("user");
  const globalId = cookieUser;

  useEffect(() => {
    if (cookieUser === 0 || cookieUser === null) {
      router.push(`/`);
    }
  }, [globalId, router]);

  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [goalWeight, setGoalWeight] = useState(0);
  const [weight_goal_date, setWeightGoalDate] = useState(0);
  const [initialCalories, setInitialCalories] = useState(0);
  const [goal_calorie_intake, setGoalCalorieIntake] = useState(0);
  const [initialMiles, setInitialMiles] = useState(0);
  const [goalMiles, setGoalMiles] = useState(0);
  const [gain_weight, setGainWeight] = useState(false);
  const [increase_running, setIncreaseRunning] = useState(false);
  const [lose_weight, setLoseWeight] = useState(false);
  const [maintain_weight, setMaintainWeight] = useState(false);
  const [currentMiles, setCurrentMiles] = useState(0);
  const [currentCalories, setCurrentCalories] = useState(0);

  const handleOpenModal = () => {
    console.log("open modal clicked");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInterestChange = (interest, isChecked) => {
    if (interest === "gain_weight") {
      setGainWeight(isChecked);
    } else if (interest === "increase_running") {
      setIncreaseRunning(isChecked);
    } else if (interest === "lose_weight") {
      setLoseWeight(isChecked);
    } else if (interest === "maintain_weight") {
      setMaintainWeight(isChecked);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      const res = await fetch(`/api/Goals/Change?id=${globalId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log("Result from patch request", result);

      fetchingData();
    } catch (error) {
      console.error("Patching error:", error);
    }
  };

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const res = await fetch(`/api/Goals?id=${globalId}`);
        const data = await res.json();

        setGoalWeight(data.goals[0].goal_weight);
        setWeightGoalDate(data.goals[0].weight_goal_date);

        data.goals?.[0]?.initial_calorie_intake &&
          setInitialCalories(data.goals[0].initial_calorie_intake);

        setGoalCalorieIntake(data.goals[0].goal_calorie_intake);

        data.goals[0].initial_weekly_miles === null
          ? setInitialMiles(0)
          : setInitialMiles(data.goals[0].initial_weekly_miles);

        data.goals[0].goal_weekly_miles === null
          ? setGoalMiles(0)
          : setGoalMiles(data.goals[0].goal_weekly_miles);

        if (data.weightHistory.length === 0) {
          setCurrentWeight(0);
        } else {
          setCurrentWeight(data.weightHistory[0].weight ?? 0);
        }

        if (data.userInterests && data.userInterests.length > 0) {
          setGainWeight(data.userInterests[0].gain_weight ?? false);
          setIncreaseRunning(data.userInterests[0].increase_running ?? false);
          setLoseWeight(data.userInterests[0].lose_weight ?? false);
          setMaintainWeight(data.userInterests[0].maintain_weight ?? false);
        }

        let mileSum = 0;
        data.runHistory.forEach((entry) => {
          mileSum += parseFloat(entry.miles_ran);
        });
        setCurrentMiles(mileSum);

        let calorieSum = 0;
        if (data.calorieHistory.length !== 0)
          data.calorieHistory.map((entry) => {
            calorieSum += entry.calories;
          });
        let avgCalories =
          data.calorieHistory.length !== 0
            ? calorieSum / data.calorieHistory.length
            : 0;
        setCurrentCalories(Math.floor(avgCalories));

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchingData();
    console.log("Fetching data for goals page");
  }, [showModal, globalId]);

  return (
    <>
      <div>
        <Header />
        <NavBar />
        {showModal && (
          <GoalChange
            handleCloseModal={handleCloseModal}
            showModal={showModal}
            gain_weight={gain_weight}
            increase_running={increase_running}
            lose_weight={lose_weight}
            maintain_weight={maintain_weight}
            goalWeight={goalWeight}
            weight_goal_date={weight_goal_date}
            goal_calorie_intake={goal_calorie_intake}
            goalMiles={goalMiles}
            handleInterestChange={handleInterestChange}
            handleFormSubmit={handleFormSubmit}
          />
        )}
        <div className="flex flex-col justify-center items-center">
          <button
            className="flex flex-col bg-PrimaryBlue text-white md:text-lg text-sm font-bold py-2 px-4 rounded-full border-white border-2 justify-center items-center mt-8 mb-0 hover:bg-SecondaryBlue hover:border-SecondaryBlue"
            onClick={handleOpenModal}
          >
            MODIFY GOALS
          </button>
          {isLoading ? (
            <div className="flex flex-col justify-center items-center">
              <p className="text-2xl font-bold text-white">
                Calculating Progress...
              </p>
            </div>
          ) : null}
          {gain_weight || lose_weight || maintain_weight ? (
            <>
              <WeightRibbon
                gain_weight={gain_weight}
                lose_weight={lose_weight}
                maintain_weight={maintain_weight}
                goalWeight={goalWeight}
                currentWeight={currentWeight}
                showModal={showModal}
                weight_goal_date={weight_goal_date}
              />
              <CalorieRibbon
                goal_calorie_intake={goal_calorie_intake}
                currentCalories={currentCalories}
                initialCalories={initialCalories}
                showModal={showModal}
              />
            </>
          ) : null}

          {increase_running ? (
            <CardioRibbon
              initialMiles={initialMiles}
              currentMiles={currentMiles}
              goalMiles={goalMiles}
              showModal={showModal}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Goals;
