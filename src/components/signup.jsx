import { useState } from "react";

const Signup = () => {
  const [Signupdata, setSignupdata] = useState({
    userName: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupdata({
      ...Signupdata,
      [name]: value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(Signupdata);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Registration
        </h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="userName" className="mb-2 text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="userName"
              value={Signupdata.userName}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-600 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              value={Signupdata.password}
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
