import { Bell, ChartColumn, History, ListChecks } from "lucide-react";

const features = [
  {
    number: "01",
    label: "TRACK",
    title: "Application Tracking",
    description:
      "Log every application, attach tailored resumes, save job descriptions, and maintain a centralized repository of opportunities.",
    icon: ListChecks,
    featured: false,
  },
  {
    number: "02",
    label: "HISTORY",
    title: "Status History",
    description:
      "Maintain an immutable timeline of every status update, interview, rejection, offer, and note throughout the hiring process.",
    icon: History,
    featured: true,
  },
  {
    number: "03",
    label: "ANALYTICS",
    title: "Funnel Analytics",
    description:
      "Visualize your application funnel, conversion rates, response percentages, and interview performance with insightful dashboards.",
    icon: ChartColumn,
    featured: false,
  },
  {
    number: "04",
    label: "ALERTS",
    title: "Reminders",
    description:
      "Schedule follow-ups, interview reminders, and important deadlines so every opportunity stays active.",
    icon: Bell,
    featured: false,
  },
];

export default function FeaturesSection() {
  return (
    <section className="pb-28">
      {/* Divider */}

      <div className="relative mb-20 flex h-12 items-center justify-center border-t">
        <span className="bg-background px-5 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          // System Modules
        </span>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-8 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.title}
              className={`relative mt-6 border transition-all duration-200 ${
                feature.featured
                  ? "border-primary bg-primary text-primary-foreground shadow-[5px_5px_0px_theme(colors.primary)]"
                  : "border-border bg-background hover:-translate-y-1 hover:shadow-[3px_3px_0px_theme(colors.foreground)]"
              }`}
            >
              {/* Top Label */}

              <div
                className={`absolute -top-6 left-0 flex h-7 items-center gap-2 border px-3 font-mono text-[11px] font-semibold uppercase tracking-widest ${
                  feature.featured
                    ? "border-primary bg-primary text-secondary"
                    : "border-border bg-background"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />

                <span>
                  {feature.number} / {feature.label}
                </span>
              </div>

              {feature.featured && (
                <span className="absolute right-4 top-4 border border-secondary/50 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-secondary">
                  Priority
                </span>
              )}

              <div className="space-y-3 px-6 pb-7 pt-10">
                <h3
                  className={`font-mono text-xl font-semibold ${
                    feature.featured
                      ? "text-primary-foreground"
                      : "text-foreground"
                  }`}
                >
                  {feature.title}
                </h3>

                <p
                  className={`text-sm leading-7 ${
                    feature.featured
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
