import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [localData, setLocalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/home");
    }
    const localData = JSON.parse(localStorage.getItem("myData")) || [];
    setLocalData(localData);
  }, []);

  const schema = yup.object({
    /// yup schema
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Password must contain at least one number and one special character"
      ),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // provide schema
  });

  const submitButton = (data) => {
    console.log("working");
    const existingUser = localData.find(
      (entry) => entry.email.toLowerCase() === data.email.toLowerCase()
    );
    if (existingUser) {
      if (existingUser.password === data.password) {
        alert("Login succes !");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
        navigate("/home");
      } else {
        setShowModal(true);
      }
    } else {
      alert("no userfund");
    }
    console.log(data);
  };

  return (
    <div className="mt-6 flex flex-col justify-center items-center-safe ">
      <div
        className="p-7 border-2 w-[90%] sm:w-[70%] lg:w-[50%] xl:w-[30%]
 rounded-2xl"
      >
        <h1 className="text-center text-4xl">Sign In</h1>
        <form
          onSubmit={handleSubmit(submitButton)}
          className="max-w-md mx-auto mt-3 flex justify-center flex-col"
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("password")}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
      {/* this modal code  */}
      {showModal && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
          className="fixed inset-0 bg-opacity-10  flex justify-center items-center"
        >
          <div className="bg-white p-6 rounded-xl shadow-md w-80 text-center">
            <h2 className="text-lg font-bold mb-4">No User !</h2>
            <p>User is not in the database or wrong password !</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
