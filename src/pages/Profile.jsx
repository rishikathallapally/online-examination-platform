
import { useState } from "react";
import {
  GraduationCap,
  Save,
  CheckCircle2,
  BookOpen,
  Award,
  Target,
  Edit3,
} from "lucide-react";

const defaultProfile = {
  name: "Rishika",
  email: "rishika@example.com",
  phone: "",
  qualification: "BSc Computer Science",
  course: "Full Stack Development",
  bio: "",
};

// Load the saved profile safely
function getSavedProfile() {
  try {
    const savedProfile = localStorage.getItem("examProfile");

    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);

      if (
        parsedProfile &&
        typeof parsedProfile === "object" &&
        !Array.isArray(parsedProfile)
      ) {
        return Object.fromEntries(
          Object.keys(defaultProfile).map((key) => [
            key,
            typeof parsedProfile[key] === "string"
              ? parsedProfile[key]
              : defaultProfile[key],
          ])
        );
      }
    }
  } catch (error) {
    console.error("Unable to load profile:", error);
  }

  return { ...defaultProfile };
}

// Load examination statistics safely
function getExamStats() {
  try {
    const savedHistory = localStorage.getItem("examHistory");
    const history = savedHistory ? JSON.parse(savedHistory) : [];

    if (!Array.isArray(history)) {
      return { completed: 0, average: 0, passed: 0 };
    }

    const completed = history.length;

    const average =
      completed > 0
        ? Math.round(
            history.reduce(
              (total, exam) =>
                total + (Number(exam?.percentage) || 0),
              0
            ) / completed
          )
        : 0;

    const passed = history.filter(
      (exam) => exam?.status === "Passed"
    ).length;

    return { completed, average, passed };
  } catch (error) {
    console.error("Unable to load exam history:", error);

    return { completed: 0, average: 0, passed: 0 };
  }
}

function Profile() {
  const [profile, setProfile] = useState(getSavedProfile);
  const [saved, setSaved] = useState(false);
  const [examStats] = useState(getExamStats);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    try {
      localStorage.setItem(
        "examProfile",
        JSON.stringify(profile)
      );

      setSaved(true);
    } catch (error) {
      console.error("Unable to save profile:", error);
      setSaved(false);
    }
  };

  const totalFields = 6;

  const completedFields = Object.values(profile).filter(
    (value) =>
      typeof value === "string" && value.trim() !== ""
  ).length;

  const completionPercentage = Math.round(
    (completedFields / totalFields) * 100
  );

  const initial = profile.name.trim()
    ? profile.name.trim().charAt(0).toUpperCase()
    : "S";

  const inputClass =
    "w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-800 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-700 transition";

  const labelClass =
    "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2";

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">

      {/* Page Heading */}
      <div className="mb-8">
        <p className="text-sm text-purple-600 dark:text-purple-400 font-bold tracking-wider mb-2">
          ACCOUNT SETTINGS
        </p>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
          My Profile
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Manage your personal information and track your learning journey.
        </p>
      </div>

      {/* Profile Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 p-6 md:p-8 mb-7 shadow-lg">

        <div
          aria-hidden="true"
          className="absolute -right-10 -top-16 w-64 h-64 rounded-full bg-white/10"
        />

        <div
          aria-hidden="true"
          className="absolute right-36 -bottom-24 w-52 h-52 rounded-full bg-white/10"
        />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">

          <div
            aria-hidden="true"
            className="w-24 h-24 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-4xl font-bold shadow-lg"
          >
            {initial}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-white break-words">
                {profile.name || "Your Name"}
              </h2>

              <span className="flex items-center gap-1 text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full">
                <CheckCircle2 size={13} aria-hidden="true" />
                Student
              </span>
            </div>

            <p className="text-purple-100 text-sm mb-2 break-all">
              {profile.email || "Add your email address"}
            </p>

            <p className="text-purple-100 text-sm">
              {profile.course || "Add your current course"}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/15 text-white px-4 py-3 rounded-xl text-sm font-semibold">
            <Award size={20} aria-hidden="true" />
            EXAMLY Learner
          </div>

        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <BookOpen size={22} aria-hidden="true" />
            </div>
            <span className="text-xs text-slate-400">
              All time
            </span>
          </div>

          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            {examStats.completed}
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Exams Completed
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Target size={22} aria-hidden="true" />
            </div>
            <span className="text-xs text-slate-400">
              Overall
            </span>
          </div>

          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            {examStats.average}%
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Average Score
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center">
              <Award size={22} aria-hidden="true" />
            </div>
            <span className="text-xs text-slate-400">
              Successful
            </span>
          </div>

          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            {examStats.passed}
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Exams Passed
          </p>
        </div>

      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

        {/* Profile Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm p-5 md:p-7">

          <div className="flex items-center gap-3 mb-7">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Edit3 size={20} aria-hidden="true" />
            </div>

            <div>
              <h2 className="font-bold text-lg text-slate-800 dark:text-white">
                Personal Information
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Update your account details.
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">

            {/* Personal Details */}
            <div>
              <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400 mb-4">
                PERSONAL DETAILS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>
                  <label htmlFor="profile-name" className={labelClass}>
                    Full Name
                  </label>

                  <input
                    id="profile-name"
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                    className={inputClass}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="profile-email" className={labelClass}>
                    Email Address
                  </label>

                  <input
                    id="profile-email"
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    className={inputClass}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="profile-phone" className={labelClass}>
                    Phone Number
                  </label>

                  <input
                    id="profile-phone"
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className={inputClass}
                    placeholder="Enter your phone number"
                  />
                </div>

              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800" />

            {/* Academic Details */}
            <div>
              <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400 mb-4">
                ACADEMIC DETAILS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>
                  <label htmlFor="profile-qualification" className={labelClass}>
                    Qualification
                  </label>

                  <input
                    id="profile-qualification"
                    type="text"
                    name="qualification"
                    value={profile.qualification}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Your qualification"
                  />
                </div>

                <div>
                  <label htmlFor="profile-course" className={labelClass}>
                    Current Course
                  </label>

                  <input
                    id="profile-course"
                    type="text"
                    name="course"
                    value={profile.course}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Your current course"
                  />
                </div>

              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800" />

            {/* About */}
            <div>
              <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400 mb-4">
                ABOUT ME
              </h3>

              <label htmlFor="profile-bio" className={labelClass}>
                Short Bio
              </label>

              <textarea
                id="profile-bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows={4}
                maxLength={250}
                aria-describedby="bio-character-count"
                className={`${inputClass} resize-none`}
                placeholder="Tell us a little about yourself and your learning goals..."
              />

              <p
                id="bio-character-count"
                aria-live="polite"
                className="text-xs text-slate-400 text-right mt-1"
              >
                {profile.bio.length}/250 characters
              </p>
            </div>

            {/* Save */}
            <div className="pt-2">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-7 py-3 rounded-xl font-semibold transition shadow-md shadow-purple-200 dark:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                <Save size={18} aria-hidden="true" />
                Save Changes
              </button>

              {saved && (
                <p
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 mt-4 font-medium"
                >
                  <CheckCircle2 size={17} aria-hidden="true" />
                  Your profile has been updated successfully!
                </p>
              )}
            </div>

          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* Completion */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm p-6">

            <h2 className="font-bold text-slate-800 dark:text-white mb-2">
              Profile Completion
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              Complete your profile to keep your information up to date.
            </p>

            <div className="flex items-center justify-center mb-5">
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(#9333ea ${completionPercentage * 3.6}deg, #e2e8f0 0deg)`,
                }}
                role="img"
                aria-label={`Profile ${completionPercentage}% complete`}
              >
                <div className="w-28 h-28 rounded-full bg-white dark:bg-slate-900 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {completionPercentage}%
                  </span>

                  <span className="text-xs text-slate-400">
                    Completed
                  </span>
                </div>
              </div>
            </div>

            <div
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"
              role="progressbar"
              aria-label="Profile completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={completionPercentage}
            >
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            <p className="text-xs text-slate-400 mt-3 text-center">
              {completedFields} of {totalFields} fields completed
            </p>

          </div>

          {/* Learning Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">

            <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center mb-4">
              <GraduationCap size={24} aria-hidden="true" />
            </div>

            <h2 className="font-bold text-lg mb-2">
              Keep Learning!
            </h2>

            <p className="text-sm text-purple-100 leading-relaxed">
              Every examination is an opportunity to improve your knowledge and skills.
            </p>

            <div className="flex items-center gap-2 mt-5 text-sm font-semibold">
              <CheckCircle2 size={17} aria-hidden="true" />
              Keep growing with EXAMLY
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
