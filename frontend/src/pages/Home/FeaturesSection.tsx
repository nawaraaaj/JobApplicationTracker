import { Bell, FolderClosed, History, TrendingUp } from "lucide-react";

const features = [
  {
    number: "01",
    label: "TRACK",
    title: "Application Tracking",
    description:
      "Log initial outreach, store resumes per role, and maintain a centralized repository of active opportunities.",
    icon: FolderClosed,
    featured: false,
  },
  {
    number: "02",
    label: "HISTORY",
    title: "Status History",
    description:
      "An immutable timeline of stage changes, interview notes, and automated status transition stamping.",
    icon: History,
    featured: true,
  },
  {
    number: "03",
    label: "ANALYTICS",
    title: "Funnel Analytics",
    description:
      "Visualize conversion rates across technical screens, on-sites, and final offers using precise data plotting.",
    icon: TrendingUp,
    featured: false,
  },
  {
    number: "04",
    label: "ALERTS",
    title: "Reminders",
    description:
      "Automated follow-up scheduling. Never let a communication thread go cold during critical negotiation phases.",
    icon: Bell,
    featured: false,
  },
];

export default function FeaturesSection() {
  return (
    <section className="max-w-[1440px] mx-auto px-8 py-10 lg:pb-[120px]">
      {/* Divider */}
      <div className="relative mb-20 flex h-12 items-center justify-center border-t border-[#c5c6cc]">
        <span className="bg-[#f6f3f4] px-5 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-[#44474c]">
          // System Modules
        </span>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.title}
              className={`relative mt-6 px-6 pb-6 pt-6 transition-[transform,box-shadow,background-color] duration-200 ease-out ${
                feature.featured
                  ? "z-20 border-2 border-[#050e1a] bg-[#050e1a] text-white shadow-[4px_4px_0px_0px_#050e1a]"
                  : "group border border-[#75777c] bg-[#fcf9f9] shadow-[2px_2px_0px_0px_#050e1a] hover:-translate-x-px hover:-translate-y-px hover:bg-white hover:shadow-[3px_3px_0px_0px_#050e1a]"
              }`}
            >
              {/* Top Tab */}
              <div
                className={`absolute -top-[25px] left-[-1px] z-10 flex h-[26px] items-center gap-2 border px-3 font-mono text-[11px] font-semibold uppercase tracking-widest transition-colors ${
                  feature.featured
                    ? "left-[-2px] border-2 border-[#050e1a] border-b-[#050e1a] bg-[#050e1a] text-[#fdba5b]"
                    : "border-[#75777c] border-b-[#fcf9f9] bg-[#fcf9f9] text-[#050e1a] group-hover:border-b-white group-hover:bg-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>
                  {feature.number} / {feature.label}
                </span>
              </div>

              {feature.featured && (
                <span className="absolute right-4 top-4 border border-[#835500]/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#835500]">
                  Priority
                </span>
              )}

              <h3
                className={`mt-2 mb-2 font-mono text-lg font-semibold ${
                  feature.featured ? "text-white" : "text-[#1b1b1c]"
                }`}
              >
                {feature.title}
              </h3>

              <p
                className={`text-sm leading-relaxed ${
                  feature.featured ? "text-white/70" : "text-[#44474c]"
                }`}
              >
                {feature.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
