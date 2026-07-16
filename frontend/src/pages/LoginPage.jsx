import { useState } from "react";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

import petImage from "../assets/login.jpg";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-50 to-white flex flex-col lg:flex-row">

      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center px-10 lg:px-20 py-10">

        <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900">
          Welcome back,{" "}
          <span className="text-[#f2a5a1]">
            pet
            <br />
            parent
          </span>
          .
        </h1>

        <p className="mt-8 text-slate-500 text-lg max-w-xl">
          Track appointments, monitor wellness, and never miss a moment of your
          companion's care.
        </p>

        <div className="mt-10 rounded-3xl overflow-hidden shadow-lg max-w-2xl">
          <img
            src={petImage}
            alt="Pets"
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* Right Section */}

      <div className="w-full lg:w-[520px] flex items-center justify-center p-8">

        <div className="w-full bg-white rounded-3xl border border-slate-200 p-10 shadow-sm">

          <h2 className="text-4xl font-bold text-slate-900">
            Sign in to your account
          </h2>

          <p className="text-slate-500 mt-2 mb-8">
            Enter your details below to continue.
          </p>

          {/* Email */}

          <label className="font-medium">Email</label>

          <div className="mt-2 flex items-center border rounded-2xl px-4 py-3 bg-sky-50">
            <HiOutlineMail className="text-slate-500 text-xl" />

            <input
              type="email"
              placeholder="you@example.com"
              className="ml-3 w-full bg-transparent outline-none"
            />
          </div>

          {/* Password */}

          <label className="font-medium mt-6 block">
            Password
          </label>

          <div className="mt-2 flex items-center border rounded-2xl px-4 py-3 bg-sky-50">

            <HiOutlineLockClosed className="text-slate-500 text-xl" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="ml-3 w-full bg-transparent outline-none"
            />

            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? (
                <HiOutlineEyeOff className="text-xl text-slate-500" />
              ) : (
                <HiOutlineEye className="text-xl text-slate-500" />
              )}
            </button>
          </div>

          {/* Remember */}

          <div className="flex justify-between items-center mt-6">

            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" />
              Remember me
            </label>

            <a
              href="#"
              className="text-[#f2a5a1] font-medium"
            >
              Forgot password?
            </a>
          </div>

          {/* Login */}

          <button className="w-full mt-8 bg-[#ea9d98] hover:bg-[#df8e88] transition text-white py-4 rounded-2xl text-lg font-semibold">
            Sign in
          </button>

          {/* Divider */}

          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-slate-300"></div>

            <span className="px-4 text-slate-500 text-sm">
              OR CONTINUE WITH
            </span>

            <div className="flex-1 h-px bg-slate-300"></div>
          </div>

          {/* Google */}

          <button className="w-full border rounded-2xl py-4 flex justify-center items-center gap-3 hover:bg-slate-50 transition">
            <FcGoogle size={24} />
            <span className="font-medium">Google</span>
          </button>

          <p className="text-center mt-8 text-slate-600">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-[#f2a5a1] font-semibold"
            >
              Sign up
            </a>
          </p>

        </div>

      </div>
    </div>
  );
};

export default LoginPage
