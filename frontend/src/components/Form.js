import React, { useState } from "react";

const Form = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isSignUp
        ? "http://localhost:8000/api/auth/register"
        : "http://localhost:8000/api/auth/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        if (isSignUp) {
          console.log("Signup successful:", data);
        } else {
          console.log("Login successful:", data);

          if (
            data.token &&
            data.instructor &&
            data.instructor.role &&
            data.instructor._id
          ) {
            localStorage.setItem("token", data.token);
            onLogin(data.instructor.role, data.instructor._id); // Pass the role and ID to App component
          } else {
            console.error("Invalid login response:", data);
          }
        }
      } else {
        console.error(`${isSignUp ? "Signup" : "Login"} failed:`, data.message);
      }

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="w-1/2 p-4">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="email"
            onChange={handleInputChange}
            value={formData.email}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            onChange={handleInputChange}
            value={formData.password}
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <p>
            {isSignUp ? "Already a member?" : "New instructor?"}
            <span
              className="underline cursor-pointer"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Form;
