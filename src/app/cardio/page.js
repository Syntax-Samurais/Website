"use client";

import React, { useState, useEffect } from "react";
import Header from "../_components/Header";
import NavBar from "../_components/NavBar";
import AlertBox from "../_components/AlertBox.jsx";
import { ScrollableBox } from "../_components/ScrollableBox.jsx";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import "./cardio.css";

export default function Cardio() {
  const router = useRouter();
  const [pastRuns, setPastRuns] = useState([]);

  let cookieUser = Cookies.get("user");
  const globalId = cookieUser;

  useEffect(() => {
    if (cookieUser === 0 || cookieUser === null) {
      router.push(`/`);
    }
  }, [globalId, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/Cardio?id=${globalId}`);
        const data = await res.json();
        setPastRuns(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
  let cookieUser = Cookies.get("user");
  const globalId = cookieUser;

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

const Box = () => {
  const [showAlert, setShowAlert] = useState(false); // Initially set showAlert to false

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

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

      e.target.reset();
      setShowAlert(true); // Set showAlert to true after successful submission
    } catch (error) {
      console.error("Posting error: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-center text-white text-2xl font-bold mb-4">
        New Entry
      </h1>
      <div className="bg-PrimaryBlue w-96 max-h-80 rounded-lg text-white border border-black">
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="date" className="block text-white">
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
            <label className="block text-white">Run Time</label>
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
            <label htmlFor="miles_ran" className="block text-white">
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
            className="bg-SecondaryBlue text-white p-2 rounded-md w-full"
          >
            Submit
          </button>
        </form>
      </div>
      {showAlert && <AlertBox onClose={handleCloseAlert} />}
    </div>
  );
};
