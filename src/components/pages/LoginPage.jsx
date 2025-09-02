import React from "react";
import { useForm } from "react-hook-form";
import Orb from "../ui/Orb";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ✅ import auth context

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ get setUser from context

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://shortly-backend-amcp.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ keep cookie
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("Server Response:", result);

      if (response.ok) {
        alert(result.message || "Login successful ✅");

        // ✅ store logged-in user in context
        setUser(result.user);

        // ✅ redirect to home
        navigate("/");
      } else {
        alert(result.message || "Login failed ❌");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >
      {/* Orb Background */}
      <Orb
        hoverIntensity={0.5}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
      />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-500/5 backdrop-blur-md rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-1">Email or Phone</label>
              <input
                type="text"
                {...register("email", {
                  required: "Email or Phone is required",
                })}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter your email or phone"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-400 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-medium py-2 px-4 rounded-lg mt-4"
            >
              Submit
            </button>
          </form>

          <div className="text-white flex items-center mt-3 justify-center">
            <p className="mr-6">Don't have account</p>
            <Link
              to="/signup"
              className="bg-gray-800 h-10 w-28 flex items-center justify-center rounded-2xl hover:bg-teal-200 hover:text-black transition delay-75"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
