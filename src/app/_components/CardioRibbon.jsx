"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CardioRibbon({
  initialMiles,
  goalMiles,
  currentMiles,
  showModal,
}) {
  const [cardioText, setCardioText] = useState("");

  useEffect(() => {
    updateCardioText();
  }, [goalMiles, currentMiles, showModal]);

  function updateCardioText() {
    if (currentMiles >= goalMiles) {
      setCardioText(
        `I met my goal of ${goalMiles} miles and I ran ${currentMiles} miles this week!`,
      );
    } else {
      setCardioText(
        `I currently run ${currentMiles !== null ? currentMiles : initialMiles} miles, I want to run ${goalMiles} miles!`,
      );
    }
  }

  return (
    <div className="flex flex-wrap justify-center items-center pt-12">
      <div>
        <div className="flex flex-col justify-center items-center text-white bg-PrimaryBlue border-[50px] border-transparent border-r-[#2e2f2e] border-l-[#2e2f2e] w-[70vw] h-[15vh] hover:bg-SecondaryBlue">
          <div className="border-2 border-white p-2 mb-4 bg-Utility">
            <p className="flex flex-wrap text-center md:text-lg text-sm font-bold text-black">
              WEEKLY GOAL
            </p>
          </div>
          <span className="text-center self-center font-bold text-white">
            {currentMiles === 0 && goalMiles === 0 ? (
              <>
                <p>No Cardio Records Found This Week</p>
                <Link
                  className="text-white flont-Bold underline"
                  href="/cardio"
                >
                  Update My Cardio
                </Link>
              </>
            ) : (
              <>
                <p className="flex flex-wrap text-center md:text-lg text-sm font-bold pb-0.5">
                  {cardioText}
                </p>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
