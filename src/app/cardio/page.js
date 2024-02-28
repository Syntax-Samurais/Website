"use client";

import React, { useState, useEffect } from "react";
import Header from "../_components/Header";
import NavBar from "../_components/NavBar";
import { globalId } from "../_components/_modals/LoginModal.jsx";
import { useRouter } from "next/navigation";

import "./cardio.css";

export default function Cardio() {
  const [pastRuns, setPastRuns] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const res = await fetch(`/api/Cardio?id=${globalId}`);
        const data = await res.json();
        setPastRuns(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchingData();
  }, []);

  if (globalId === 0) {
    router.push("/");
  }

  return (
    <>
      <Header />
      <NavBar />
      <UserGoalMiles />
      <div className="flex justify-center mt-12 shadows-lg">
        <div className="mx-24">
          <ScrollableBox pastRuns={pastRuns} />
        </div>
        <div className="mx-24">
          <Box />
        </div>
      </div>
    </>
  );
}

// Fetches the user's weekly run goal from the database
const UserGoalMiles = () => {
  const [runGoal, setRunGoal] = useState("");

  useEffect(() => {
    const fetchRunGoal = async () => {
      try {
        const res = await fetch(`/api/Cardio?id=${globalId}&goal=weekly`);
        const data = await res.json();

        if (data && data.length > 0) {
          setRunGoal(data[0].goal_weekly_miles);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRunGoal();
  }, []);

  return (
    <div id="run_goal_container">
      <div>
        <p>I want to run {runGoal} miles every week!</p>
      </div>
    </div>
  );
};

const ScrollableBox = ({ pastRuns }) => {
  // If pastRuns is empty or undefined, render an empty box
  if (!pastRuns || pastRuns.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-center text-white text-2xl font-bold mb-4">
          Run History
        </h1>
        <div className="bg-PrimaryBlue w-96 max-h-80 rounded-lg text-white border border-black overflow-auto">
          <div className="p-4">
            <p className="text-center">No past runs recorded.</p>
          </div>
        </div>
      </div>
    );
  }

  // Sort past runs by date, most recent first
  const sortedPastRuns = pastRuns
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-white text-2xl font-bold mb-4">
        Run History
      </h1>
      <div className="bg-PrimaryBlue w-96 max-h-80 rounded-lg text-white border border-black overflow-auto">
        <div className="p-4">
          <ul className="divide-y divide-SecondaryGrey">
            {/* Map through past runs and display them */}
            {sortedPastRuns.map((run, index) => (
              <li key={index} className="py-2">
                <div className="flex justify-between">
                  <div>
                    <p className="text-lg font-semibold">
                      {run.date.split("T")[0]}
                    </p>
                    <p className="text-sm">Time Taken: {run.run_time}</p>
                    <p className="text-sm">Miles Ran: {run.miles_ran}</p>
                  </div>
                  {/* Delete Button */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

//function `Box` is a placeholder for the new entry form
const Box = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = e.target.elements.date.value;
    const hours = e.target.elements.run_hours.value.padStart(2, "0") || "00";
    const minutes =
      e.target.elements.run_minutes.value.padStart(2, "0") || "00";
    const seconds =
      e.target.elements.run_seconds.value.padStart(2, "0") || "00";

    const run_time = `${hours}:${minutes}:${seconds}`;
    const miles_ran = e.target.elements.miles_ran.value;

    try {
      const response = await fetch(`/api/Cardio?id=${globalId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
          run_time: run_time,
          miles_ran: miles_ran,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Clear input fields on successful post
      e.target.elements.date.value = "";
      e.target.elements.run_hours.value = "";
      e.target.elements.run_minutes.value = "";
      e.target.elements.run_seconds.value = "";
      e.target.elements.miles_ran.value = "";

      // Display alert on successful post
      alert("You did it");
    } catch (error) {
      console.error("Posting error: ", error);
    }
  };

  return (
    <>
      <h1 className="text-center text-white text-2xl font-bold mb-4">
        New Entry
      </h1>
      <div className="bg-PrimaryBlue w-96 max-h-80 rounded-lg flex flex-col justify-center items-center text-white border border-black">
        <form onSubmit={handleSubmit} className="w-full">
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
              <label className="block text-left text-white">Run Time</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  id="run_hours"
                  name="run_hours"
                  placeholder="Hours"
                  className="w-1/3 rounded-md p-2 text-black"
                />
                <input
                  type="number"
                  id="run_minutes"
                  name="run_minutes"
                  placeholder="Minutes"
                  className="w-1/3 rounded-md p-2 text-black"
                />
                <input
                  type="number"
                  id="run_seconds"
                  name="run_seconds"
                  placeholder="Seconds"
                  className="w-1/3 rounded-md p-2 text-black"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="miles_ran" className="block text-left text-white">
                Miles Ran
              </label>
              <input
                type="text"
                id="miles_ran"
                name="miles_ran"
                className="w-full rounded-md p-2 text-black"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-800 text-white p-2 rounded-md w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
