import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-6 text-center">
      <p className="mono text-xs uppercase tracking-widest text-slate-400">Error 404</p>
      <h1 className="mono text-3xl font-bold uppercase tracking-wider text-slate-900">
        Page not found
      </h1>
      <p className="max-w-sm text-slate-600">
        There's no record matching this address in the archive.
      </p>
      <Link
        to="/dashboard"
        className="mono mt-4 border border-amber-500 px-4 py-2 text-xs uppercase tracking-widest text-amber-600 hover:bg-amber-500 hover:text-white"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}