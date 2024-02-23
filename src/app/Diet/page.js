"use client";
import React, { useState } from "react";

const Day = (props) => {
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");

  function changeWeight(e) {
    setWeight(e.target.value);
  }

  function changeCalories(e) {
    setCalories(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log({ weight: weight, calories: calories });
  }

  return (
    <div className="border border-gray-400 w-72 m-2 h-64 primary rounded-xl">
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
      <div className="mt-10 m-auto w-fit primary px-64 text-xl">
        I will eat __ calories every day
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
