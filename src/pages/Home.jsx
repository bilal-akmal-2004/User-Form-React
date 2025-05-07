import React from "react";

import { useNavigate } from "react-router-dom";
export default function Home() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    navigate("/signin");
  };

  return (
    <div className="flex justify-center flex-col items-center h-[93vh] ">
      <h1 className="text-5xl">Home</h1>
      <br />
      <h3 className="text-2xl">
        Welcome {user.first_name} {user.last_name}
      </h3>
      <br />
      <button
        onClick={handleLogout}
        className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Log Out
      </button>
    </div>
  );
}
