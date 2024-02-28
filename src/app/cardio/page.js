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
        // if (globalId === "0") {
        //   window.location.href = "/";
        //   return;
        // }

        const res = await fetch(`/api/Cardio?id=${globalId}`);
        const data = await res.json();
        setPastRuns(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchingData();
  }, [pastRuns]);

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
                <strong>{run.date.split("T")[0]}</strong> | Time Taken:{" "}
                {run.run_time} | Miles Ran: {run.miles_ran}
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
