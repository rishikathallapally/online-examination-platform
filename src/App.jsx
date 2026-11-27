
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import ExamCard from "./components/ExamCard";

import MyExams from "./pages/MyExams";
import ExamInstructions from "./pages/ExamInstructions";
import TakeExam from "./pages/TakeExam";
import Results from "./pages/Results";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import {
  BookOpen,
  CheckCircle2,
  TrendingUp,
  CalendarDays,
  X,
} from "lucide-react";

function readLocalStorage(key, fallback) {
  try {
    const savedValue = JSON.parse(localStorage.getItem(key) || "null");
    return savedValue ?? fallback;
  } catch (error) {
    console.error(`Unable to read ${key} from local storage:`, error);
    return fallback;
  }
}

function Dashboard() {
  const navigate = useNavigate();

  const [results] = useState(() => {
    const savedResults = readLocalStorage("examHistory", []);
    return Array.isArray(savedResults) ? savedResults : [];
  });

  const completedExams = results.length;

  const passedExams = results.filter(
    (result) => result.status === "Passed"
  ).length;

  const averageScore =
    completedExams > 0
      ? Math.round(
          results.reduce(
            (total, result) =>
              total + (Number(result.percentage) || 0),
            0
          ) / completedExams
        )
      : 0;

  const recentResults = [...results].reverse().slice(0, 3);

  return (
    <div className="p-4 sm:p-5 md:p-8">
      {/* Welcome Section */}
      <section className="mb-6 sm:mb-8">
        <h1 className="text-xl font-bold text-slate-800 dark:text-white sm:text-2xl md:text-3xl">
          Welcome back, Rishika! 👋
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
          Here's what's happening with your examinations today.
        </p>
      </section>

      {/* Statistics */}
      <section
        aria-label="Examination statistics"
        className="mb-8 grid grid-cols-2 gap-3 sm:mb-10 sm:gap-5 xl:grid-cols-4"
      >
        <StatCard
          title="Total Exams"
          value="6"
          description="Available examinations"
          icon={BookOpen}
          color="bg-purple-100 text-purple-600"
        />

        <StatCard
          title="Completed"
          value={String(completedExams).padStart(2, "0")}
          description="Exams successfully completed"
          icon={CheckCircle2}
          color="bg-green-100 text-green-600"
        />

        <StatCard
          title="Average Score"
          value={`${averageScore}%`}
          description="Your overall performance"
          icon={TrendingUp}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Passed"
          value={String(passedExams).padStart(2, "0")}
          description="Exams successfully passed"
          icon={CalendarDays}
          color="bg-orange-100 text-orange-600"
        />
      </section>

      {/* Quick Actions */}
      <section
        aria-label="Quick actions"
        className="mb-8 grid grid-cols-1 gap-3 sm:mb-10 sm:grid-cols-2 sm:gap-5"
      >
        <button
          type="button"
          onClick={() => navigate("/my-exams")}
          className="rounded-2xl bg-purple-600 p-5 text-left text-white shadow-sm transition hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 sm:p-6"
        >
          <BookOpen
            size={24}
            className="mb-3 sm:mb-4"
            aria-hidden="true"
          />

          <h2 className="text-base font-bold sm:text-lg">
            Explore Examinations
          </h2>

          <p className="mt-1 text-sm text-purple-100">
            Find your next exam and test your knowledge.
          </p>
        </button>

        <button
          type="button"
          onClick={() => navigate("/history")}
          className="rounded-2xl border border-slate-100 bg-white p-5 text-left transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
        >
          <CalendarDays
            size={24}
            className="mb-3 text-purple-600 dark:text-purple-400 sm:mb-4"
            aria-hidden="true"
          />

          <h2 className="text-base font-bold text-slate-800 dark:text-white sm:text-lg">
            View Exam History
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Review your previous examination results.
          </p>
        </button>
      </section>

      {/* Recent Activity */}
      <section className="mb-8 sm:mb-10">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
              Recent Activity
            </h2>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              Your latest examination results.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/history")}
            className="shrink-0 rounded text-xs font-semibold text-purple-600 hover:text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:text-purple-400 sm:text-sm"
          >
            View All
          </button>
        </div>

        {recentResults.length > 0 ? (
          <div className="space-y-3">
            {recentResults.map((result, index) => (
              <div
                key={result.id || index}
                className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                <div className="min-w-0">
                  <h3 className="break-words text-sm font-semibold text-slate-800 dark:text-white sm:text-base">
                    {result.examTitle || "Untitled Examination"}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                    {result.date || "Date unavailable"}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <span className="text-sm font-bold text-purple-600 dark:text-purple-400 sm:text-base">
                    {Number(result.percentage) || 0}%
                  </span>

                  <span
                    className={`rounded-full px-3 py-2 text-xs font-semibold ${
                      result.status === "Passed"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {result.status || "Not available"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-100 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <BookOpen
              size={30}
              className="mx-auto mb-3 text-slate-400"
              aria-hidden="true"
            />

            <h3 className="font-semibold text-slate-800 dark:text-white">
              No Recent Activity
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Complete an examination to see your activity here.
            </p>
          </div>
        )}
      </section>

      {/* Available Examinations */}
      <section aria-labelledby="available-exams-heading">
        <div className="mb-5 sm:mb-6">
          <h2
            id="available-exams-heading"
            className="text-lg font-bold text-slate-800 dark:text-white sm:text-xl"
          >
            Available Examinations
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Choose an exam and test your knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          <ExamCard
            title="JavaScript Fundamentals"
            subject="WEB DEVELOPMENT"
            duration="30 mins"
            questions="20"
            difficulty="Beginner"
            color="bg-yellow-100 text-yellow-600"
          />

          <ExamCard
            title="React Development"
            subject="FRONTEND DEVELOPMENT"
            duration="45 mins"
            questions="25"
            difficulty="Intermediate"
            color="bg-blue-100 text-blue-600"
          />

          <ExamCard
            title="HTML & CSS Mastery"
            subject="WEB DESIGN"
            duration="30 mins"
            questions="20"
            difficulty="Beginner"
            color="bg-pink-100 text-pink-600"
          />
        </div>
      </section>
    </div>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("examlyLoggedIn") === "true"
  );

  const handleLogin = () => {
    localStorage.setItem("examlyLoggedIn", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("examlyLoggedIn");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };

  const [darkMode, setDarkMode] = useState(() => {
    const savedSettings = readLocalStorage("examSettings", {});
    return Boolean(savedSettings?.darkMode);
  });

  // The menu is only visible on the route where it was opened.
  // Navigating to another route automatically closes it.
  const [mobileMenuPath, setMobileMenuPath] = useState(null);

  const mobileMenuOpen = mobileMenuPath === location.pathname;

  const closeMobileMenu = () => {
    setMobileMenuPath(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuPath((currentPath) =>
      currentPath === location.pathname ? null : location.pathname
    );
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  if (location.pathname === "/login") {
    return isAuthenticated ? (
      <Navigate to="/" replace />
    ) : (
      <Login onLogin={handleLogin} />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar onLogout={handleLogout} />
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobileMenu}
            className="absolute inset-0 h-full w-full bg-black/50"
          />

          <div className="absolute bottom-0 left-0 top-0 z-10 overflow-y-auto shadow-2xl">
            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close sidebar"
              className="absolute right-3 top-4 z-20 rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <Sidebar onLogout={handleLogout} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        <Header
          onMenuClick={toggleMobileMenu}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-exams" element={<MyExams />} />
          <Route path="/exam-instructions" element={<ExamInstructions />} />
          <Route path="/take-exam" element={<TakeExam />} />
          <Route path="/results" element={<Results />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />

          <Route
            path="/settings"
            element={
              <Settings
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
