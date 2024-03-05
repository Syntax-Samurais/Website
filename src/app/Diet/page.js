"use client";
import "./diet.css";
import React, { useState, useEffect } from "react";
import Header from "../_components/Header";
import NavBar from "../_components/NavBar";
// import { globalId } from "../_components/_modals/LoginModal.jsx";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Diet() {
  const router = useRouter();
  let cookieUser = Cookies.get("user");
  const globalId = cookieUser;

  useEffect(() => {
    if (cookieUser === 0 || cookieUser === null) {
      router.push(`/`);
    }
  }, [globalId, router]);

  const [pastWeight, setPastWeight] = useState([]);
  useEffect(() => {
    const res = fetch(`/api/Diet/Day?id=${globalId}`)
      .then((res) => res.json())
      .then((data) => setPastWeight(data));
    // setPastWeight(result);
  }, [pastWeight]);

  const [calories_goal, setCaloriesGoal] = useState(0);
  useEffect(() => {
    const setCalories = async () => {
      try {
        const res = await fetch(`/api/Diet?id=${globalId}`);
        const result = await res.json();
        // setCaloriesGoal(null);
        setCaloriesGoal(result[0].goal_calorie_intake);
        // setTempItems(tempItems);
      } catch (e) {
        console.warn(`Couldnt fetch item`, e);
      }
    };
    setCalories();
  }, []);

  return (
    <>
      <Header />
      <NavBar />
      {/* if calories goal is null then show big div that says set a weight and calorie goal to view this page */}
      <UserGoalCalories calories_goal={calories_goal} />
      <div className="flex justify-center mt-12">
        <div className="mx-24">
          <ScrollableBox pastEntries={pastWeight} globalId={globalId} />
        </div>
        <div className="mx-24">
          <Box globalId={globalId} />
        </div>
      </div>
    </>
  );
}

const UserGoalCalories = ({ calories_goal }) => {
  return (
    <div id="diet_goal_container">
      <div>
        {calories_goal !== null ? (
          <p>I want to eat {calories_goal} calories each day.</p>
        ) : (
          <p>No calorie goal set.</p>
        )}
      </div>
    </div>
  );
};

const ScrollableBox = ({ pastEntries, globalId }) => {
  // if (!pastEntries) return null;
  function handleDelete(e) {
    // alert("deleted" )
    console.log(e.target.id);
    const res = fetch("api/Diet/Day", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: globalId,
        currentDate: pastEntries[e.target.id].date,
      }),
    });
  }

  // console.log(pastEntries)
  return (
    <>
      <h1 className="text-center text-white text-xl mb-4">
        Weight & Calorie History
      </h1>
      <div className="bg-PrimaryBlue w-96 max-h-80 rounded-lg text-white border border-black overflow-auto">
        <div className="p-4">
          <ul className="list list-inside divide-y divide-SecondaryGrey">
            {/* Maps through past runs and displays them */}
            {pastEntries.length !== 0 ? (
              <>
                {pastEntries.map((entry, index) => (
                  <React.Fragment key={index}>
                    <div className="flex justify-between">
                      <div className="">
                        <li className="my-1 text-left">
                          <strong>{entry.date.split("T")[0]}</strong>
                        </li>
                        <li className="text-center mb-1 text-sm">
                          {" "}
                          Calories: {entry.calories} | Weight: {entry.weight}
                        </li>{" "}
                      </div>
                      <button
                        id={index}
                        onClick={(e) => handleDelete(e)}
                        className="text-red-600 hover:text-red-800 focus:outline-none"
                      >
                        🗑️
                      </button>
                    </div>
                  </React.Fragment>
                ))}
              </>
            ) : (
              <li className="text-center">Make your first entry!</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

//function `Box` is a placeholder for the new entry form
const Box = ({ globalId }) => {
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
          user_id: globalId,
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
                  step="0.01"
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
