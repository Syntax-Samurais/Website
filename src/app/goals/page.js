"use client";

import React, { useState, useEffect } from "react";
import Header from "../_components/Header.jsx";
import NavBar from "../_components/NavBar.jsx";
import { globalId } from "../_components/_modals/LoginModal.jsx";
import "./goals.css";
import GoalChange from "../_components/_modals/GoalChange.jsx";

const Goals = () => {
  const [showModal, setShowModal] = useState(false);
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

  const handleOpenModal = () => {
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
        {userInterests.increase_weight ||
        userInterests.gain_weight ||
        userInterests.lose_weight ||
        userInterests.maintain_weight ? (
          <GoalRibbon
            goalWeight={goalWeight}
            currentWeight={currentWeight}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            showModal={showModal}
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
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            showModal={showModal}
          />
        ) : null}

        {userInterests.increase_running || userInterests.improve_pace ? (
          <GoalRibbon
            initialMiles={initialMiles}
            goalMiles={goalMiles}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
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
  handleOpenModal,
  handleCloseModal,
  showModal,
  goal_calorie_intake,
}) => {
  const [goalText, setGoalText] = useState(<p></p>);
  let weightText = (
    <p>
      I currently weigh {currentWeight} lbs, and I want to weigh {goalWeight}{" "}
      lbs!
    </p>
  );
  let cardioText = (
    <p>
      I currently run {initialMiles} miles, I want to run {goalMiles} miles!
    </p>
  );
  let calorieText = (
    <p>
      I currently eat {currentCalories == 0 ? initialCalories : currentCalories}{" "}
      calories, I want to eat {goal_calorie_intake} calories!
    </p>
  );

  useEffect(() => {
    if (goalWeight != undefined) {
      setGoalText(weightText);
    } else if (initialCalories != undefined) {
      setGoalText(calorieText);
    } else {
      setGoalText(cardioText);
    }
  }, [goalWeight, initialCalories, initialMiles, goalMiles, currentCalories]);

  return (
    <div className="goal-wrapper">
      <div>
        <p>{goalText}</p>
        <button onClick={handleOpenModal}>
          <p>Modify</p>
          {showModal && <GoalChange onClose={handleCloseModal} />}
        </button>
      </div>
    </div>
  );
};

export default Goals;
