import React from "react";

const Nav = ({ toggleTheme }) => {
  return (
    <nav className="bg-white dark:bg-gray-900 text-black dark:text-white flex justify-around items-center">
      <h1 className="text-3xl font-bold">QR GENERATOR</h1>
      <button
        onClick={toggleTheme}
        className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 px-4 py-2 rounded text-white transition-all"
      >
        Toggle Theme
      </button>
    </nav>
  );
};

export default Nav;
