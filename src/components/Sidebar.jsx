
import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Award,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar({ onLogout }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const cancelButtonRef = useRef(null);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "My Exams", path: "/my-exams", icon: BookOpen },
    { name: "Exam History", path: "/history", icon: ClipboardList },
    { name: "Results", path: "/results", icon: Award },
    { name: "My Profile", path: "/profile", icon: UserRound },
  ];

  useEffect(() => {
    if (showLogoutConfirm) {
      cancelButtonRef.current?.focus();
    }
  }, [showLogoutConfirm]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setShowLogoutConfirm(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
      isActive
        ? "bg-purple-50 dark:bg-purple-500/15 text-purple-700 dark:text-purple-400 border-l-4 border-purple-600"
        : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
    }`;

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout?.();
  };

  return (
    <>
      <aside className="w-64 h-screen sticky top-0 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col p-5 sm:p-6 overflow-y-auto">
        {/* Logo */}
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-bold tracking-tight text-purple-600 dark:text-purple-400">
            EXAMLY
          </h1>

          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Online Examination Platform
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Main navigation" className="flex-1">
          <p className="text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 mb-4 px-3">
            MENU
          </p>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/"}
                  className={linkStyle}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-5 space-y-2">
          <NavLink to="/settings" className={linkStyle}>
            <Settings size={20} aria-hidden="true" />
            <span>Settings</span>
          </NavLink>

          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <LogOut size={20} aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowLogoutConfirm(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sidebar-logout-title"
            aria-describedby="sidebar-logout-description"
            className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-6"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center text-red-600 mb-4">
              <LogOut size={23} aria-hidden="true" />
            </div>

            <h3
              id="sidebar-logout-title"
              className="text-xl font-bold text-slate-800 dark:text-white"
            >
              Log out?
            </h3>

            <p
              id="sidebar-logout-description"
              className="text-sm text-slate-500 dark:text-slate-400 mt-2"
            >
              Are you sure you want to log out of EXAMLY?
            </p>

            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
              <button
                ref={cancelButtonRef}
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmLogout}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
