// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home_Page from "./pages/home/Home_Page";

// ||||||||||||||||||||||||||||| App Component ||||||||||||||||||||||||||||||||||||

const App = () => {
  // Hooks
  const [val, setVal] = useState();
  const { isConnected } = useSelector((state) => state.auth);

  // Functions
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  if (isConnected)
    return (
      <Routes>
        <Route path="/" element={<Home_Page />} />
      </Routes>
    );

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
    </Routes>
  );
};
export default App;
