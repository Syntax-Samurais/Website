"use client";

import React, { useState, useEffect } from "react";
import Header from "../_components/Header.jsx";
import NavBar from "../_components/NavBar.jsx";
import { globalId } from "../_components/_modals/LoginModal.jsx";
import "./goals.css";

const Goals = () => {
  const [currentWeight, setCurrentWeight] = useState(0);
  const [goalWeight, setGoalWeight] = useState(0);
  const [initialCalories, setInitialCalories] = useState(0);
  const [goal_calorie_intake, setGoalCalorieIntake] = useState(0);
  const [initialMiles, setInitialMiles] = useState(0);
  const [goalMiles, setGoalMiles] = useState(0);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const res = await fetch(`/api/Goals?id=${globalId}`);
        const data = await res.json();
        console.log("Goals data: ", data);
        setGoalWeight(data[0].goal_weight);
        setInitialCalories(data[0].initial_calorie_intake);
        setGoalCalorieIntake(data[0].goal_calorie_intake);
        setInitialMiles(data[0].initial_weekly_miles);
        setGoalMiles(data[0].goal_weekly_miles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchingData();
  }, []);

  return (
    <div>
      <Header />
      <NavBar />
      <UserWeightGoal goalWeight={goalWeight} />
      <UserCalorieGoal
        initialCalories={initialCalories}
        goal_calorie_intake={goal_calorie_intake}
      />
      <UserCardioGoal initialMiles={initialMiles} goalMiles={goalMiles} />
    </div>
  );
};

const UserWeightGoal = ({ goalWeight }) => {
  return (
    <div className="goal-wrapper">
      <div>
        <p>I want to weigh {goalWeight} lbs!</p>
        <button>
          <p>Modify</p>
        </button>
      </div>
    </div>
  );
};

const UserCalorieGoal = ({ initialCalories, goal_calorie_intake }) => {
  return (
    <div className="goal-wrapper">
      <div>
        <p>
          I currently eat {initialCalories} calories, I want to eat{" "}
          {goal_calorie_intake} calories!
        </p>
        <button>
          <p>Modify</p>
        </button>
      </div>
    </div>
  );
};

const UserCardioGoal = ({ initialMiles, goalMiles }) => {
  return (
    <div className="goal-wrapper">
      <div>
        <p>
          I currently run {initialMiles} miles, I want to run {goalMiles} miles!
        </p>
        <button>
          <p>Modify</p>
        </button>
      </div>
    </div>
  );
};

export default Goals;
