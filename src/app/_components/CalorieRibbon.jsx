"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CalorieRibbon({
  initialCalories,
  goal_calorie_intake,
  currentCalories,
  showModal,
}) {
  const [calorieText, setCalorieText] = useState("");

  useEffect(() => {
    updatecalorieText();
  }, [currentCalories, showModal, goal_calorie_intake]);

  function updatecalorieText() {
    if (currentCalories <= goal_calorie_intake) {
      setCalorieText(
        `I met my goal of ${goal_calorie_intake} calories and I ate ${currentCalories} calories this week!`,
      );
    } else {
      setCalorieText(
        `This week I averaged ${currentCalories - goal_calorie_intake} calories over my goal of ${goal_calorie_intake} calories.`,
      );
    }
  }

  console.log("CalorieRibbon: initialCalories", initialCalories);
  console.log("CalorieRibbon: currentCalories", currentCalories);

  return (
    <div className="flex flex-wrap justify-center items-center pt-12">
      <div>
        <div className="flex flex-col justify-center items-center text-white bg-PrimaryBlue border-[50px] border-transparent border-r-[#2e2f2e] border-l-[#2e2f2e] w-[70vw] h-[15vh] hover:bg-SecondaryBlue">
          <div className="border-2 border-white p-2 mb-4 bg-Utility">
            <p className="flex flex-wrap text-center md:text-lg text-sm font-bold text-black">
              DAILY GOAL
            </p>
          </div>
          <span className="text-center self-center font-bold text-white">
            {currentCalories == 0 ? (
              <>
                <p>No Calorie Records Found This Week</p>
                <Link className="text-white flont-Bold underline" href="/Diet">
                  Update My Calories
                </Link>
              </>
            ) : (
              <>
                <p className="flex flex-wrap text-center md:text-lg text-sm font-bold pb-0.5">
                  {calorieText}
                </p>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
