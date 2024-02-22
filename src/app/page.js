"use client";

import Head from "next/head";
import { useState } from "react";
import LoginModal from "./_modals/LoginModal";
import SignUpModal from "./_modals/SignUpModal";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);
  const openSignUpModal = () => setShowSignUpModal(true);
  const closeSignUpModal = () => setShowSignUpModal(false);

  const handleLogin = (username, password) => {
    console.log(
      "Logging in with username:",
      username,
      "and password:",
      password,
    );
  };

  const handleSignUp = (username, email, password) => {
    console.log(
      "Signing up with username:",
      username,
      "email:",
      email,
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
  ];

  return (
    <div className="bg-gray-900 text-white">
      <Head>
        <title>FitFusion</title>
        <meta
          name="description"
          content="Elevate your fitness with FitFusion"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Scrolling Header */}
      <header className="fixed top-0 left-0 w-full bg-gray-800 shadow-md z-10">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">FitFusion</h1>
          <nav>
            <ul className="flex">
              <li className="mr-4">
                <a href="#" className="text-white">
                  Home
                </a>
              </li>
              <li className="mr-4">
                <a href="#" className="text-white">
                  About
                </a>
              </li>
              <li className="mr-4">
                <a href="#" className="text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="mt-20">
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-green-500">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to FitFusion</h1>
            <p className="text-lg">Elevate your fitness</p>
            <button
              className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-md"
              onClick={openLoginModal}
            >
              Login
            </button>
            <button
              className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-md ml-2"
              onClick={openSignUpModal}
            >
              Sign Up
            </button>
          </div>
        </div>
      </main>

      {/* Testimonials */}
      <section className="bg-gray-800 py-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">
            What Our Users Say
          </h2>
          <div className="flex flex-col items-center">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-900 px-6 py-4 mb-4 rounded-lg max-w-lg"
              >
                <p className="text-lg">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LoginModal
        isOpen={showLoginModal}
        onClose={closeLoginModal}
        onLogin={handleLogin}
      />
      <SignUpModal
        isOpen={showSignUpModal}
        onClose={closeSignUpModal}
        onSignUp={handleSignUp}
      />
    </div>
  );
}
