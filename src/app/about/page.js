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
    const audio = new Audio("./sounds/boo.mp3");
    audio.play();

    let alertCount = 0;
    const alertLoop = setInterval(() => {
      if (alertCount < 3) {
        alert(
          "You're failing miserably without FitFusion! Your life is doomed!",
        );
        alertCount++;
      }
    }, 500); // Alert every 500 milliseconds

    // Rotate browser tab text to grab attention
    const rotateText = () => {
      document.title = "🚨 ATTENTION: LOSER ALERT! 🚨";
      setTimeout(() => {
        document.title = "You're LOSING without FitFusion!";
      }, 500);
    };
    setInterval(rotateText, 1000); // Rotate title every second

    // Clear all intervals and redirect to Quora after a certain period
    setTimeout(() => {
      clearInterval(alertLoop);
      document.title = "🚨 ALERT CLEARED! 🚨";
      setTimeout(() => {
        document.title = "Come back when you are prepared to win!";
      }, 1000);
      window.location.href = "https://youtu.be/ukWRRNqMAZ4?t=55"; // Beetles link
    }, 5000); // Redirect after 5 seconds
  };

  return (
    <div className="text-white">
      <Head>
        <title>About Us - FitFusion</title>
        <meta name="description" content="Learn more about FitFusion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col">
          {/* First image */}
          <div className="relative">
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
                Im already an alpha
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

          {/* Second image */}
          <div style={{ maxHeight: "50vh" }}>
            <img
              src="./images/gradientBlue.png"
              alt="Image 2"
              className="w-full h-full object-cover"
            />
            <h1 className="absolute  w-full text-center text-4xl font-bold">
              asdf
            </h1>
          </div>
          {/* Sponsor section */}
          <div className="flex-1">{/* sponser images flex wrapped */}</div>
        </div>
      </main>
      {/* Add any additional sections or content specific to the About page */}
    </div>
  );
}
