interface PageNotBuiltProps {
  title: string;
}

export function PageNotBuilt({ title }: PageNotBuiltProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
      <p className="mono text-xs uppercase tracking-widest text-slate-400">In Progress</p>
      <h1 className="mono text-2xl font-bold uppercase tracking-wider text-slate-900">
        {title}
      </h1>
      <p className="max-w-sm text-slate-600">
        This section hasn't been built yet. Check back once it's wired up.
      </p>
    </div>
  );
}