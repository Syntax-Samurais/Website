"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const GoalChange = ({
  showModal,
  handleCloseModal,
  gain_weight,
  increase_running,
  lose_weight,
  maintain_weight,
  goalWeight,
  weight_goal_date,
  goal_calorie_intake,
  goalMiles,
  handleInterestChange,
}) => {
  const router = useRouter();
  let cookieUser = Cookies.get("user");
  const globalId = cookieUser;

  console.log("Goal Change Modal weight_goal_date: ", weight_goal_date);
  const [formData, setFormData] = useState({
    goal_weight: goalWeight,
    weight_goal_date: weight_goal_date
      ? new Date(weight_goal_date)
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .split("/")
          .reverse()
          .join("-")
      : new Date()
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .split("/")
          .reverse()
          .join("-"),
    goal_calorie_intake: goal_calorie_intake,
    goal_weekly_miles: goalMiles,
  });

  const handleClose = () => {
    handleCloseModal();
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};

    userInterestFields.forEach((field) => {
      const isChecked = formData[field];
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: isChecked,
      }));
      data[field] = isChecked ? "true" : "false";
    });

    for (const key in formData) {
      if (formData[key]) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [key]: e.target[key]?.value,
        }));

        data[key] = e.target[key]?.value;
      }
    }

    gain_weight = gain_weight;
    increase_running = increase_running;
    lose_weight = lose_weight;
    maintain_weight = maintain_weight;
    console.log("Data to patch", data);
    handleClose();

    try {
      const response = await fetch(`/api/Goals/Change?id=${globalId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response not ok");
      }
    } catch (error) {
      console.error("Patching error: ", error);
    }
  };

  const formFields = [
    "goal_weight",
    "weight_goal_date",
    "goal_calorie_intake",
    "goal_weekly_miles",
  ];

  const userInterestFields = [
    "gain_weight",
    "increase_running",
    "lose_weight",
    "maintain_weight",
  ];

  const formatLabel = (field) =>
    field
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${showModal ? "" : "hidden"}`}
        onClick={handleClose}
      >
        <div
          className="bg-sky-900 p-8 rounded-md relative mx-auto my-auto w-3/4 h-3/4 sm:w-2/3 sm:h-2/3"
          onClick={handleClick}
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-white"
          >
            &times;
          </button>
          <form onSubmit={handleSubmit}>
            {/* Iterete over user userInterestFields and create checkboxes for each at the beginning of the form. If userInterest is true, check the box. */}
            <div>
              {userInterestFields.map((field) => (
                <div
                  key={field}
                  className="flex flex-wrap items-center text-white"
                >
                  <input
                    type="checkbox"
                    id={field}
                    name={field}
                    value="true"
                    checked={
                      field === "gain_weight"
                        ? gain_weight
                        : field === "increase_running"
                          ? increase_running
                          : field === "lose_weight"
                            ? lose_weight
                            : maintain_weight
                    }
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        [field]: isChecked ? "true" : "false",
                      }));
                      handleInterestChange(field, isChecked);
                    }}
                  />
                  <label htmlFor={field} className="text-white">
                    {formatLabel(field)}
                  </label>
                </div>
              ))}
            </div>
            <div></div>
            {formFields.map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-left text-white">
                  {formatLabel(field)}
                </label>
                <input
                  type={field === "weight_goal_date" ? "date" : "text"}
                  id={field}
                  /*add default text to field with the  */
                  name={field}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      [field]: e.target.value,
                    }))
                  }
                  className="w-full rounded-md p-2 text-black"
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-SecondaryBlue text-white p-2 rounded-md w-full mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default GoalChange;
