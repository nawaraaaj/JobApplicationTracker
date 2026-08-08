import { ArrowRight, ArrowDown, Filter } from "lucide-react";
import type { StageCount } from "../../types/dashboard.types";
import { COLUMNS, STATUS_TO_COLUMN, type Column } from "../../lib/Kanban";

interface PipelineFunnelProps {
    stageCounts: StageCount[];
}

const COLUMN_STYLE: Record<Column, { border: string; bg: string; header: string; headerBg: string; text: string }> = {
    Applied: { border: "border-[#75777c]", bg: "bg-[#fcf9f9]", header: "text-[#44474c]", headerBg: "bg-[#f6f3f4]", text: "text-[#1b1b1c]" },
    Screening: { border: "border-[#9c876f]/60", bg: "bg-[#9c876f]/5", header: "text-[#734a19]", headerBg: "bg-[#9c876f]/10", text: "text-[#1b1b1c]" },
    Interviewing: { border: "border-[#835500]", bg: "bg-[#835500]/5", header: "text-[#835500]", headerBg: "bg-[#835500]/10", text: "text-[#835500]" },
    Offer: { border: "border-[#050e1a]/60", bg: "bg-[#050e1a]/5", header: "text-[#050e1a]", headerBg: "bg-[#050e1a]/8", text: "text-[#1b1b1c]" },
    Closed: { border: "border-[#ba1a1a]/30", bg: "bg-[#ba1a1a]/[0.03]", header: "text-[#ba1a1a]/70", headerBg: "bg-[#ba1a1a]/5", text: "text-[#1b1b1c]" },
};

export function PipelineFunnel({ stageCounts }: PipelineFunnelProps) {
    const columnTotals = COLUMNS.reduce((acc, col) => {
        acc[col] = 0;
        return acc;
    }, {} as Record<Column, number>);

    for (const { status, count } of stageCounts) {
        const column = STATUS_TO_COLUMN[status];
        columnTotals[column] += count;
    }

    return (
        <section>
            <div className="flex items-center gap-2 mb-3 border-b border-[#c5c6cc] pb-1">
                <Filter size={16} className="text-[#44474c]" strokeWidth={1.5} />
                <h3 className="mono text-[13px] font-semibold text-[#1b1b1c] uppercase tracking-wide">
                    Pipeline Diagnostics
                </h3>
            </div>
            <div className="border border-[#c5c6cc] bg-[#fcf9f9] p-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:justify-between gap-2">
                    {COLUMNS.map((col, i) => {
                        const style = COLUMN_STYLE[col];
                        return (
                            <div key={col} className="flex flex-col sm:flex-row items-stretch flex-1 gap-2">
                                <div className={`flex-1 border ${style.border} ${style.bg} flex sm:flex-col`}>
                                    <div
                                        className={`border-r sm:border-r-0 sm:border-b ${style.border} px-3 py-2.5 sm:px-1.5 sm:py-1 mono text-[11px] sm:text-[10px] tracking-[0.06em] uppercase ${style.header} ${style.headerBg} flex items-center justify-center sm:justify-center w-28 sm:w-auto shrink-0`}
                                    >
                                        {col}
                                    </div>
                                    <div className="py-2.5 sm:py-3 px-3 sm:px-0 flex items-center justify-center flex-1">
                                        <span className={`mono text-[18px] sm:text-[20px] font-medium ${style.text}`}>
                                            {String(columnTotals[col]).padStart(2, "0")}
                                        </span>
                                    </div>
                                </div>
                                {i < COLUMNS.length - 1 && (
                                    <div className="flex items-center justify-center text-[#c5c6cc] shrink-0 py-0.5 sm:py-0">
                                        <ArrowDown size={14} strokeWidth={1.5} className="sm:hidden" />
                                        <ArrowRight size={16} strokeWidth={1.5} className="hidden sm:block" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}