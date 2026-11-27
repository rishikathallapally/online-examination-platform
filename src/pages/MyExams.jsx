
import { useState } from "react";
import {
  BookOpen,
  Clock,
  FileQuestion,
  Search,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

function MyExams() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const [difficulty, setDifficulty] = useState("All");

  const exams = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      subject: "Web Development",
      duration: "30 mins",
      questions: 20,
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "React Development",
      subject: "Frontend Development",
      duration: "45 mins",
      questions: 25,
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "HTML & CSS Mastery",
      subject: "Web Design",
      duration: "30 mins",
      questions: 20,
      difficulty: "Beginner",
    },
    {
      id: 4,
      title: "JavaScript Advanced",
      subject: "Web Development",
      duration: "60 mins",
      questions: 30,
      difficulty: "Advanced",
    },
    {
      id: 5,
      title: "Tailwind CSS",
      subject: "CSS Framework",
      duration: "30 mins",
      questions: 20,
      difficulty: "Beginner",
    },
    {
      id: 6,
      title: "React Hooks & State Management",
      subject: "React Development",
      duration: "45 mins",
      questions: 25,
      difficulty: "Intermediate",
    },
  ];

  const filteredExams = exams.filter((exam) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const matchesSearch =
      exam.title.toLowerCase().includes(normalizedSearch) ||
      exam.subject.toLowerCase().includes(normalizedSearch);

    const matchesDifficulty =
      difficulty === "All" || exam.difficulty === difficulty;

    return matchesSearch && matchesDifficulty;
  });

  const handleViewExam = (exam) => {
    navigate("/exam-instructions", {
      state: { exam },
    });
  };

  return (
    <main className="p-4 sm:p-5 md:p-8">
      {/* Heading */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
          My Exams
        </h1>

        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
          Explore available examinations and test your knowledge.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] sm:grid-cols-[minmax(0,1fr)_13rem] gap-2 sm:gap-3 mb-6 sm:mb-8">
        {/* Search */}
        <div className="min-w-0 flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2.5 rounded-lg focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500">
          <Search
            size={17}
            className="text-slate-400 shrink-0"
            aria-hidden="true"
          />

          <label htmlFor="exam-search" className="sr-only">
            Search exams by title or subject
          </label>

          <input
            id="exam-search"
            name="search"
            type="search"
            placeholder="Search exams..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="bg-transparent outline-none w-full min-w-0 text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-400"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="min-w-0">
          <label htmlFor="difficulty-filter" className="sr-only">
            Filter exams by difficulty
          </label>

          <select
            id="difficulty-filter"
            name="difficulty"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            className="w-full min-w-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-white text-xs sm:text-sm px-2 sm:px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Exam Count */}
      <p
        className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 sm:mb-5"
        role="status"
        aria-live="polite"
      >
        Showing {filteredExams.length} of {exams.length} examinations
      </p>

      {/* Exam Cards */}
      {filteredExams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {filteredExams.map((exam) => (
            <article
              key={exam.id}
              className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex justify-between items-center mb-5 gap-3">
                <div className="w-11 h-11 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen size={21} aria-hidden="true" />
                </div>

                <span className="text-xs font-semibold bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 px-3 py-2 rounded-full">
                  {exam.difficulty}
                </span>
              </div>

              <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2">
                {exam.subject}
              </p>

              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-5">
                {exam.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <span className="flex items-center gap-2">
                  <Clock size={16} aria-hidden="true" />
                  {exam.duration}
                </span>

                <span className="flex items-center gap-2">
                  <FileQuestion size={16} aria-hidden="true" />
                  {exam.questions} Questions
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleViewExam(exam)}
                className="w-full mt-auto bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                View Exam
                <span className="sr-only">
                  : {exam.title}
                </span>
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-10 text-center"
          role="status"
        >
          <BookOpen
            size={35}
            className="mx-auto text-slate-400 mb-4"
            aria-hidden="true"
          />

          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            No exams found
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Try changing your search or difficulty filter.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setDifficulty("All");
            }}
            className="mt-5 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
          >
            Clear filters
          </button>
        </div>
      )}
    </main>
  );
}

export default MyExams;
