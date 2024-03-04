"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const GoalChange = ({ showModal, handleCloseModal, userInterests }) => {
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
            {/* Iterete over user interests and create checkboxes for each at the beginning of the form. If userInterest is true, check the box. */}
            <div className="flex flex-wrap">
              {Object.keys(userInterests).map((interest) => {
                if (interest !== "id" && interest !== "user_id") {
                  return (
                    <div
                      key={interest}
                      className="border-2 border-gray-500 rounded-lg p-2 m-2"
                    >
                      <label
                        htmlFor={interest}
                        className="block text-right text-white"
                      >
                        {formatLabel(interest)}
                      </label>
                      <input
                        type="checkbox"
                        id={interest}
                        name={interest}
                        value={formData[interest]}
                        checked={userInterests[interest]}
                        onChange={(e) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            [interest]: e.target.checked,
                          }))
                        }
                        className="w-full rounded-md p-2 text-black"
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>

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
