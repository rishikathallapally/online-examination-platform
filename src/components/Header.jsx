
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  User,
  Settings,
  LogOut,
  X,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header({ onMenuClick, onLogout }) {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setShowNotifications(false);
        setShowProfileMenu(false);

        if (showLogoutConfirm) {
          setShowLogoutConfirm(false);
        }
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showLogoutConfirm]);

  useEffect(() => {
    if (showLogoutConfirm) {
      cancelButtonRef.current?.focus();
    }
  }, [showLogoutConfirm]);

  const closeMenus = () => {
    setShowNotifications(false);
    setShowProfileMenu(false);
  };

  const openLogoutConfirmation = () => {
    closeMenus();
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout?.();
  };

  return (
    <header className="relative z-30 flex items-center justify-between gap-3 bg-white dark:bg-slate-900 px-3 sm:px-4 md:px-8 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800">
      {/* Left Section */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          aria-label="Open navigation menu"
        >
          <Menu size={23} aria-hidden="true" />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-6 shrink-0">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={() => {
              setShowNotifications((open) => !open);
              setShowProfileMenu(false);
            }}
            aria-label="Notifications"
            aria-expanded={showNotifications}
            aria-controls="notification-panel"
            className="relative text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            <Bell size={21} aria-hidden="true" />
            <span
              className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              aria-hidden="true"
            />
          </button>

          {showNotifications && (
            <div
              id="notification-panel"
              className="absolute right-0 top-12 w-[min(19rem,calc(100vw-1.5rem))] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-4"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="font-bold text-slate-800 dark:text-white">
                  Notifications
                </h3>

                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  aria-label="Close notifications"
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="flex gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-500/10">
                <BookOpen
                  size={20}
                  className="text-purple-600 dark:text-purple-400 shrink-0 mt-1"
                  aria-hidden="true"
                />

                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    Welcome to EXAMLY!
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Explore your available examinations and start learning.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setShowProfileMenu((open) => !open);
              setShowNotifications(false);
            }}
            aria-label="Open profile menu"
            aria-expanded={showProfileMenu}
            aria-controls="profile-menu"
            className="flex items-center gap-2 sm:gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 font-semibold"
              aria-hidden="true"
            >
              R
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                Rishika
              </p>

              <p className="text-xs text-slate-400 dark:text-slate-500">
                Student
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`text-slate-400 transition ${
                showProfileMenu ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {showProfileMenu && (
            <div
              id="profile-menu"
              className="absolute right-0 top-12 w-52 max-w-[calc(100vw-1.5rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2"
            >
              <button
                type="button"
                onClick={() => {
                  navigate("/profile");
                  closeMenus();
                }}
                className="flex items-center gap-3 w-full p-3 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                <User size={18} aria-hidden="true" />
                My Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate("/settings");
                  closeMenus();
                }}
                className="flex items-center gap-3 w-full p-3 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                <Settings size={18} aria-hidden="true" />
                Settings
              </button>

              <div className="border-t border-slate-200 dark:border-slate-800 my-1" />

              <button
                type="button"
                onClick={openLogoutConfirmation}
                className="flex items-center gap-3 w-full p-3 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <LogOut size={18} aria-hidden="true" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>

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
            aria-labelledby="logout-title"
            aria-describedby="logout-description"
            className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-6"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center text-red-600 mb-4">
              <LogOut size={23} aria-hidden="true" />
            </div>

            <h3
              id="logout-title"
              className="text-xl font-bold text-slate-800 dark:text-white"
            >
              Log out?
            </h3>

            <p
              id="logout-description"
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
    </header>
  );
}

export default Header;
