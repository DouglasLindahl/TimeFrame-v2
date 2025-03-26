"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabase";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.push("/home"); // Redirect if authenticated
      }
    };

    checkAuth();
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!isLogin) {
        // Register logic
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) {
          console.log("Registration error:", error);
          setError("Registration failed");
        } else {
          router.push("/emailConfirmation");
        }
      } else {
        // Login logic
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (error) {
          console.log("Authentication error:", error);
          setError("Email or password is incorrect");
        } else {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user) {
            router.push("/home");
          } else {
            console.log("wrong password");
            setError("Email or password is incorrect");
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
      <div className="w-full max-w-lg bg-[var(--color-background-dark)] p-6 rounded-2xl shadow-2xl">
        {/* Login/Register Toggle */}
        <div className="flex mb-4 shadow-lg">
          <button
            className={`w-1/2 py-2 rounded-l-lg ${
              isLogin
                ? "bg-[var(--color-primary)] text-white"
                : "bg-background text-white"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 rounded-r-lg ${
              !isLogin
                ? "bg-[var(--color-primary)] text-white"
                : "bg-background text-white"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {error && (
          <p className="text-[var(--color-error)] text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {/* First & Last Name (Only for Register) */}
          {!isLogin && (
            <div className="flex space-x-2">
              <div className="w-1/2 bg-background text-white p-3 rounded-lg shadow-md">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-transparent focus:outline-none"
                  required
                />
              </div>
              <div className="w-1/2 bg-background text-white p-3 rounded-lg shadow-md">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="bg-background text-white p-3 rounded-lg shadow-md">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="bg-background text-white p-3 rounded-lg shadow-md">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
              required
            />
          </div>

          {/* Confirm Password (Only for Register) */}
          {!isLogin && (
            <div className="bg-background text-white p-3 rounded-lg shadow-md">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
                required
              />
            </div>
          )}

          {/* Phone Number (Only for Register) */}
          {!isLogin && (
            <div className="bg-background text-white p-3 rounded-lg shadow-md">
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
                required
              />
            </div>
          )}

          {/* Date of Birth (Only for Register) */}
          {!isLogin && (
            <div className="space-y-2">
              <div className="flex justify-between">
                {/* Month Dropdown */}
                <select
                  className="w-1/3 p-2 bg-background text-white rounded-md"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                >
                  <option value="">Month</option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                {/* Day Input */}
                <input
                  type="number"
                  placeholder="Day"
                  min="1"
                  max="31"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-1/4 p-2 bg-background text-white rounded-md"
                  required
                />

                {/* Year Input */}
                <input
                  type="number"
                  placeholder="Year"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-1/3 p-2 bg-background text-white rounded-md"
                  required
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] text-white py-2 rounded-lg shadow-md hover:bg-opacity-90"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
