
import { useState } from "react";
import {
  Moon,
  Bell,
  ShieldCheck,
  Trash2,
  Save,
  CheckCircle2,
} from "lucide-react";

const defaultSettings = {
  darkMode: false,
  notifications: true,
  confirmSubmit: true,
};

function getSavedSettings() {
  try {
    const savedSettings = localStorage.getItem("examSettings");

    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);

      if (
        parsedSettings &&
        typeof parsedSettings === "object" &&
        !Array.isArray(parsedSettings)
      ) {
        return {
          darkMode:
            typeof parsedSettings.darkMode === "boolean"
              ? parsedSettings.darkMode
              : defaultSettings.darkMode,
          notifications:
            typeof parsedSettings.notifications === "boolean"
              ? parsedSettings.notifications
              : defaultSettings.notifications,
          confirmSubmit:
            typeof parsedSettings.confirmSubmit === "boolean"
              ? parsedSettings.confirmSubmit
              : defaultSettings.confirmSubmit,
        };
      }
    }
  } catch (error) {
    console.error("Unable to load settings:", error);
  }

  return { ...defaultSettings };
}

function Settings({ darkMode, setDarkMode }) {
  const [settings, setSettings] = useState(getSavedSettings);
  const [saved, setSaved] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleToggle = (name) => {
    setSettings((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));

    setSaved(false);
    setFeedback("");
  };

  const handleSave = () => {
    try {
      const updatedSettings = {
        ...settings,
        darkMode,
      };

      localStorage.setItem(
        "examSettings",
        JSON.stringify(updatedSettings)
      );

      setSaved(true);
      setFeedback("Settings saved successfully!");
    } catch (error) {
      console.error("Unable to save settings:", error);
      setSaved(false);
      setFeedback("Unable to save settings. Please try again.");
    }
  };

  const handleClearHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all your exam history? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      localStorage.removeItem("examHistory");
      localStorage.removeItem("examLatestResult");

      setFeedback("Exam history cleared successfully!");
      setSaved(false);
    } catch (error) {
      console.error("Unable to clear exam history:", error);
      setFeedback("Unable to clear exam history. Please try again.");
      setSaved(false);
    }
  };

  const checkboxClass =
    "w-5 h-5 accent-purple-600 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded";

  return (
    <div className="p-5 md:p-8">

      {/* Heading */}
      <div className="mb-8">
        <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-2">
          PERSONALIZE YOUR EXPERIENCE
        </p>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
          Settings
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Manage your application preferences.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">

        {/* Appearance */}
        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Moon size={22} aria-hidden="true" />
            </div>

            <div>
              <h2 className="font-bold text-slate-800 dark:text-white">
                Appearance
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Customize your display preferences.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <label
                htmlFor="dark-mode"
                className="font-medium text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                Dark Mode
              </label>

              <p
                id="dark-mode-description"
                className="text-sm text-slate-500 dark:text-slate-400"
              >
                Enable dark appearance.
              </p>
            </div>

            <input
              id="dark-mode"
              name="darkMode"
              type="checkbox"
              role="switch"
              checked={darkMode}
              aria-describedby="dark-mode-description"
              onChange={() => {
                setDarkMode(!darkMode);
                setSaved(false);
                setFeedback("");
              }}
              className={checkboxClass}
            />
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Bell size={22} aria-hidden="true" />
            </div>

            <div>
              <h2 className="font-bold text-slate-800 dark:text-white">
                Notifications
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Manage your notification preference.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <label
                htmlFor="notifications"
                className="font-medium text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                Enable Notifications
              </label>

              <p
                id="notifications-description"
                className="text-sm text-slate-500 dark:text-slate-400"
              >
                Save your preference for application notifications.
              </p>
            </div>

            <input
              id="notifications"
              name="notifications"
              type="checkbox"
              role="switch"
              checked={settings.notifications}
              aria-describedby="notifications-description"
              onChange={() => handleToggle("notifications")}
              className={checkboxClass}
            />
          </div>
        </section>

        {/* Exam Preferences */}
        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
              <ShieldCheck size={22} aria-hidden="true" />
            </div>

            <div>
              <h2 className="font-bold text-slate-800 dark:text-white">
                Exam Preferences
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Customize your examination experience.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <label
                htmlFor="confirm-submit"
                className="font-medium text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                Confirm Before Submission
              </label>

              <p
                id="confirm-submit-description"
                className="text-sm text-slate-500 dark:text-slate-400"
              >
                Ask before submitting an examination.
              </p>
            </div>

            <input
              id="confirm-submit"
              name="confirmSubmit"
              type="checkbox"
              role="switch"
              checked={settings.confirmSubmit}
              aria-describedby="confirm-submit-description"
              onChange={() => handleToggle("confirmSubmit")}
              className={checkboxClass}
            />
          </div>
        </section>

        {/* Account Data */}
        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
              <Trash2 size={22} aria-hidden="true" />
            </div>

            <div>
              <h2 className="font-bold text-slate-800 dark:text-white">
                Account Data
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Manage your saved examination data.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClearHistory}
            className="flex items-center gap-2 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2.5 rounded-xl text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            <Trash2 size={17} aria-hidden="true" />
            Clear Exam History
          </button>
        </section>

        {/* Save Settings */}
        <div>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            <Save size={18} aria-hidden="true" />
            Save Settings
          </button>

          {feedback && (
            <p
              role="status"
              aria-live="polite"
              className={`flex items-center gap-2 text-sm mt-3 font-medium ${
                saved || feedback.includes("cleared")
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {saved && (
                <CheckCircle2 size={17} aria-hidden="true" />
              )}
              {feedback}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Settings;
