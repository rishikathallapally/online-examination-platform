
function StatCard({ title, value, description, icon: Icon, color }) {
  return (
    <article className="min-w-0 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-5 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="break-words text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-2 break-words text-2xl font-bold text-slate-800 dark:text-white sm:mt-3 sm:text-3xl">
            {value}
          </p>

          <p className="mt-1 break-words text-xs text-slate-400 dark:text-slate-500 sm:mt-2">
            {description}
          </p>
        </div>

        {Icon && (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${color}`}
            aria-hidden="true"
          >
            <Icon size={22} />
          </div>
        )}
      </div>
    </article>
  );
}

export default StatCard;
