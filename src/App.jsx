import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/login";
import Signup from "./components/signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
