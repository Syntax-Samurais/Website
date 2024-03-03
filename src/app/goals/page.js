"use client";

import React, { useState, useEffect } from "react";
import Header from "../_components/Header.jsx";
import NavBar from "../_components/NavBar.jsx";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import GoalChange from "../_components/_modals/GoalChange.jsx";

import "./goals.css";

const Goals = () => {
  const router = useRouter();
  let cookieUser = Cookies.get("user");
  const globalId = cookieUser;

  useEffect(() => {
    if (cookieUser === 0 || cookieUser === null) {
      router.push(`/`);
    }
  }, [globalId, router]);

  const [showModal, setShowModal] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [goalWeight, setGoalWeight] = useState(0);
  const [weight_goal_date, setWeightGoalDate] = useState(0);
  const [initialCalories, setInitialCalories] = useState(0);
  const [goal_calorie_intake, setGoalCalorieIntake] = useState(0);
  const [initialMiles, setInitialMiles] = useState(0);
  const [goalMiles, setGoalMiles] = useState(0);
  const [userInterests, setUserInterests] = useState({
    gain_weight: false,
    improve_pace: false,
    increase_running: false,
    increase_weight: false,
    lose_weight: false,
    maintain_weight: false,
  });
  const [currentMiles, setCurrentMiles] = useState(null);
  const [currentCalories, setCurrentCalories] = useState(0);

  const handleOpenModal = () => {
    console.log("open modal clicked");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const res = await fetch(`/api/Goals?id=${globalId}`);
        const data = await res.json();
        setGoalWeight(data.goals[0].goal_weight);
        setWeightGoalDate(data.goals[0].weight_goal_date);
        try {
          setInitialCalories(data.goals[0].initial_calorie_intake);
          setGoalCalorieIntake(data.goals[0].goal_calorie_intake);
          setInitialMiles(data.goals[0].initial_weekly_miles);
          setGoalMiles(data.goals[0].goal_weekly_miles);
          setCurrentWeight(data.weightHistory[0].weight);
          setUserInterests({ ...data.userInterests[0] });
          let mileSum = 0;
          data.runHistory[0].forEach((entry) => {
            mileSum += entry.miles;
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
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchingData();
  }, [showModal]);

  return (
    <>
      <div>
        <Header />
        <NavBar />
        {showModal && (
          <GoalChange
            handleCloseModal={handleCloseModal}
            showModal={showModal}
          />
        )}
        {userInterests.increase_weight ||
        userInterests.gain_weight ||
        userInterests.lose_weight ||
        userInterests.maintain_weight ? (
          <GoalRibbon
            goalWeight={goalWeight}
            currentWeight={currentWeight}
            handleCloseModal={handleCloseModal}
            showModal={showModal}
            handleOpenModal={handleOpenModal}
          />
        ) : null}
        {userInterests.increase_weight ||
        userInterests.gain_weight ||
        userInterests.lose_weight ||
        userInterests.maintain_weight ? (
          <GoalRibbon
            currentCalories={currentCalories}
            initialCalories={initialCalories}
            goal_calorie_intake={goal_calorie_intake}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            showModal={showModal}
          />
        ) : null}

        {userInterests.increase_running || userInterests.improve_pace ? (
          <GoalRibbon
            initialMiles={initialMiles}
            goalMiles={goalMiles}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            showModal={showModal}
          />
        ) : null}
      </div>
    </>
  );
};

const GoalRibbon = ({
  currentWeight,
  goalWeight,
  initialMiles,
  goalMiles,
  currentCalories,
  initialCalories,
  goal_calorie_intake,
  currentMiles,
  handleOpenModal,
}) => {
  const [goalText, setGoalText] = useState("");
  let weightText = `I currently weigh ${currentWeight} lbs, I want to weigh ${goalWeight} lbs!`;
  let calorieText = `I currently eat ${currentCalories} calories, I want to eat ${goal_calorie_intake} calories!`;
  let cardioText = `I currently run ${currentMiles !== null ? currentMiles : initialMiles} miles, I want to run ${goalMiles} miles!`;
  console.log("currentMiles line 155 of goal page:", currentMiles);

  useEffect(() => {
    if (goalWeight != undefined) {
      setGoalText(weightText);
    } else if (initialCalories != undefined) {
      setGoalText(calorieText);
    } else {
      setGoalText(cardioText);
    }
  }, [
    goalWeight,
    initialCalories,
    initialMiles,
    goalMiles,
    currentCalories,
    currentMiles,
    currentWeight,
    goal_calorie_intake,
  ]);

  return (
    <div className="goal-wrapper">
      <div>
        <p>{goalText}</p>
        <button onClick={handleOpenModal}>
          <p>Modify</p>
        </button>
      </div>
    </div>
  );
};

export default Goals;
