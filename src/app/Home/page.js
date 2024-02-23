"use client";

import { La_Belle_Aurore } from "next/font/google";
import React, { useState } from "react";
import NavBar from "../_components/NavBar.jsx";

const Home = () => {
  const [sliderColor, setSliderColor] = useState("#000000");
  return (
    <>
      <NavBar />
    </>
  );
};

export default Home;
