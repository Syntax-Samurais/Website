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
            className="w-full h-72 object-cover"
          />
          <div className="absolute inset-0 flex flex-col pt-4 items-center text-white">
            <div className="text-yellow-500 pb-4">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <span key={index} className="text-5xl">
                  &#9733;
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-bold border-b">
              3.8 Million 5-Star Reviews
            </h1>
            <div className="text-lg bg-black bg-opacity-50 rounded-lg p-6 m-8">
              <p className="text-center">
                "Best fitness app ever! Highly recommended!"
              </p>
              <p className="text-right mr-8">- James Bond</p>
            </div>
          </div>
        </div>

        {/* Sponsor section */}
        <div className="flex items-center">
          <img
            src="./images/github.png"
            alt="Sponsor 1"
            className="w-1/4 h-1/4"
          />
          <img
            src="./images/nike.png"
            alt="Sponsor 2"
            className="w-1/4 h-1/4"
          />
          <img src="./images/UFC.png" alt="Sponsor 3" className="w-1/4 h-1/4" />
          <img
            src="./images/SyntaxSam.png"
            alt="Sponsor 4"
            className="w-1/4 h-1/4"
          />
        </div>
      </main>
    </div>
  );
}
