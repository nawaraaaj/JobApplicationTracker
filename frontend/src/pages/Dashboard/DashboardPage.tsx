import { useEffect, useState } from "react";
import { Radio, LayoutGrid, TrendingUp, Trophy, Clock, Briefcase } from "lucide-react";
import { useAuth } from "../../lib/Auth/AuthContext";
import type { DashboardSummary } from "../../types/dashboard.types";
import { getSummary } from "@/api/dashboardApi";
import { SummaryCard } from "./SummaryCard";
import { BreakdownList } from "./BreakdownList";
import { PipelineFunnel } from "./PipelineFunnel";

function DashboardPage() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadSummary() {
      setIsLoading(true);
      try {
        const data = await getSummary();
        if (!cancelled) {
          setSummary(data);
        }
      } catch (err) {
        console.error("Failed to load dashboard summary:", err);
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadSummary();

    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <span className="mono text-[13px] text-[#44474c] uppercase tracking-widest">Retrieving records...</span>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="flex items-center justify-center py-24">
        <span className="mono text-[13px] text-[#ba1a1a] uppercase tracking-widest">
          Failed to load dashboard summary.
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between mb-6 border-b border-[#c5c6cc] pb-4">
        <div>
          <p className="mono text-[11px] text-[#75777c] mb-1 tracking-[0.08em]">SYS.REC // DASHBOARD</p>
          <h1 className="mono text-[24px] sm:text-[28px] font-semibold text-[#1b1b1c]">
            Welcome back{user?.name ? `, ${user.name}` : ""}
          </h1>
        </div>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <SummaryCard icon={Briefcase} index="01" value={summary.activeCount} caption="Active in Pipeline" tone="navy" />
        <SummaryCard
          icon={TrendingUp}
          index="02"
          value={`${(summary.responseRate * 100).toFixed(1)}%`}
          caption="Response Rate"
          tone="amber"
        />
        <SummaryCard icon={Trophy} index="03" value={summary.offersCount} caption="Offers Secured" tone="tan" />
        <SummaryCard
          icon={Clock}
          index="04"
          value={summary.avgTimeToResponseDays.toFixed(1)}
          caption="Avg. Days to Response"
          tone="neutral"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <PipelineFunnel stageCounts={summary.stageCounts} />
        </div>
        <div className="flex flex-col gap-5">
          <BreakdownList
            title="Source Breakdown"
            icon={<Radio size={14} className="text-[#44474c]" strokeWidth={1.5} />}
            items={summary.sourceBreakdown.map((s) => ({ label: s.source, count: s.count }))}
            accent="amber"
          />
          <BreakdownList
            title="Work Mode"
            icon={<LayoutGrid size={14} className="text-[#44474c]" strokeWidth={1.5} />}
            items={summary.workModeBreakdown.map((w) => ({ label: w.workMode, count: w.count }))}
            accent="navy"
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;