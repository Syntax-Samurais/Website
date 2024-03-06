"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import NavDrawer from "./_modals/NavDrawer.jsx";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("user") !== "0" && Cookies.get("user") !== null,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [logoutStyle, setLogoutStyle] = useState("hidden sm:block ml-4");

  useEffect(() => {
    if (!isLoggedIn) setLogoutStyle("hidden");
  }, []);

  const handleLogout = () => {
    Cookies.set("user", "0");
    setIsLoggedIn(false);
    setLogoutStyle("hidden");
  };

  const handleOpenNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="flex h-14 w-full py-2 px-4 shadow-lg bg-PrimaryBlue bg-opacity-75 text-white font-semibold px-4 z-30">
        <svg
          onClick={handleOpenNav}
          className="block sm:hidden text-PrimaryGrey hover:text-SecondaryBlue transition-colors duration-300 scale-x-[-1]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="40"
          height="40"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
        <span className="ml-4 text-nowrap text-lg self-center">Fit Fusion</span>
        <div className="flex ml-auto items-center">
          <Link
            className="hidden sm:block ml-4 hover:text-PrimaryGrey"
            href="/"
          >
            Home
          </Link>
          <Link
            className="hidden sm:block ml-4 hover:text-PrimaryGrey"
            href="/about"
          >
            About
          </Link>
          <Link className={logoutStyle} onClick={handleLogout} href="/">
            Logout
          </Link>
          <img className="ml-4 w-10 h-10" src="/images/logo1.png"></img>
        </div>
      </header>
      <NavDrawer isOpen={isOpen} setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}
