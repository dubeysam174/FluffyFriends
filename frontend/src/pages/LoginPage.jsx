import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import API from "../api/axios";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", formData);
      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
        }),
      );

      toast.success(`Welcome back ${data.user.name}`);

      if (data.user.role === "vet") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex overflow-hidden ">
      {/* left side image.... */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-red-100 to-pink-100 relative overflow-hidden">
        <img
          src="/login.jpg"
          alt="dog"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
        {/* right side - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* logo mobile only  */}
          <div className="lg:hidden text-center mb-8">
            <div className="text-5xl mb-2">🐾</div>
            <h1 className="text-3xl font-bold text-red-600">FluffyFriends</h1>
          </div>

          {/* heading */}
          
          <div className="mb-2 overflow-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome Back! 
            </h2>
            <p className="text-gray-600 text-sm italic">
             Please Login to move forward
            </p>
          </div>
          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* email field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-2.5 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-red-500 transition"
                  required
                />
              </div>
            </div>
            {/* password field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {" "}
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-2.5 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-red-500 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400"
                >
                  {" "}
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
           
            {/* sign in button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition disabled: opacity-50 mt-6"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                OR CONTINUE WITH
              </span>
            </div>
          </div>
          <button className="w-full border-2 border-gray-200 text-gray-700 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-red-500 font-semibold hover:text-red-600"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
