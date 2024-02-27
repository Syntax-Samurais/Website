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
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${isOpen ? "" : "hidden"}`}
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
