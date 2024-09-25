import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signupUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    userName: "",
    password: "",
    qrData: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    signupUser(signupData);
    console.log("User signed up: ", signupData);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registration</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={signupData.name}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-600 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="userName" className="mb-2 text-sm font-medium">Username</label>
            <input
              type="text"
              name="userName"
              value={signupData.userName}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-600 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-600 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
