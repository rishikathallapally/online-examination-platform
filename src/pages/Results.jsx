
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the result from navigation state or LocalStorage.
  const [result] = useState(() => {
    if (
      location.state?.exam &&
      Array.isArray(location.state.questions)
    ) {
      return location.state;
    }

    try {
      const savedResult = JSON.parse(
        localStorage.getItem("examLatestResult") || "null"
      );

      if (
        savedResult?.exam &&
        Array.isArray(savedResult.questions) &&
        savedResult.questions.length > 0
      ) {
        return savedResult;
      }
    } catch (error) {
      console.error("Unable to load examination results:", error);
    }

    return null;
  });

  if (!result || !result.questions?.length) {
    return (
      <main className="min-h-full p-5 sm:p-8 flex items-center justify-center">
        <div className="text-center">
          <Trophy
            size={42}
            className="mx-auto mb-4 text-purple-500"
            aria-hidden="true"
          />

          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
            No examination results found.
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Complete an examination to view your results.
          </p>

          <button
            type="button"
            onClick={() => navigate("/my-exams")}
            className="mt-5 bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
          >
            Browse Exams
          </button>
        </div>
      </main>
    );
  }

  const { exam, answers = {}, questions } = result;

  // Calculate the score using the submitted answers.
  const totalQuestions = questions.length;

  const score = questions.reduce((total, question, index) => {
    return total + (answers?.[index] === question.answer ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / totalQuestions) * 100);
  const incorrect = totalQuestions - score;
  const passed = percentage >= 50;

  return (
    <main className="w-full max-w-5xl mx-auto p-4 sm:p-5 md:p-8">
      {/* Heading */}
      <header className="text-center mb-7 sm:mb-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy
            size={34}
            className="text-purple-600 dark:text-purple-400"
            aria-hidden="true"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white break-words">
          {exam?.title || "Examination Completed!"}
        </h1>

        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
          Here is your examination performance.
        </p>
      </header>

      {/* Score Card */}
      <section
        aria-label="Examination score"
        className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 sm:p-8 shadow-sm mb-6 text-center"
      >
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          YOUR TOTAL SCORE
        </p>

        <p className="text-4xl sm:text-5xl font-bold text-purple-600 dark:text-purple-400 my-4">
          {score}/{totalQuestions}
        </p>

        <p className="text-2xl font-bold text-slate-800 dark:text-white">
          {percentage}%
        </p>

        <span
          className={`inline-block mt-4 px-5 py-2 rounded-full text-sm font-semibold ${
            passed
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {passed ? "Passed" : "Needs Improvement"}
        </span>
      </section>

      {/* Statistics */}
      <section
        aria-label="Score breakdown"
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mb-7 sm:mb-8"
      >
        {/* Correct Answers */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 sm:p-6">
          <CheckCircle2
            className="text-green-500 mb-3"
            size={25}
            aria-hidden="true"
          />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Correct Answers
          </p>

          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-2">
            {score}
          </p>
        </div>

        {/* Incorrect Answers */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 sm:p-6">
          <XCircle
            className="text-red-500 mb-3"
            size={25}
            aria-hidden="true"
          />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Incorrect Answers
          </p>

          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-2">
            {incorrect}
          </p>
        </div>

        {/* Percentage */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 sm:p-6">
          <Trophy
            className="text-purple-500 mb-3"
            size={25}
            aria-hidden="true"
          />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Percentage
          </p>

          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-2">
            {percentage}%
          </p>

          <div
            className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-4"
            role="progressbar"
            aria-label="Examination score percentage"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                passed ? "bg-green-500" : "bg-red-500"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
            {percentage >= 80
              ? "Excellent work! You have demonstrated great knowledge."
              : percentage >= 50
              ? "Good effort! Keep practising to improve your score."
              : "Keep learning and practising. You can do better next time!"}
          </p>
        </div>
      </section>

      {/* Answer Review */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 sm:p-6 mb-7 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-5 sm:mb-6">
          Answer Review
        </h2>

        <div className="space-y-5 sm:space-y-6">
          {questions.map((question, index) => {
            const userAnswer = answers?.[index];
            const isCorrect = userAnswer === question.answer;

            return (
              <article
                key={question.id ?? index}
                className="border-b border-slate-100 dark:border-slate-800 pb-5 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2
                      className="text-green-500 mt-1 shrink-0"
                      size={20}
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircle
                      className="text-red-500 mt-1 shrink-0"
                      size={20}
                      aria-hidden="true"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-100 break-words">
                      {index + 1}. {question.question}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 break-words">
                      Your answer:{" "}
                      <span
                        className={
                          isCorrect
                            ? "text-green-600 dark:text-green-400 font-semibold"
                            : "text-red-600 dark:text-red-400 font-semibold"
                        }
                      >
                        {userAnswer || "Not answered"}
                      </span>
                    </p>

                    {!isCorrect && (
                      <p className="text-sm text-green-600 dark:text-green-400 mt-2 break-words">
                        Correct answer: {question.answer}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => navigate("/my-exams")}
          className="flex-1 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-3 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Exams
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/exam-instructions", {
              state: { exam },
            })
          }
          className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
        >
          <RotateCcw size={18} aria-hidden="true" />
          Retake Exam
        </button>
      </div>
    </main>
  );
}

export default Results;
