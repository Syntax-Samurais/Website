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
  handleFormSubmit,
}) => {
  const router = useRouter();
  let cookieUser = Cookies.get("user");
  const globalId = cookieUser;

  const [formData, setFormData] = useState({
    goal_weight: goalWeight,
    weight_goal_date: weight_goal_date
      ? new Date(weight_goal_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    goal_calorie_intake: goal_calorie_intake,
    goal_weekly_miles: goalMiles,
    gain_weight: gain_weight ? "true" : "false",
    increase_running: increase_running ? "true" : "false",
    lose_weight: lose_weight ? "true" : "false",
    maintain_weight: maintain_weight ? "true" : "false",
  });

  console.log("formData: checking date formate", formData);

  const handleClose = () => {
    handleCloseModal();
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      goal_weight: formData.goal_weight,
      weight_goal_date: formData.weight_goal_date
        .split("/")
        .reverse()
        .join("-"),
      goal_calorie_intake: formData.goal_calorie_intake,
      goal_weekly_miles: formData.goal_weekly_miles,
      gain_weight: formData.gain_weight === "true",
      increase_running: formData.increase_running === "true",
      lose_weight: formData.lose_weight === "true",
      maintain_weight: formData.maintain_weight === "true",
    };
    handleFormSubmit(data);
    handleClose();
    console.log("Data to patch", data);
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
                    checked={formData[field] === "true"}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setFormData((prevFormData) => {
                        const updatedFormData = { ...prevFormData };

                        if (field === "lose_weight" && isChecked) {
                          updatedFormData.maintain_weight = "false";
                          updatedFormData.gain_weight = "false";
                        } else if (field === "maintain_weight" && isChecked) {
                          updatedFormData.lose_weight = "false";
                          updatedFormData.gain_weight = "false";
                        } else if (field === "gain_weight" && isChecked) {
                          updatedFormData.lose_weight = "false";
                          updatedFormData.maintain_weight = "false";
                        }

                        if (field === "increase_running") {
                          updatedFormData[field] = isChecked ? "true" : "false";
                        } else if (
                          [
                            "lose_weight",
                            "maintain_weight",
                            "gain_weight",
                          ].includes(field)
                        ) {
                          updatedFormData[field] = isChecked ? "true" : "false";
                        }

                        return updatedFormData;
                      });
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
