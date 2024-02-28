"use client";

import Head from "next/head";
import { useState } from "react";
// import LoginModal from "./_components/_modals/LoginModal"; // we commented out lots of stuff here and went back and forth
import Header from "./_components/Header";
// import SignUpModal from "./_modals/SignUpModal";
// import SignUpPage from "./_SignUp/SignUpPage"
import { useRouter } from "next/navigation";
import LoginModal from "./_components/_modals/LoginModal";
// import SignUpModal from "./_components/_modals/SignUpModal";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);
  // const openSignUpModal = () => setShowSignUpModal(true);
  // const closeSignUpModal = () => setShowSignUpModal(false);
  const router = useRouter();

  const handleLogin = (username, password) => {
    console.log(
      "Logging in with username:",
      username,
      "and password:",
      password,
    );
  };

  const handleSignUp = () => {
    router.push("/SignUp");
  };

  // const handleSignUp = (username, email, password) => {
  //   console.log(
  //     "Signing up with username:",
  //     username,
  //     "email:",
  //     email,
  //     "and password:",
  //     password,
  //   );
  // };

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
    <div
      className="text-white"
      style={{
        backgroundImage: "url('/images/mountains.jpeg')",
        backgroundSize: "cover",
        backgroundAttachment: "scroll", // Scroll along with the content
      }}
    >
      <Head>
        <title>FitFusion</title>
        <meta
          name="description"
          content="Elevate your fitness with FitFusion"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-purple-700 bg-opacity-75 py-2 text-center">
        <h1 className="text-lg font-semibold">FitFusion</h1>
      </header>
      <Header />
      <main>
        <div className="h-screen flex justify-center items-center">
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
              onClick={() => router.push("/SignUp")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </main>
      {/* testemonials */}
      <section className="py-10 justify-center items-center">
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
      <LoginModal
        isOpen={showLoginModal}
        onClose={closeLoginModal}
        onLogin={handleLogin}
      />
      {/* <SignUpModal
        isOpen={showSignUpModal}
        onClose={closeSignUpModal}
        onSignUp={handleSignUp}
      /> */}
      */
    </div>
  );
}
