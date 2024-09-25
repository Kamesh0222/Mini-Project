import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Nav from "./nav";

const Login = ({ toggleTheme }) => {
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginUser(loginData);
    if (success) {
      console.log("Login successful");
      navigate("/main");
    } else {
      console.log("Invalid login");
      alert("Invalid username or password");
    }
  };

  return (
    <div className="">
      <div className="text-center p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Nav toggleTheme={toggleTheme} />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="userName" className="mb-2 text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                name="userName"
                value={loginData.userName}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
            <div className="text-center text-sm">
              <a href="/signup" className="text-blue-500 hover:underline">
                Don’t have an account? Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
