"use client";

import Header from "../_components/_header";
import NavBar from "../_components/NavBar";

export default function Goals() {
  return (
    <>
      <Header />
      <NavBar />
      <UserGoalWeight />
      <UserCardioGoals />
      <UserDietGoals />
    </>
  );
}

// show user's weight goals "I currently weigh ___ and I want to weigh ___ by ___."
const UserGoalWeight = () => {
  return (
    <div className="flex justify-center items-center pt-12">
      <div className="bg-blue-950 p-8 rounded-lg text-center text-white">
        <p className="text-lg font-bold">
          I currently weigh ___ and I want to weigh 150 lbs by 12/31/2021.
        </p>
      </div>
    </div>
  );
};

// show user's cardio goals "I currently run ___ miles per week and I want to run ___ miles per week."
const UserCardioGoals = () => {
  return (
    <div className="flex justify-center items-center pt-12">
      <div className="bg-blue-950 p-8 rounded-lg text-center text-white">
        <p className="text-lg font-bold">
          I currently run 10 miles per week and I want to run 20 miles per week.
        </p>
      </div>
    </div>
  );
};

// show user's diet goals "I currently eat ___ calories per day and I want to eat ___ calories per day."
const UserDietGoals = () => {
  return (
    <div className="flex justify-center items-center pt-12">
      <div className="bg-blue-950 p-8 rounded-lg text-center text-white">
        <p className="text-lg font-bold">
          I currently eat 2000 calories per day and I want to eat 1500 calories
          per day.
        </p>
      </div>
    </div>
  );
};
