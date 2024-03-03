"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const GoalChange = ({ showModal, handleCloseModal }) => {
  const router = useRouter();
  let cookieUser = Cookies.get("user");
  const globalId = cookieUser;

  const [formData, setFormData] = useState({
    goal_weight: "",
    weight_goal_date: "",
    goal_calorie_intake: "",
    goal_weekly_miles: "",
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

    for (const key in formData) {
      if (formData[key]) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [key]: e.target[key].value,
        }));

        data[key] = e.target[key].value;
      }
    }
    console.log(data);
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
            {formFields.map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-left text-white">
                  {formatLabel(field)}
                </label>
                <input
                  type={field === "weight_goal_date" ? "date" : "text"}
                  id={field}
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
              className="bg-SecondaryBlue text-white p-2 rounded-md w-full"
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
