import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Main from "./components/main";
import Login from "./components/login";
import Signup from "./components/signup";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme); 
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Login toggleTheme={toggleTheme} />} />
            <Route path="/signup" element={<Signup toggleTheme={toggleTheme} />} />
            <Route path="/main" element={<Main toggleTheme={toggleTheme} />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
