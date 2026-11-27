
import {
  Clock,
  FileQuestion,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

function ExamInstructions() {
  const navigate = useNavigate();
  const location = useLocation();

  const exam = location.state?.exam;

  if (!exam) {
    return (
      <main className="p-4 sm:p-5 md:p-8 text-center">
        <div className="max-w-lg mx-auto py-10">
          <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
            <FileQuestion
              size={27}
              className="text-purple-600 dark:text-purple-400"
              aria-hidden="true"
            />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-3">
            No Exam Selected
          </h1>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mb-5">
            Please select an exam before viewing its instructions.
          </p>

          <button
            type="button"
            onClick={() => navigate("/my-exams")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            Browse Exams
          </button>
        </div>
      </main>
    );
  }

  const instructions = [
    `The examination contains ${exam.questions} multiple-choice questions.`,
    "Each question carries one mark.",
    "There is no negative marking.",
    `The examination duration is ${exam.duration}.`,
    "You can navigate between questions.",
    "Once submitted, your answers cannot be changed.",
    "Your result will be displayed after submission.",
  ];

  const examDetails = [
    {
      label: "Duration",
      value: exam.duration,
      icon: Clock,
    },
    {
      label: "Questions",
      value: `${exam.questions} Questions`,
      icon: FileQuestion,
    },
    {
      label: "Total Marks",
      value: `${exam.questions} Marks`,
      icon: CheckCircle2,
    },
  ];

  return (
    <main className="w-full max-w-4xl mx-auto p-4 sm:p-5 md:p-8">
      {/* Heading */}
      <header className="mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-semibold tracking-wide mb-2">
          EXAMINATION GUIDELINES
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
          Before You Begin
        </h1>

        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
          Please read the instructions carefully before starting your exam.
        </p>
      </header>

      {/* Exam Details */}
      <section
        aria-labelledby="exam-details-heading"
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 sm:p-6 mb-5 sm:mb-6"
      >
        <div className="mb-5">
          <h2
            id="exam-details-heading"
            className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white break-words"
          >
            {exam.title}
          </h2>

          <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 mt-2">
            {exam.subject} · {exam.difficulty}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
          {examDetails.map((detail) => {
            const Icon = detail.icon;

            return (
              <div
                key={detail.label}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 min-w-0"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center shrink-0">
                  <Icon
                    className="text-purple-600 dark:text-purple-400"
                    size={21}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {detail.label}
                  </p>

                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 break-words">
                    {detail.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Instructions */}
      <section
        aria-labelledby="instructions-heading"
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 sm:p-6 mb-5 sm:mb-6"
      >
        <h2
          id="instructions-heading"
          className="text-lg font-bold text-slate-800 dark:text-white mb-5"
        >
          General Instructions
        </h2>

        <ol className="space-y-4 sm:space-y-5">
          {instructions.map((instruction, index) => (
            <li key={instruction} className="flex gap-3 items-start">
              <span className="w-7 h-7 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold flex items-center justify-center shrink-0">
                {index + 1}
              </span>

              <p className="text-sm text-slate-600 dark:text-slate-300 pt-1 leading-relaxed">
                {instruction}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Warning */}
      <div
        role="note"
        className="bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 rounded-xl p-4 mb-5 sm:mb-6 flex gap-3 items-start"
      >
        <AlertCircle
          className="text-orange-500 shrink-0 mt-0.5"
          size={21}
          aria-hidden="true"
        />

        <p className="text-sm text-orange-800 dark:text-orange-300 leading-relaxed">
          Make sure you have enough time before starting the examination.
          The timer begins when you start the exam.
        </p>
      </div>

      {/* Start Button */}
      <button
        type="button"
        onClick={() =>
          navigate("/take-exam", {
            state: { exam },
          })
        }
        className="w-full min-h-12 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white py-3.5 px-4 rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
      >
        Start Examination

        <ArrowRight size={19} aria-hidden="true" />
      </button>
    </main>
  );
}

export default ExamInstructions;
