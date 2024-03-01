"use client";
import React, { useState, useEffect } from "react";
// import axios from "axios";
import NavBar from "../_components/NavBar";
import Header from "../_components/Header";
import { useUser } from "../_components/_modals/LoginModal.jsx";

const Day = (props) => {
  const { userId } = useUser();
  const globalId = userId;
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");

  function changeWeight(e) {
    setWeight(e.target.value);
  }

  function changeCalories(e) {
    setCalories(e.target.value);
  }

  async function onSubmit(e) {
    // console.log(weight, calories)
    // create JS date variable (look on MDN)

    // so it can be entered in as same format as Mark's in database
    // if date is already in database, UPDATE weight and calories
    // else if no date in database
    // POST or insert weight and calories into database

    e.preventDefault();
    try {
      const response = await fetch("/api/Diet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          weight: weight,
          calories: calories,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="border border-gray-400 w-72 m-2 h-64 bg-PrimaryBlue rounded-xl">
      <h1 className="text-center mb-10">{props.day}</h1>
      <form className="w-1/2 m-auto text-center">
        <label className="mt-20">Weight (lbs):</label>
        <input
          name="weight"
          className="w-full mb-3 secondary"
          type="text"
          onChange={changeWeight}
          required
        ></input>
        <label className="mt-10">Calories:</label>
        <input
          className="w-full secondary"
          type="text"
          onChange={changeCalories}
          required
        ></input>
        <button
          className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-md ml-2"
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const page = () => {
  const [calories_goal, setCaloriesGoal] = useState(0);
  useEffect(() => {
    const setCalories = async () => {
      try {
        const res = await fetch(`/api/Diet`);
        const result = await res.json();
        setCaloriesGoal(result[0].goal_calorie_intake);
        // setTempItems(tempItems);
      } catch (e) {
        console.warn(`Couldnt fetch item`, e);
      }
    };
    setCalories();
  }, []);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <>
      <Header />
      <NavBar />
      <div className="mt-10 m-auto w-fit primary px-64 text-xl">
        I will eat {calories_goal} calories every day
      </div>
      <div className="flex flex-wrap w-3/4 m-auto mt-4 justify-center ">
        {days.map((day, index) => (
          <Day key={index} day={day} />
        ))}
      </div>
    </>
  );
};

export default page;

/*
1.	User goal displayed at top of page
2.	Each day of week will have option for user to input daily calorie intake which updates 
    dashboard/home page pie chart
3.	User can update daily weight which will reflect on the dashboard/home page weight
*/
