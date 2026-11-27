
import { Clock, FileQuestion, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ExamCard({ title, subject, duration, questions, difficulty, color }) {
  const navigate = useNavigate();

  const handleStartExam = () => {
    const exam = {
      title,
      subject,
      duration,
      questions: Number(questions),
      difficulty,
    };

    navigate("/exam-instructions", {
      state: { exam },
    });
  };

  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${color}`}
          aria-hidden="true"
        >
          <FileQuestion size={22} />
        </div>

        <span className="max-w-[60%] break-words rounded-full bg-slate-100 px-3 py-1.5 text-center text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {difficulty}
        </span>
      </div>

      <p className="mb-2 break-words text-xs font-semibold text-purple-600 dark:text-purple-400">
        {subject}
      </p>

      <h3 className="mb-4 break-words text-base font-bold leading-snug text-slate-800 dark:text-white sm:text-lg">
        {title}
      </h3>

      <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400 sm:mb-6 sm:text-sm">
        <span className="flex items-center gap-1.5">
          <Clock size={16} aria-hidden="true" />
          {duration}
        </span>

        <span className="flex items-center gap-1.5">
          <FileQuestion size={16} aria-hidden="true" />
          {questions} Questions
        </span>
      </div>

      <button
        type="button"
        onClick={handleStartExam}
        className="mt-auto flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
      >
        Start Exam
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </article>
  );
}

export default ExamCard;
