"use client";

import React, { useState, useEffect } from "react";
import Header from "../_components/Header.jsx";
import NavBar from "../_components/NavBar.jsx";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import GoalChange from "../_components/_modals/GoalChange.jsx";

import "./goals.css";
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
      const result = await res.json();
      console.log("Result from patch request", result);
      if (!res.ok) {
        throw new Error("Network response not ok");
      }
      fetchingData();
    } catch (error) {
      console.error("Patching error: ", error);
    }
  };

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const res = await fetch(`/api/Goals?id=${globalId}`);
        const data = await res.json();
        setGoalWeight(data.goals[0].goal_weight);
        setWeightGoalDate(data.goals[0].weight_goal_date);
        setInitialCalories(data.goals[0].initial_calorie_intake);
        setGoalCalorieIntake(data.goals[0].goal_calorie_intake);
        setInitialMiles(data.goals[0].initial_weekly_miles);
        setGoalMiles(data.goals[0].goal_weekly_miles);
        setCurrentWeight(data.weightHistory[0].weight);
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
            className="flex flex-col bg-PrimaryBlue text-white font-bold py-2 px-4 rounded-full border-white border-2 justify-center items-center mt-8 mb-0 hover:bg-SecondaryBlue hover:border-SecondaryBlue"
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
            <GoalRibbon
              goalWeight={goalWeight}
              gain_weight={gain_weight}
              lose_weight={lose_weight}
              maintain_weight={maintain_weight}
              weight_goal_date={weight_goal_date}
              currentWeight={currentWeight}
              handleCloseModal={handleCloseModal}
              showModal={showModal}
              handleOpenModal={handleOpenModal}
            />
          ) : null}
          {gain_weight || lose_weight || maintain_weight ? (
            <GoalRibbon
              gain_weight={gain_weight}
              lose_weight={lose_weight}
              maintain_weight={maintain_weight}
              currentCalories={currentCalories}
              initialCalories={initialCalories}
              goal_calorie_intake={goal_calorie_intake}
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
              showModal={showModal}
            />
          ) : null}

          {increase_running ? (
            <GoalRibbon
              initialMiles={initialMiles}
              currentMiles={currentMiles}
              goalMiles={goalMiles}
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
              showModal={showModal}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

const GoalRibbon = ({
  currentWeight,
  weight_goal_date,
  goalWeight,
  initialMiles,
  goalMiles,
  currentCalories,
  initialCalories,
  goal_calorie_intake,
  currentMiles,
  handleOpenModal,
  lose_weight,
  gain_weight,
  maintain_weight,
  increase_running,
}) => {
  // Set a div for each goal type that displays the time for each goal. i.e. the weight goal will display the time until the goal is reached. The calorie goal will disply that it is a daily goal. The running goal will display that it is a weekly goal.
  const [goalText, setGoalText] = useState("");
  let weightText = "";
  if (lose_weight && currentWeight <= goalWeight) {
    weightText = `I met my goal of ${goalWeight}lbs and now weigh ${currentWeight}lbs!`;
  } else if (gain_weight && currentWeight > goalWeight) {
    weightText = `I met my goal of ${goalWeight}lbs and now weigh ${currentWeight}lbs!`;
  } else {
    weightText = `I currently weigh ${currentWeight} lbs, I want to weigh ${goalWeight} lbs!`;
  }
  let calorieText = "";
  if (currentCalories <= goal_calorie_intake) {
    calorieText = `I met my goal of ${goal_calorie_intake} calories and I averaged ${currentCalories} calories this week!`;
  } else {
    calorieText = `My daily average this week  is ${currentCalories - goal_calorie_intake} calories over my goal of ${goal_calorie_intake} cal/day.`;
  }
  let cardioText = "";
  if (currentMiles >= goalMiles) {
    cardioText = `I met my goal of ${goalMiles} miles and I ran ${currentMiles} miles this week!`;
  } else {
    cardioText = `I currently run ${currentMiles !== null ? currentMiles : initialMiles} miles, I want to run ${goalMiles} miles!`;
  }

  // Take weight_goal_date and convert to a displayble date in format Month Day, Year
  let displayDate = new Date(weight_goal_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [bannerText, setBannerText] = useState("");
  let weightBanner = `DATE GOAL: ${displayDate}`;
  let calorieBanner = `DAILY GOAL`;
  let cardioBanner = `WEEKLY GOAL`;

  useEffect(() => {
    if (goalWeight != undefined) {
      setBannerText(weightBanner);
      setGoalText(weightText);
    } else if (initialCalories != undefined) {
      setBannerText(calorieBanner);
      setGoalText(calorieText);
    } else {
      setBannerText(cardioBanner);
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
    weight_goal_date,
    gain_weight,
    lose_weight,
    maintain_weight,
    increase_running,
  ]);

  return (
    <div className="goal-wrapper">
      <div>
        <div className="flex flex-col w-full h-full bg-PrimaryBlue hover:bg-SecondaryBlue">
          <button className="border-2 border-white p-2 mb-4 bg-Utility cursor-pointer">
            <p className="flex flex-wrap text-center  md:text-lg text-sm font-bold text-black">
              {bannerText}
            </p>
          </button>
          <p className="flex flex-wrap text-center text-lg font-bold pb-0.5">
            {goalText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Goals;
