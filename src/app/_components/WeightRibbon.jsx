"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function WeightRibbon({
  goalWeight,
  currentWeight,
  showModal,
  gain_weight,
  lose_weight,
  maintain_weight,
  weight_goal_date,
}) {
  const [weightText, setWeightText] = useState("");

  useEffect(() => {
    updateWeightText();
  }, [currentWeight, showModal, gain_weight, lose_weight, maintain_weight]);

  function updateWeightText() {
    if (
      (lose_weight && currentWeight <= goalWeight) ||
      (gain_weight && currentWeight >= goalWeight)
    ) {
      setWeightText(
        `I met my goal of ${goalWeight} lbs and now weigh ${currentWeight} lbs!`,
      );
    } else {
      setWeightText(
        `I currently weigh ${currentWeight !== null ? currentWeight : goalWeight} lbs, I want to weigh ${goalWeight} lbs!`,
      );
    }
  }

  // Take weight_goal_date and convert to a displayble date in format Month Day, Year
  let displayDate = new Date(weight_goal_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-wrap justify-center items-center pt-12">
      <div>
        <div className="flex flex-col justify-center items-center text-white bg-PrimaryBlue border-[50px] border-transparent border-r-[#2e2f2e] border-l-[#2e2f2e] w-[70vw] h-[15vh] hover:bg-SecondaryBlue">
          <div className="border-2 border-white p-2 mb-4 bg-Utility">
            <p className="flex flex-wrap text-center md:text-lg text-sm font-bold text-black">
              TARGET GOAL: {displayDate}
            </p>
          </div>
          <span className="text-center self-center font-bold text-white">
            {currentWeight === null ||
            currentWeight === undefined ||
            currentWeight === 0 ? (
              <>
                <p>No Weight Records Found This Week</p>
                <Link className="text-white flont-Bold underline" href="/Diet">
                  Update My Weight
                </Link>
              </>
            ) : (
              <>
                <p className="flex flex-wrap text-center md:text-lg text-sm font-bold pb-0.5">
                  {weightText}
                </p>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
