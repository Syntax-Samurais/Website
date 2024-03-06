"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Header from "../_components/Header";

const goals = [
  { text: "I want to lose weight.", value: "loseWeight", id: 1 },
  { text: "I want to gain weight", value: "gainWeight", id: 2 },
  { text: "I want to maintain my current weight.", value: "sameWeight", id: 3 },
  { text: "I want to increase my running mileage.", value: "mileage", id: 4 },
  // { text: "I want to run faster.", value: "runFast", id: 5 },
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
        <h1 className="text-white my-4 text-2xl">What is your primary goal?</h1>
        {goals.map((goal) => (
          <div
            key={goal.id}
            value={goal.value}
            className={`border rounded-md border-black text-white px-1 py-1 my-4 text-md cursor-pointer w-3/4 
            ml-12 hover:opacity-75 ${selectedGoalId === goal.id ? "text-white font-bold border-white" : ""}`}
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
  let calorieQuestion = "";
  // console.log(props.goal + 'pro')
  switch (props.goal) {
    case "loseWeight":
    case "gainWeight":
    case "sameWeight":
      question = "What is your current weight?";
      calorieQuestion = "How many calories do you eat a day?";
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
      <div className="h-custom text-white">
        <h1 className="mb-4 mt-6 text-lg">{question}</h1>
        <input className="text-black" type="text" onChange={input}></input>
        {calorieQuestion !== "" ? (
          <div>
            {" "}
            <h1 className="mb-4 mt-6 text-lg">{calorieQuestion}</h1>{" "}
            <input
              className="text-black"
              type="text"
              onChange={(e) => props.setCalories(e.target.value)}
            ></input>
          </div>
        ) : null}
      </div>
    </>
  );
};

const ScreenThree = (props) => {
  let question = "";
  let calorieQuestion = "";
  // console.log(props.goal + 'pro')
  switch (props.goal) {
    case "loseWeight":
    case "gainWeight":
      question = "What is your goal weight?";
      calorieQuestion = "How many calories do you want to target a day?";
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
      <div className="h-custom text-white">
        <h1 className="mb-4 mt-6">{question}</h1>
        {props.goal !== "sameWeight" ? (
          <input className="text-black" type="text" onChange={input}></input>
        ) : null}
        {calorieQuestion !== "" ? (
          <div>
            {" "}
            <h1 className="text-white block mt-10">{calorieQuestion}</h1>{" "}
            <input
              className="text-black my-2"
              type="text"
              onChange={(e) => props.setCalories(e.target.value)}
            ></input>
          </div>
        ) : null}
        <label className="text-white block mt-10">
          By what date do you want to meet your goal?
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className=" rounded-md p-2 my-2 text-black"
          onChange={(e) => {
            props.setDate(e.target.value);
          }}
        />
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
      <div className="h-custom text-white">
        <h1 className="mt-5 mb-6 text-2xl">
          Awesome! Let's get started.
          <br />
        </h1>
        <h2 className="text-lg leading-relaxed">
          Reach your goals by signing up today!
        </h2>
        <form className="flex flex-wrap mx-2 mt-5">
          <div></div>
          {/* <label className="justify-self-end">Username:</label> */}
          <input
            className="text-white bg-PrimaryBlue p-2 w-3/4 border-b-2 my-2 focus:outline-none mx-auto"
            type="text"
            placeholder="Username"
            onChange={createUsername}
          ></input>
          {/* <div className="mt-7"> */}
          {/* <label>Password:</label> */}
          <input
            className="text-white mx-auto bg-PrimaryBlue p-2 w-3/4 border-b-2 my-2 focus:outline-none"
            type="password"
            placeholder="Password"
            onChange={createPassword}
          ></input>
          {/* </div> */}
          {/* <div> */}
          {/* <label className="relative mt-7">Confirm Password:</label> */}
          <input
            className="text-white mx-auto bg-PrimaryBlue p-2 w-3/4 border-b-2 my-2 focus:outline-none"
            type="password"
            placeholder="Confirm Password"
            onChange={confirmPassword}
          ></input>
          {/* </div> */}
        </form>
      </div>
    </>
  );
};

//Function that returns the current screen
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
  const [goalDate, setGoalDate] = useState("");
  const [currentCalories, setCurrentCalories] = useState("");
  const [goalCalories, setGoalCalories] = useState("");

  let date = new Date();
  let currentDate =
    date.getFullYear() +
    "-" +
    String(date.getUTCMonth() + 1).padStart(2, 0) +
    "-" +
    String(date.getDate()).padStart(2, 0);
  // console.log(currentDate);
  // console.log(currentGoal, before, currentCalories, after, goalCalories, goalDate, username, password, confirmPassword);

  // 3: <ScreenThree goal={currentGoal} next={setCurrentScreen(currentScreen+1)}/>
  let screens = {
    1: <ScreenOne setGoal={setCurrentGoal} setInput={setInput} />,
    2: (
      <ScreenTwo
        goal={currentGoal}
        setInput={setInput}
        setBefore={setBefore}
        setCalories={setCurrentCalories}
      />
    ),
    3: (
      <ScreenThree
        goal={currentGoal}
        next={setCurrentScreen}
        setInput={setInput}
        setAfter={setAfter}
        setDate={setGoalDate}
        setCalories={setGoalCalories}
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
      await fetch("/api/SignUp", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
          goal: currentGoal,
          before: before,
          after: after,
          goalDate: goalDate,
          currentCalories: currentCalories,
          goalCalories: goalCalories,
          currentDate: currentDate,
        }),
      })
        .then(async (response) => {
          // console.log(response);

          const res = await fetch(
            `/api/Login?username=${username}&password=${password}`,
          );
          // console.log(res); // 400 = missing field | 401 = invalid username or password | 200 = success

          if (res.status === 200) {
            const data = await res.json();
            const { id } = data;
            Cookies.set("user", id);
            router.push(`/Home`);
          }
        })
        .catch((error) => {
          // console.log(error);
        });
      // router.push("/")}
    }
  }

  return (
    <>
      <Header />
      <div className="h-custom">
        <div className="m-auto mt-20 w-96 border-black shadow-2xl rounded-xl bg-PrimaryBlue text-center">
          <img className="w-20 h-20 m-auto" src="/images/logo1.png"></img>
          {screens[currentScreen]}
          {currentScreen === 4 ? (
            <button
              className=" bg-white border-customDarkGray border-2 text-black font-bold px-4 py-2 rounded-md hover:bg-SecondaryGrey hover:text-white my-4"
              onClick={signUp}
            >
              Sign Up!
            </button>
          ) : (
            <button
              className=" bg-white border-customDarkGray border-2 text-black font-bold px-4 py-2 rounded-md hover:bg-SecondaryGrey hover:text-white my-4"
              onClick={() => {
                if (input !== "") {
                  setCurrentScreen(currentScreen + 1);
                  setInput("");
                } else if (
                  currentScreen === 3 &&
                  currentGoal === "sameWeight" &&
                  goalDate !== ""
                ) {
                  setCurrentScreen(currentScreen + 1);
                  setAfter(before);
                  setGoalCalories(currentCalories);
                }
              }}
            >
              Next
            </button>
          )}
          {/* </>
          )} */}
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
