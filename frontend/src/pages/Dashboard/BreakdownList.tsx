interface BreakdownItem {
  label: string;
  count: number;
}

type Accent = "amber" | "navy";

const ACCENT_BAR: Record<Accent, string> = {
  amber: "bg-[#835500]",
  navy: "bg-[#050e1a]",
};

const ACCENT_CHIP: Record<Accent, string> = {
  amber: "bg-[#835500]/10",
  navy: "bg-[#050e1a]/8",
};

interface BreakdownListProps {
  title: string;
  icon: React.ReactNode;
  items: BreakdownItem[];
  accent?: Accent;
}

export function BreakdownList({ title, icon, items, accent = "amber" }: BreakdownListProps) {
  const total = items.reduce((sum, item) => sum + item.count, 0) || 1;
  const barColor = ACCENT_BAR[accent];
  const chipColor = ACCENT_CHIP[accent];

  return (
    <section>
      <div className="flex items-center gap-2 mb-3 border-b border-[#c5c6cc] pb-1">
        <span className={`w-6 h-6 flex items-center justify-center ${chipColor}`}>{icon}</span>
        <h3 className="mono text-[13px] font-semibold text-[#1b1b1c] uppercase tracking-wide">
          {title}
        </h3>
      </div>
      <div className="border border-[#c5c6cc] bg-[#fcf9f9] p-4 flex flex-col gap-3">
        {items.map(({ label, count }) => {
          const pct = Math.round((count / total) * 100);
          return (
            <div key={label}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="mono text-[12px] text-[#1b1b1c]">{label}</span>
                <span className="mono text-[12px] text-[#44474c]">{count}</span>
              </div>
              <div className="h-1.5 w-full bg-[#f0edee]">
                <div className={`h-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}