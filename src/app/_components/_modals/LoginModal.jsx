"use client";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useUser = () => useContext(UserContext);

export default function LoginModal({ isOpen, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    try {
      const res = await fetch(
        `/api/Login?username=${username}&password=${password}`,
      );
      console.log(res); // 400 = missing field | 401 = invalid username or password | 200 = success

      if (res.status === 200) {
        const data = await res.json();
        const { id } = data;
        Cookies.set("user", id);
        router.push(`/Home`);
      } else if (res.status === 401) {
        alert("Invalid username or password.");
      } else if (res.status === 400) {
        alert("Username and password are required.");
      }
    } catch (error) {
      console.warn("Could not fetch item", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-sky-900 p-8 rounded-md relative pl-12 pr-12">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-12">
          Welcome <br /> Back
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full text-white rounded-full bg-gray-300 bg-opacity-50 border-gray-300 px-4 py-2 mb-6 text-center"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full text-white rounded-full bg-gray-300 bg-opacity-50 border-gray-300 px-4 py-2 mb-12 text-center"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full w-full mb-8"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
