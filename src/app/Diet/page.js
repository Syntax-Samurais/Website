// /*
// 1.	User goal displayed at top of page
// 2.	Each day of week will have option for user to input daily calorie intake which updates
//     dashboard/home page pie chart
// 3.	User can update daily weight which will reflect on the dashboard/home page weight
// */

"use client";
import "./diet.css";
import React, { useState, useEffect } from "react";
import Header from "../_components/Header";
import NavBar from "../_components/NavBar";
import { globalId } from "../_components/_modals/LoginModal.jsx";

export default function Cardio() {
  const [pastWeight, setPastWeight] = useState([]);
  useEffect(() => {
    const res = fetch(`/api/Diet/Day?id=10`)
      .then((res) => res.json())
      .then((data) => setPastWeight(data));
    // setPastWeight(result);
  }, [pastWeight]);

  return (
    <>
      <Header />
      <NavBar />
      <UserGoalCalories />
      <div className="flex justify-center mt-12">
        <div className="mx-24">
          <ScrollableBox pastEntries={pastWeight} />
        </div>
        <div className="mx-24">
          <Box />
        </div>
      </div>
    </>
  );
}

const UserGoalCalories = () => {
  const [calories_goal, setCaloriesGoal] = useState(0);
  useEffect(() => {
    const setCalories = async () => {
      try {
        const res = await fetch(`/api/Diet?id=10`);
        const result = await res.json();
        setCaloriesGoal(result[0].goal_calorie_intake);
        // setTempItems(tempItems);
      } catch (e) {
        console.warn(`Couldnt fetch item`, e);
      }
    };
    setCalories();
  }, []);

  return (
    <div id="diet_goal_container">
      <div>
        <p>I want to eat {calories_goal} calories each day.</p>
      </div>
    </div>
  );
};

const ScrollableBox = ({ pastEntries }) => {
  // if (!pastEntries) return null;

  return (
    <>
      <h1 className="text-center text-white text-xl mb-4">Run History</h1>
      <div className="bg-PrimaryBlue w-96 max-h-80 rounded-lg text-white border border-black overflow-auto">
        <div className="p-4">
          <ul className="list list-inside">
            {/* Maps through past runs and displays them */}
            {pastEntries ? (
              <>
                {pastEntries.map((entry, index) => (
                  <div className="border mb-1 rounded-lg">
                    <li key={index} className="mb-2 text-center">
                      <strong>{entry.date.split("T")[0]}</strong>
                    </li>
                    <li className="text-center mb-1">
                      {" "}
                      Calories: {entry.calories} | Weight: {entry.weight}
                    </li>
                  </div>
                ))}
              </>
            ) : (
              <li>No entries found</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

//function `Box` is a placeholder for the new entry form
const Box = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = e.target.elements.date.value;

    const weight = e.target.elements.current_weight.value;
    const calories = e.target.elements.current_calories.value;
    // console.log(date, weight, calories);
    try {
      const response = await fetch(`/api/Diet/Day`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 10,
          currentDate: date,
          weight: weight,
          calories: calories,
        }),
      });

      e.target.elements.current_weight.value = "";
      e.target.elements.current_calories.value = "";
      e.target.elements.date.value = "";

      // let data = await response.json();
      // console.log(data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Posting error: ", error);
    }
  };

  return (
    <>
      <h1 className="text-center text-white text-xl mb-4">New Entry</h1>
      <div className="bg-PrimaryBlue w-96 h-fit rounded-lg text-center text-white border border-black">
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="date" className="block text-left text-white">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full rounded-md p-2 text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-left text-white">
                Current Weight
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  id="current_weight"
                  name="current_weight"
                  placeholder="in pounds"
                  className="w-full rounded-md p-2 text-black"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="miles_ran" className="block text-left text-white">
                Calories Consumed
              </label>
              <input
                type="text"
                id="current_calories"
                name="current_calories"
                className="w-full rounded-md p-2 text-black"
                placeholder="calories"
              />
            </div>
            <button
              type="submit"
              className="bg-SecondaryBlue text-white p-2 rounded-md w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
