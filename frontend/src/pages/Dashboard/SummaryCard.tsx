import type { LucideIcon } from "lucide-react";

type Tone = "navy" | "amber" | "tan" | "neutral";

const TONE_STYLES: Record<Tone, { chipBg: string; chipText: string; border: string }> = {
    navy: { chipBg: "bg-[#050e1a]/8", chipText: "text-[#050e1a]", border: "border-[#050e1a]/20" },
    amber: { chipBg: "bg-[#835500]/10", chipText: "text-[#835500]", border: "border-[#835500]/35" },
    tan: { chipBg: "bg-[#9c876f]/15", chipText: "text-[#734a19]", border: "border-[#9c876f]/35" },
    neutral: { chipBg: "bg-[#44474c]/8", chipText: "text-[#44474c]", border: "border-[#c5c6cc]" },
};

interface SummaryCardProps {
    icon: LucideIcon;
    index: string;
    value: string | number;
    caption: string;
    tone?: Tone;
}

export function SummaryCard({ icon: Icon, index, value, caption, tone = "neutral" }: SummaryCardProps) {
    const { chipBg, chipText, border } = TONE_STYLES[tone];

    return (
        <div className={`border ${border} bg-[#fcf9f9] p-4 shadow-[2px_2px_0px_0px_#e4e2e3]`}>
            <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 flex items-center justify-center ${chipBg}`}>
                    <Icon size={18} className={chipText} strokeWidth={1.5} />
                </div>
                <span className="mono text-[11px] text-[#75777c] tracking-[0.08em]">{index}</span>
            </div>
            <div className="mono text-[26px] font-semibold text-[#1b1b1c] leading-none mb-1.5">{value}</div>
            <div className="mono text-[11px] text-[#44474c] uppercase tracking-wider">{caption}</div>
        </div>
    );
}

