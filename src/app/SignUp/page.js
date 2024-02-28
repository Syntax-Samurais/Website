"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import axios from "axios";
import Header from "../_components/Header";

const goals = [
  { text: "I want to lose weight.", value: "loseWeight", id: 1 },
  { text: "I want to gain weight", value: "gainWeight", id: 2 },
  { text: "I want to maintain my current weight.", value: "sameWeight", id: 3 },
  { text: "I want to increase my running mileage.", value: "mileage", id: 4 },
  { text: "I want to run faster.", value: "runFast", id: 5 },
];
const ScreenOne = (props) => {
  //----------------------------------------------------Changes Text Color to White Upon Clicking
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  const setGoal_ChangeStyle = (goal) => {
    props.setGoal(goal.value);
    setSelectedGoalId(goal.id);
  };
  return (
    <>
      <div className="h-custom ">
        <h1 className="text-customLightBlue my-4 text-2xl">
          What is your primary goal?
        </h1>
        {goals.map((goal) => (
          <div
            key={goal.id}
            value={goal.value}
            className={`border border-cyan-400 rounded-md text-customLightBlue px-1 py-1 my-4 text-md cursor-pointer w-3/4 
            ml-12 hover:opacity-75 ${selectedGoalId === goal.id ? "text-white font-bold" : ""}`}
            onClick={() => {
              props.setGoal(goal.value);
              setGoal_ChangeStyle(goal);
              props.setInput(goal.value);
            }}
          >
            {goal.text}
          </div>
        ))}
      </div>
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

  const input = (e) => {
    props.setInput(e.target.value);
    props.setBefore(e.target.value);
  };
  return (
    <>
      <div className="h-custom text-customLightBlue">
        <h1 className="mb-4 mt-6 text-lg">{question}</h1>
        <input className="text-black" type="text" onChange={input}></input>
      </div>
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

  const input = (e) => {
    props.setInput(e.target.value);
    props.setAfter(e.target.value);
  };
  return (
    <>
      <div className="h-custom text-customLightBlue">
        <h1 className="mb-4 mt-6">{question}</h1>
        <input className="text-black" type="text" onChange={input}></input>
      </div>
    </>
  );
};

const ScreenFour = (props) => {
  const createUsername = (e) => {
    props.username(e.target.value);
  };

  const createPassword = (e) => {
    props.password(e.target.value);
  };

  const confirmPassword = (e) => {
    props.confirmPassword(e.target.value);
  };
  return (
    <>
      <div className="h-custom text-customLightBlue">
        <h1 className="mt-5 mb-6 text-2xl">
          Awesome! Let's get started.
          <br />
        </h1>
        <h2 className="text-lg leading-relaxed">
          Reach your goals by signing up today!
        </h2>
        <form>
          <label>Username:</label>
          <input
            className="text-black mt-8"
            type="text"
            onChange={createUsername}
          ></input>
          <label>Password:</label>
          <input
            className="text-black mt-10"
            type="password"
            onChange={createPassword}
          ></input>
          <label className="relative top-7">Confirm Password:</label>
          <input
            className="text-black mt-8"
            type="password"
            onChange={confirmPassword}
          ></input>
        </form>
      </div>
    </>
  );
};

const SignUpPage = () => {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(1);
  const [currentGoal, setCurrentGoal] = useState("");
  const [input, setInput] = useState("");
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  console.log(currentGoal, before, after, username, password, confirmPassword);
  console.log();
  // 3: <ScreenThree goal={currentGoal} next={setCurrentScreen(currentScreen+1)}/>
  let screens = {
    1: <ScreenOne setGoal={setCurrentGoal} setInput={setInput} />,
    2: (
      <ScreenTwo goal={currentGoal} setInput={setInput} setBefore={setBefore} />
    ),
    3: (
      <ScreenThree
        goal={currentGoal}
        next={setCurrentScreen}
        setInput={setInput}
        setAfter={setAfter}
      />
    ),
    4: (
      <ScreenFour
        setInput={setInput}
        username={setUsername}
        password={setPassword}
        confirmPassword={setConfirmPassword}
      />
    ),
  };

  async function signUp() {
    if (password !== confirmPassword || password == "" || username == "") {
      alert("Passwords do not match or make sure to fill out all fields");
    } else {
      if (currentGoal === "sameWeight") {
        setAfter(before);
      }
      await fetch("/api/SignUp", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
          goal: currentGoal,
          before: before,
          after: after,
        }),
      })
        .then((response) => {
          console.log(response);
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
      // router.push("/")}
    }
  }

  return (
    <>
      <Header />
      <div className="h-custom">
        <div className="m-auto mt-20 w-96 border border-customLightBlue border-opacity-65 rounded-xl bg-customBlue text-center">
          <h2 className="text-white my-2 text-3xl tracking-wide underline">
            Welcome to FitFusion
          </h2>
          {screens[currentScreen]}
          {(currentScreen === 2) & (currentGoal === "sameWeight") ? (
            <button
              className="mt-4 bg-white border-customDarkGray border-2 text-customLightDarkBlue font-bold px-4 py-2 rounded-md ml-2 hover:bg-customLightBlue hover:text-white"
              onClick={() => {
                if (input !== "") {
                  setCurrentScreen(currentScreen + 2);
                  setInput("");
                }
              }}
            >
              Next
            </button>
          ) : (
            <>
              {currentScreen === 4 ? (
                <button
                  className="mt-4 bg-white border-customDarkGray border-2 text-customLightDarkBlue font-bold px-4 py-2 rounded-md ml-2 hover:bg-customLightBlue hover:text-white"
                  onClick={signUp}
                >
                  Sign Up!
                </button>
              ) : (
                <button
                  className="mt-4 bg-white border-customDarkGray border-2 text-customLightDarkBlue font-bold px-4 py-2 rounded-md ml-2 hover:bg-customLightBlue hover:text-white"
                  onClick={() => {
                    if (input !== "") {
                      setCurrentScreen(currentScreen + 1);
                      setInput("");
                    }
                  }}
                >
                  Next
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
