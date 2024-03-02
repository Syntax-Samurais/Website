"use client";

import Head from "next/head";
import { useState } from "react";
import Header from "./_components/Header";
import { useRouter } from "next/navigation";
import LoginModal from "./_components/_modals/LoginModal";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const handleLogin = (username, password) => {
    console.log(
      "Logging in with username:",
      username,
      "and password:",
      password,
    );
  };

  // Fake testimonials
  const testimonials = [
    {
      id: 1,
      text: "FitFusion has completely transformed my fitness journey. I've never felt better!",
    },
    {
      id: 2,
      text: "The workouts are challenging yet rewarding. I'm addicted to the results!",
    },
    {
      id: 3,
      text: "FitFusion makes staying fit fun and accessible. Highly recommend it to everyone!",
    },
    {
      id: 4,
      text: "FitFusion has completely transformed my fitness journey. I've never felt better!",
    },
    {
      id: 5,
      text: "The workouts are challenging yet rewarding. I'm addicted to the results!",
    },
    {
      id: 6,
      text: "FitFusion makes staying fit fun and accessible. Highly recommend it to everyone!",
    },
  ];

  return (
    <div className="text-white bg-mountains2 bg-cover bg-scroll">
      <Head>
        <title>FitFusion</title>
        <meta
          name="description"
          content="Elevate your fitness with FitFusion"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="mt-48 flex justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold">Welcome to FitFusion</h1>
            <p className="text-lg">Elevate your fitness</p>
            <button
              className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-md"
              onClick={openLoginModal}
            >
              Login
            </button>
            <button
              className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-md ml-2"
              onClick={() => router.push("/SignUp")}
            >
              Sign Up
            </button>
          </div>
        </div>
        {/* Testimonials */}
        <section className="mt-96 py-10 justify-center items-center">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              What Our Users Say
            </h2>
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`p-6 rounded-lg flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  } justify-center`}
                >
                  <img
                    src={`images/Testimonial_pfp.jpg`}
                    className="w-16 h-16 rounded-full mr-4"
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  />
                  <div>
                    <p className="text-lg font-semibold mb-2">
                      {testimonial.name}
                    </p>
                    <p
                      className="text-lg"
                      style={{
                        marginLeft: index % 2 === 0 ? "1rem" : "0",
                        marginRight: index % 2 === 0 ? "0" : "1rem",
                      }}
                    >
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <LoginModal
        isOpen={showLoginModal}
        onClose={closeLoginModal}
        onLogin={handleLogin}
      />
    </div>
  );
}
