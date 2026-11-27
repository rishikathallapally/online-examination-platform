
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Mail, Lock, Eye, EyeOff } from "lucide-react";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      email.trim().toLowerCase() === "demo@examly.com" &&
      password === "examly123"
    ) {
      setError("");
      onLogin();
      navigate("/");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-5">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-200 dark:shadow-none mb-4">
            <BookOpen size={32} aria-hidden="true" />
          </div>

          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            EXAMLY
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Your learning journey starts here.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl p-7 md:p-8">

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Welcome Back!
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-7">
            Sign in to continue to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email"
                  autoComplete="username"
                  required
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "login-error" : undefined}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-700"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "login-error" : undefined}
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-700"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-md p-1"
                >
                  {showPassword ? (
                    <EyeOff size={19} aria-hidden="true" />
                  ) : (
                    <Eye size={19} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p
                id="login-error"
                role="alert"
                aria-live="assertive"
                className="text-sm text-red-600 dark:text-red-400 font-medium"
              >
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition shadow-md shadow-purple-200 dark:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              Sign In
            </button>

          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20">
            <p className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-2">
              Demo Login Credentials
            </p>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Email: demo@examly.com
            </p>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Password: examly123
            </p>
          </div>

        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          © 2026 EXAMLY. All rights reserved.
        </p>

      </div>
    </div>
  );
}

export default Login;
