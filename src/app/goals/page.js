import React, { useState, useEffect } from "react";
import Header from "../_components/Header";
import NavBar from "../_components/NavBar";

export default function Goals() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const res = await fetch("/api/Goals");
        const data = await res.json();
        console.log("Fetched data: ", data);
        setGoals(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchingData();
  }, []);

  return (
    <>
      <Header />
      <NavBar />
    </>
  );
}
