import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-16 lg:py-8">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        {/* Left Content */}

        <div className="space-y-8 lg:col-span-5">
          <div className="inline-flex items-center gap-2 border px-3 py-1"></div>

          {/* Heading */}

          <div className="space-y-5">
            <h1 className="font-mono text-5xl font-semibold leading-tight tracking-tight lg:text-6xl">
              Track every
              <br />
              application.
              <br />
              <span className="text-muted-foreground">
                Stop losing the thread.
              </span>
            </h1>

            <div className="border-l-2 pl-5">
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                Organize every job application in one place. Record status
                changes, interview notes, follow-up reminders, resumes, and
                important documents so you always know where every opportunity
                stands.
              </p>
            </div>
          </div>

          {/* Actions */}

          <div className="flex flex-wrap gap-4">
            <Button className="rounded-none px-6 py-6 font-mono uppercase tracking-widest">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="rounded-none px-6 py-6 font-mono uppercase tracking-widest"
            >
              View Demo
            </Button>
          </div>

        </div>

        {/* Right Image */}

        <div className="relative lg:col-span-7">
          {/* Background Layer */}

          <div className="absolute inset-0 translate-x-5 translate-y-5 border bg-muted lg:block" />

          {/* Image Card */}

          <div className="relative border bg-background p-2 shadow-[4px_4px_0px_theme(colors.foreground)]">
            {/* Figure Label */}
            {/* Replace this with your image */}

            <div className="flex aspect-[4/3] items-center justify-center border bg-muted text-muted-foreground">
              <span className="font-mono text-sm uppercase tracking-[0.3em]">
                Image Placeholder
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
