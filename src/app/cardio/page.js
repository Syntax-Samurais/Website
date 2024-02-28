"use client";

import React, { useState, useEffect } from "react";
import Header from "../_components/Header";
import NavBar from "../_components/NavBar";
import { globalId } from "../_components/_modals/LoginModal.jsx";

export default function Cardio() {
  const [pastRuns, setPastRuns] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const res = await fetch(`/api/Cardio?id=${globalId}`);
        const data = await res.json();
        console.log("Fetched data: ", data);
        setPastRuns(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchingData();
  }, []);

  return (
    <>
      <Header />
      <NavBar />
      <UserGoalMiles />
      <div className="flex justify-center mt-12">
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

const UserGoalMiles = () => {
  return (
    <div className="flex justify-center items-center pt-12">
      <div className="bg-blue-950 p-8 rounded-lg text-center text-white">
        <p className="text-lg font-bold">I want to run 10 Miles every day!</p>
      </div>
    </div>
  );
};

const ScrollableBox = ({ pastRuns }) => {
  if (!pastRuns) return null;

  //Sorts past runs by date, most recent first
  const sortedPastRuns = pastRuns
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <h1 className="text-center text-white text-xl">History</h1>
      <div className="bg-blue-950 w-96 h-96 rounded-lg text-center text-white border border-black overflow-auto">
        <div className="p-4">
          <ul className="list-disc list-inside">
            {/* Maps through past runs and displays them */}
            {sortedPastRuns.map((run, index) => (
              <li key={index} className="mb-2">
                <strong>{run.date}</strong> | Time Taken: {run.run_time} | Miles
                Ran: {run.miles_ran}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

//function `Box` is a placeholder for the new entry form
const Box = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = e.target.elements.date.value;
    const runHours = e.target.elements.run_hours.value || 0;
    const runMinutes = e.target.elements.run_minutes.value || 0;
    const runSeconds = e.target.elements.run_seconds.value || 0;

    // Calculate the total run time in seconds
    const totalSeconds =
      parseInt(runHours) * 3600 +
      parseInt(runMinutes) * 60 +
      parseInt(runSeconds);

    // Convert the total seconds to hours, minutes, and seconds format
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const run_time = `${hours}:${minutes}:${seconds}`;
    const miles_ran = e.target.elements.miles_ran.value;

    const entry = { date, run_time, miles_ran };

    fetch("/api/Cardio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(entry);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert("Post completed");
      })
      .catch((error) => {
        console.error("Posting error: ", error);
      });
  };

  return (
    <>
      <h1 className="text-center text-white text-xl">New Entry</h1>
      <div className="bg-blue-950 w-96 h-96 rounded-lg text-center text-white border border-black">
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
              <label className="block text-left text-white">Run Time</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  id="run_hours"
                  name="run_hours"
                  placeholder="Hours"
                  className="w-full rounded-md p-2 text-black"
                />
                <input
                  type="number"
                  id="run_minutes"
                  name="run_minutes"
                  placeholder="Minutes"
                  className="w-full rounded-md p-2 text-black"
                />
                <input
                  type="number"
                  id="run_seconds"
                  name="run_seconds"
                  placeholder="Seconds"
                  className="w-full rounded-md p-2 text-black"
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
              className="bg-blue-800 text-white p-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
