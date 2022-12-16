// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../reducer/slices/authSlice";

import axios from "axios";

import Logo from "../../assets/logo.svg";

// ||||||||||||||||||||||||||||| Login Component ||||||||||||||||||||||||||||||||||||

const Login = () => {
  // Hooks
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.length <= 0 || pwd.length <= 0) {
      alert("Field are empty, please retry.");
    } else {
      await axios
        .post("/api/users", {
          email: email,
          pwd: pwd,
        })
        .then((res) => {
          dispatch(
            getUser({
              user_id: res.data.id,
              username: res.data.username,
              isConnected: true,
            })
          );
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    }
  };

  // Functions
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  return (
    <main className="login w-full h-full flex justify-center items-center">
      <div className="first space-y-8">
        <div className="logo">
          <img src={Logo} alt="" className="w-[84px] mx-auto mb-9" />
        </div>
        <form
          onSubmit={handleSubmit.bind(this)}
          className="bg-[#D3D0CB] rounded-lg px-16 py-12 text-center"
        >
          <div className="first space-y-3 mb-12">
            <h1 className="font-bold text-3xl">Welcome Back</h1>
            <h2 className="text-xl">
              Enter your credentials to access your account.
            </h2>
          </div>
          <div className="second space-y-6">
            <div className="input">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-6"
                placeholder="Enter your Email"
              />
            </div>
            <div className="input">
              <input
                type="password"
                name="pwd"
                id="pwd"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="w-full py-2 px-6"
                placeholder="Enter your Password"
              />
            </div>
            <div className="button">
              <button
                type="submit"
                className="w-full py-2 px-6 font-medium bg-[#e6c088] rounded-lg hover:bg-[#d4b98f]"
              >
                Login
              </button>
            </div>
          </div>
        </form>
        <div className="forget-pwd text-center">
          <p>
            Forget your password ? <Link to="/">Reset Password</Link>
          </p>
        </div>
      </div>
    </main>
  );
};
export default Login;
