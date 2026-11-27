
import { useState } from "react";
import {
  History as HistoryIcon,
  CalendarDays,
  BookOpen,
  Search,
} from "lucide-react";

// Support both old and new result status values.
function isFailedResult(status) {
  return status === "Failed" || status === "Needs Improvement";
}

// Use timestamp when available, otherwise fall back to the result ID or date.
function getResultTime(result) {
  if (result.timestamp) {
    const timestamp = new Date(result.timestamp).getTime();

    if (!Number.isNaN(timestamp)) {
      return timestamp;
    }
  }

  const idAsNumber = Number(result.id);

  if (Number.isFinite(idAsNumber) && idAsNumber > 0) {
    return idAsNumber;
  }

  const dateTime = new Date(result.date).getTime();

  return Number.isNaN(dateTime) ? 0 : dateTime;
}

// Read saved history safely when the component initializes.
function getSavedResults() {
  try {
    const savedResults = JSON.parse(
      localStorage.getItem("examHistory") || "[]"
    );

    return Array.isArray(savedResults) ? savedResults : [];
  } catch (error) {
    console.error("Unable to load exam history:", error);
    return [];
  }
}

function History() {
  const [results] = useState(getSavedResults);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  const filteredResults = results
    .filter((result) => {
      const examTitle = result.examTitle || "";

      const matchesSearch = examTitle
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Passed" && result.status === "Passed") ||
        (statusFilter === "Failed" && isFailedResult(result.status));

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const difference = getResultTime(b) - getResultTime(a);

      return sortOrder === "Newest" ? difference : -difference;
    });

  return (
    <main className="p-4 sm:p-5 md:p-8">
      {/* Heading */}
      <div className="mb-6 sm:mb-8">
        <p className="mb-2 text-xs font-semibold text-purple-600 dark:text-purple-400 sm:text-sm">
          YOUR PERFORMANCE
        </p>

        <h1 className="text-2xl font-bold text-slate-800 dark:text-white md:text-3xl">
          Exam History
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
          Track your previously completed examinations.
        </p>
      </div>

      {/* History Count */}
      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 sm:h-12 sm:w-12">
          <HistoryIcon size={22} aria-hidden="true" />
        </div>

        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Completed Examinations
          </p>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            {results.length}
          </h2>
        </div>
      </div>

      {/* Search and Filters */}
      {results.length > 0 && (
        <div className="mb-6 grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,1fr)] gap-2 md:grid-cols-[minmax(0,1fr)_10rem_10rem] sm:gap-3">
          {/* Search */}
          <div className="flex min-w-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-2.5 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500 dark:border-slate-800 dark:bg-slate-900 sm:gap-2 sm:px-3">
            <Search
              size={15}
              className="shrink-0 text-slate-400"
              aria-hidden="true"
            />

            <label htmlFor="history-search" className="sr-only">
              Search exam history
            </label>

            <input
              id="history-search"
              name="search"
              type="search"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full min-w-0 bg-transparent text-[11px] text-slate-800 outline-none placeholder:text-slate-400 dark:text-white sm:text-sm"
            />
          </div>

          {/* Status Filter */}
          <div className="min-w-0">
            <label htmlFor="history-status" className="sr-only">
              Filter by result status
            </label>

            <select
              id="history-status"
              name="status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full min-w-0 rounded-lg border border-slate-200 bg-white px-1.5 py-2.5 text-[11px] text-slate-700 outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white sm:px-3 sm:text-sm"
            >
              <option value="All">All Results</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="min-w-0">
            <label htmlFor="history-sort" className="sr-only">
              Sort exam history
            </label>

            <select
              id="history-sort"
              name="sort"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="w-full min-w-0 rounded-lg border border-slate-200 bg-white px-1.5 py-2.5 text-[11px] text-slate-700 outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white sm:px-3 sm:text-sm"
            >
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
            </select>
          </div>
        </div>
      )}

      {/* Exam History */}
      {results.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 sm:h-16 sm:w-16">
            <BookOpen size={28} aria-hidden="true" />
          </div>

          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            No Exam History Yet
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Complete your first examination to see your results here.
          </p>
        </div>
      ) : filteredResults.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <BookOpen
            size={32}
            className="mx-auto mb-3 text-slate-400"
            aria-hidden="true"
          />

          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            No Matching Results
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResults.map((result, index) => (
            <article
              key={result.id || index}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5 md:p-6"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="min-w-0">
                  <h3 className="break-words text-base font-bold text-slate-800 dark:text-white sm:text-lg">
                    {result.examTitle || "Untitled Examination"}
                  </h3>

                  <p className="mt-1 text-sm text-purple-600 dark:text-purple-400">
                    {result.subject || "General"}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500">
                    <CalendarDays size={15} aria-hidden="true" />
                    {result.date || "Date unavailable"}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Score
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
                      {result.score}/{result.totalQuestions}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Percentage
                    </p>

                    <p className="mt-1 text-lg font-bold text-purple-600 dark:text-purple-400 sm:text-xl">
                      {result.percentage}%
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-2 text-xs font-semibold sm:px-4 ${
                      result.status === "Passed"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {result.status || "Not available"}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default History;
