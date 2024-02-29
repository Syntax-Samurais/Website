// "use client";
// import React, { useState, useEffect } from "react";
// // import axios from "axios";
// import NavBar from "../_components/NavBar";
// import Header from "../_components/Header";

// const Day = (props) => {
//   const [weight, setWeight] = useState("");
//   const [calories, setCalories] = useState("");

//   function changeWeight(e) {
//     setWeight(e.target.value);
//   }

//   function changeCalories(e) {
//     setCalories(e.target.value);
//   }

//   async function onSubmit(e) {
//     // console.log(weight, calories)
//     // create JS date variable (look on MDN)

//     // so it can be entered in as same format as Mark's in database
//     // if date is already in database, UPDATE weight and calories
//     // else if no date in database
//     // POST or insert weight and calories into database

//     e.preventDefault();
//     try {
//       const response = await fetch("/api/Diet", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user_id: 1,
//           weight: weight,
//           calories: calories,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       console.log("data", data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }

//   return (
//     <div className="border border-gray-400 w-72 m-2 h-64 bg-PrimaryBlue rounded-xl">
//       <h1 className="text-center mb-10">{props.day}</h1>
//       <form className="w-1/2 m-auto text-center">
//         <label className="mt-20">Weight (lbs):</label>
//         <input
//           name="weight"
//           className="w-full mb-3 secondary"
//           type="text"
//           onChange={changeWeight}
//           required
//         ></input>
//         <label className="mt-10">Calories:</label>
//         <input
//           className="w-full secondary"
//           type="text"
//           onChange={changeCalories}
//           required
//         ></input>
//         <button
//           className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-md ml-2"
//           onClick={onSubmit}
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// const page = () => {
//   const [calories_goal, setCaloriesGoal] = useState(0);
//   useEffect(() => {
//     const setCalories = async () => {
//       try {
//         const res = await fetch(`/api/Diet`);
//         const result = await res.json();
//         setCaloriesGoal(result[0].goal_calorie_intake);
//         // setTempItems(tempItems);
//       } catch (e) {
//         console.warn(`Couldnt fetch item`, e);
//       }
//     };
//     setCalories();
//   }, []);
//   const days = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];
//   return (
//     <>
//       <Header />
//       <NavBar />
//       <div className="mt-10 m-auto w-fit primary px-64 text-xl">
//         I will eat {calories_goal} calories every day
//       </div>
//       <div className="flex flex-wrap w-3/4 m-auto mt-4 justify-center ">
//         {days.map((day, index) => (
//           <Day key={index} day={day} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default page;

// /*
// 1.	User goal displayed at top of page
// 2.	Each day of week will have option for user to input daily calorie intake which updates
//     dashboard/home page pie chart
// 3.	User can update daily weight which will reflect on the dashboard/home page weight
// */

"use client";

import React, { useState, useEffect } from "react";
import Header from "../_components/Header";
import NavBar from "../_components/NavBar";
import { globalId } from "../_components/_modals/LoginModal.jsx";

export default function Cardio() {
  const [pastWeight, setPastWeight] = useState([]);
  useEffect(() => {
    const setCalories = async () => {
      try {
        const res = await fetch(`/api/Diet/Day`);
        const result = await res.json();
        setPastWeight(result);
      } catch (e) {
        console.warn(`Couldnt fetch item`, e);
      }
    };
    setCalories();
  }, []);
  // console.log(pastWeight)

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
  //   const fetchingData = async () => {
  //     try {
  //       // if (globalId === "0") {
  //       //   window.location.href = "/";
  //       //   return;
  //       // }

  //       const res = await fetch(`/api/Cardio?id=${globalId}`);
  //       const data = await res.json();
  //       setPastRuns(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchingData();
  // }, [pastRuns]);

  return (
    <>
      <Header />
      <NavBar />
      <UserGoalCalories />
      <div className="flex justify-center mt-12">
        <div className="mx-24">
          <ScrollableBox pastRuns={pastWeight} />
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

  return (
    <div className="flex justify-center items-center pt-12">
      <div className="bg-blue-950 p-8 rounded-lg text-center text-white">
        <p className="text-lg font-bold">
          I want to eat {calories_goal} calories each day.
        </p>
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
            Maps through past runs and displays them
            {sortedPastRuns.map((run, index) => (
              <li key={index} className="mb-2">
                <strong>{run.date.split("T")[0]}</strong> | Time Taken:{" "}
                {run.run_time} | Weight: {run.miles_ran}
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
              <label className="block text-left text-white">
                Current Weight
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  id="run_hours"
                  name="run_hours"
                  placeholder="in pounds"
                  className="w-full rounded-md p-2 text-black"
                />
                {/* <input
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
                /> */}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="miles_ran" className="block text-left text-white">
                Calories Consumed
              </label>
              <input
                type="text"
                id="miles_ran"
                name="miles_ran"
                className="w-full rounded-md p-2 text-black"
                placeholder="calories"
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
