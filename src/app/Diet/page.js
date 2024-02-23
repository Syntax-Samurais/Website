import React from "react";

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
      <div className="mt-10 m-auto w-fit primary">
        I will eat __ calories every day
      </div>
      <div className="flex flex-wrap w-3/4 m-auto mt-4 justify-center ">
        {days.map((day, index) => (
          <div
            className="border border-gray-400 w-72 m-2 h-64 primary rounded-xl"
            key={index}
          >
            <h1 className="text-center mb-10">{day}</h1>
            <form className="w-1/2 m-auto text-center">
              <label className="mt-20">Weight (lbs):</label>
              <input className="w-full mb-3 secondary" type="text"></input>
              <label className="mt-10">Calories:</label>
              <input className="w-full secondary" type="text"></input>
            </form>
          </div>
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
