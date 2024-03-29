"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const NavBar = () => {
  const path = usePathname();

  let selectedStyle =
    "flex justify-center h-full w-40 rounded-3xl bg-PrimaryGrey items-center font-bold text-white drop-shadow-lg hover:brightness-110";
  let defaultStyle =
    "flex text-nowrap justify-center h-full w-40 rounded-3xl items-center hover:text-PrimaryGrey hover:font-bold";

  return (
    <>
      <div className="hidden sm:flex mt-6 h-10 w-11/12 md:w-3/4 m-auto max-w-navWrap">
        <div className="w-14 h-14 inset-x-0 -my-2 m-auto absolute rounded-full bg-neutral-300 drop-shadow-lg z-10"></div>
        <div className="flex m-auto relative w-full h-full rounded-full bg-neutral-300">
          <div className="flex justify-around content-center px-4 md:px-12 w-1/2 text-sm items-center">
            <Link
              href="/Home"
              className={path == "/Home" ? selectedStyle : defaultStyle}
            >
              Dashboard
            </Link>
            <Link
              href="/goals"
              className={path == "/goals" ? selectedStyle : defaultStyle}
            >
              My Goals
            </Link>
          </div>
          <div className="flex justify-around content-center px-4 md:px-12 w-1/2 text-sm items-center">
            <Link
              href="/Diet"
              className={path == "/Diet" ? selectedStyle : defaultStyle}
            >
              My Diet
            </Link>
            <Link
              href="/cardio"
              className={path == "/cardio" ? selectedStyle : defaultStyle}
            >
              My Cardio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
