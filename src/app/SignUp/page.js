"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const goals = [
  { text: "I want to lose weight.", value: "loseWeight", id: 1 },
  { text: "I want to gain weight", value: "gainWeight", id: 2 },
  { text: "I want to maintain my current weight.", value: "sameWeight", id: 3 },
  { text: "I want to increase my running mileage.", value: "mileage", id: 4 },
  { text: "I want to run faster.", value: "runFast", id: 5 },
];

const ScreenOne = (props) => {
  return (
    <>
      <h1 className="text-customLightBlue my-4 text-2xl">
        What is your primary goal?
      </h1>
      {goals.map((goal) => (
        <div
          key={goal.id}
          value={goal.value}
          className="border border-cyan-400 rounded-md text-customLightBlue px-1 py-1 my-4 text-md cursor-pointer w-3/4 ml-12"
          onClick={() => props.setGoal(goal.value)}
        >
          {goal.text}
        </div>
      ))}
    </>
  );
};

const ScreenTwo = (props) => {
  let question = "";
  // console.log(props.goal + 'pro')
  switch (props.goal) {
    case "loseWeight":
    case "gainWeight":
    case "sameWeight":
      question = "What is your current weight?";
      break;
    case "mileage":
      question = "How many miles do you run a week?";
      break;
    case "runFast":
      question = "What is your current mile pace?";
      break;
    default:
      break;
  }

  return (
    <>
      <h1>{question}</h1>
      <input type="text" required></input>
    </>
  );
};

const ScreenThree = (props) => {
  let question = "";
  // console.log(props.goal + 'pro')
  switch (props.goal) {
    case "loseWeight":
    case "gainWeight":
      question = "What is your goal weight?";
      break;
    case "mileage":
      question = "What is your target mileage a week?";
      break;
    case "runFast":
      question = "What is your target mile pace?";
      break;
    default:
      // props.next;
      break;
  }

  return (
    <>
      <h1>{question}</h1>
      <input type="text" required></input>
    </>
  );
};

const ScreenFour = (props) => {
  return (
    <>
      <h1>Awesome! Let us help you reach your goal!</h1>
      <h2>Get started today.</h2>
      <form>
        <label>Username:</label>
        <input type="text" required></input>
        <label>Password:</label>
        <input type="text" required></input>
        <label>Confirm Password:</label>
        <input type="text" required></input>
      </form>
    </>
  );
};

const SignUpPage = () => {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(1);
  const [currentGoal, setCurrentGoal] = useState("");
  // console.log(currentGoal)
  // 3: <ScreenThree goal={currentGoal} next={setCurrentScreen(currentScreen+1)}/>
  let screens = {
    1: <ScreenOne setGoal={setCurrentGoal} />,
    2: <ScreenTwo goal={currentGoal} />,
    3: <ScreenThree goal={currentGoal} next={setCurrentScreen} />,
    4: <ScreenFour />,
  };
  return (
    <>
      <div className="m-auto mt-20 w-96 h-96 border border-slate-800 rounded-xl bg-customBlue text-center">
        <h2 className="text-white my-2 text-3xl tracking-wide underline">
          Welcome to FitFusion
        </h2>
        {screens[currentScreen]}
        {(currentScreen === 2) & (currentGoal === "sameWeight") ? (
          <button
            className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-md ml-2"
            onClick={() => setCurrentScreen(currentScreen + 2)}
          >
            Next
          </button>
        ) : (
          <>
            {currentScreen === 4 ? (
              <button
                className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-md ml-2"
                onClick={() => router.push("/")}
              >
                Sign Up!
              </button>
            ) : (
              <button
                className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-md ml-2"
                onClick={() => setCurrentScreen(currentScreen + 1)}
              >
                Next
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SignUpPage;
