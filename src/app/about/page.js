"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/");
  };

  const handleWInner = () => {
    router.push("/SignUp");
  };

  const handleLooser = () => {
    // Handle loser action
  };

  return (
    <div className="text-white">
      <Head>
        <title>About Us - FitFusion</title>
        <meta name="description" content="Learn more about FitFusion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="relative">
          {/* First image */}
          <img
            src="./images/propoganda.png"
            alt="Image 1"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute top-24 w-full text-center text-4xl font-bold">
            Welcome to FitFusion
          </h1>
          <div className="absolute bottom-24 w-full flex justify-center space-x-2">
            <button
              className="bg-white text-blue-500 px-4 py-2 rounded-md"
              onClick={handleLogin}
            >
              I'm already an alpha
            </button>
            <button
              className="bg-white text-blue-500 px-4 py-2 rounded-md"
              onClick={handleWInner}
            >
              Improve my life today
            </button>
            <button
              className="bg-white text-blue-500 px-4 py-2 rounded-md"
              onClick={handleLooser}
            >
              No thanks
            </button>
          </div>
        </div>

        {/* Second image with reviews */}
        <div className="relative" style={{ maxHeight: "50vh" }}>
          <img
            src="./images/gradientBlue.png"
            alt="Image 2"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 flex flex-col pt-12 items-center text-white">
            <h1 className="text-4xl font-bold border-b">
              3.8 Million 5-Star Reviews
            </h1>
            <div className="text-lg bg-black bg-opacity-50 rounded-lg p-8 m-12">
              <p className="text-center">
                "Best fitness app ever! Highly recommended!"
              </p>
              <p className="text-right">- James Bond</p>
            </div>
          </div>

          {/* Stars */}
          <div className="absolute top-0 text-yellow-500">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <span key={index} className="text-4xl">
                &#9733;
              </span>
            ))}
          </div>
        </div>

        {/* Sponsor section */}
        <div className="flex-1">
          <h1 className="absolute  w-full h-full text-center text-4xl font-bold">
            asdf
          </h1>
          {/* sponser images flex wrapped */}
        </div>
      </main>
    </div>
  );
}
