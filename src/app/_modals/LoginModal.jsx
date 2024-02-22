"use client";
import { useState } from "react";

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(username, password);
    setUsername("");
    setPassword("");
    onClose();
  };

  return (
    <div
      className={
        isOpen
          ? "fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
          : "hidden"
      }
    >
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full border-gray-300 rounded-md px-4 py-2 mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full border-gray-300 rounded-md px-4 py-2 mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Login
          </button>
        </form>
        <button onClick={onClose} className="mt-2 text-sm text-gray-600">
          Close
        </button>
      </div>
    </div>
  );
}
