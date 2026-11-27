
import { useNavigate } from "react-router-dom";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5 py-12">
      <div className="max-w-md w-full text-center">

        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
          <AlertCircle
            size={40}
            className="text-purple-600 dark:text-purple-400"
          />
        </div>

        <p className="text-sm font-bold tracking-widest text-purple-600 dark:text-purple-400 mb-3">
          ERROR 404
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
          Page Not Found
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          Sorry, the page you're looking for doesn't exist
          or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
          >
            <Home size={18} />
            Back to Dashboard
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>
      </div>
    </div>
  );
}

export default NotFound;
