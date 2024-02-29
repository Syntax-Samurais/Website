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
  const [userInterests, setUserInterests] = useState({
    gain_weight: false,
    improve_pace: false,
    increase_running: false,
    increase_weight: false,
    lose_weight: false,
    maintain_weight: false,
  });

  const [currentMiles, setCurrentMiles] = useState(0);
  const [currentCalories, setCurrentCalories] = useState(0);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const res = await fetch(`/api/Goals?id=${globalId}`);
        const data = await res.json();
        console.log("Goals data: ", data);
        setGoalWeight(data.goals[0].goal_weight);
        setInitialCalories(data.goals[0].initial_calorie_intake);
        setGoalCalorieIntake(data.goals[0].goal_calorie_intake);
        setInitialMiles(data.goals[0].initial_weekly_miles);
        setGoalMiles(data.goals[0].goal_weekly_miles);
        setCurrentWeight(data.weightHistory[0].weight);
        setUserInterests({ ...data.userInterests[0] });
        setCurrentMiles(data.runHistory[0].miles);
        let calorieSum = 0;
        if (data.calorieHistory.length != 0)
          data.calorieHistory.map((entry) => {
            calorieSum += entry.calories;
          });
        let avgCalories = calorieSum / data.calorieHistory.length;
        setCurrentCalories(Math.floor(avgCalories));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchingData();
  }, []);

  return (
    <>
      <div>
        <Header />
        <NavBar />
        <GoalRibbon goalWeight={goalWeight} currentWeight={currentWeight} />
        <GoalRibbon
          currentCalories={currentCalories}
          initialCalories={initialCalories}
          goal_calorie_intake={goal_calorie_intake}
        />
        {userInterests.increase_running || userInterests.improve_pace ? (
          <GoalRibbon initialMiles={initialMiles} goalMiles={goalMiles} />
        ) : null}
      </div>
    </>
  );
};

const GoalRibbon = (props) => {
  const [goalText, setGoalText] = useState(<p></p>);
  let weightText = (
    <p>
      I currently weigh {props.currentWeight} lbs, and I want to weigh{" "}
      {props.goalWeight} lbs!
    </p>
  );
  let cardioText = (
    <p>
      I currently run {props.initialMiles} miles, I want to run{" "}
      {props.goalMiles} miles!
    </p>
  );
  let calorieText = (
    <p>
      I currently eat{" "}
      {props.currentCalories == 0
        ? props.initialCalories
        : props.currentCalories}{" "}
      calories, I want to eat {props.goal_calorie_intake} calories!
    </p>
  );

  useEffect(() => {
    if (props.goalWeight != undefined) {
      setGoalText(weightText);
    } else if (props.initialCalories != undefined) {
      setGoalText(calorieText);
    } else {
      setGoalText(cardioText);
    }
  }, [props]);

  return (
    <div className="goal-wrapper">
      <div>
        <p>{goalText}</p>
        <button>
          <p>Modify</p>
        </button>
      </div>
    </div>
  );
};

export default Goals;
