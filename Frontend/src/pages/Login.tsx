import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Heart } from "lucide-react";
import { useApi } from "../hooks/useApi"; // Import the useApi hook

export default function Login({
  setIsAuth,
}: {
  setIsAuth: (auth: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { fetchData, loading } = useApi<
    { emailId: string; password: string },
    { token: string }
  >();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    try {
      const response = await fetchData("/auth/login", "POST", {
        body: { emailId: email, password },
      });
  
      if (response) {
        console.log("Token from server:", response.token); // Check token format here
        localStorage.setItem("authToken", response.token);
        setIsAuth(true);
        navigate("/home");
      }
    } catch (err) {
      const error = err as Error;
      setError(
        error.message.includes("401") 
          ? "Please verify your email before logging in"
          : "Invalid credentials"
      );
    }
  };
  

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-blue-50 p-8 md:mt-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <Heart className="h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log In
          </h2>
        </div>
        {error && (
          <div className="text-red-500 text-center text-sm">{error}</div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="mt-1 relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email"
              />
            </div>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <div className="text-center text-sm">
            Don't have an Account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
