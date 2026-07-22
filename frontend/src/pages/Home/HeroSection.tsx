import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-16 lg:py-8">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-5">
          <div className="space-y-5">
            <h1 className="font-mono text-5xl font-semibold leading-tight tracking-tight text-[#050e1a] lg:text-6xl">
              Track every
              <br />
              application.
              <br />
              <span className="text-[#44474c]">Stop losing the thread.</span>
            </h1>

            <div className="border-l-2 border-[#c5c6cc] pl-5">
              <p className="max-w-lg text-lg leading-8 text-[#44474c]">
                Organize every job application in one place. Record status
                changes, interview notes, follow-up reminders, resumes, and
                important documents so you always know where every opportunity
                stands.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button className="rounded-none border border-[#050e1a] bg-[#fdba5b] px-6 py-6 font-mono uppercase tracking-widest text-[#734a00] shadow-[2px_2px_0px_0px_#050e1a] transition-[transform,box-shadow] duration-200 hover:-translate-x-px hover:-translate-y-px hover:bg-[#fdba5b] hover:shadow-[3px_3px_0px_0px_#050e1a]">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="rounded-none border border-[#050e1a] bg-[#fcf9f9] px-6 py-6 font-mono uppercase tracking-widest text-[#050e1a] hover:bg-[#f0edee]"
            >
              View Demo
            </Button>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div className="absolute inset-0 hidden translate-x-5 translate-y-5 border border-[#c5c6cc] bg-[#f0edee] lg:block" />

          <div className="relative border border-[#75777c] bg-[#fcf9f9] p-2 shadow-[4px_4px_0px_0px_#050e1a]">
            <img
              src="https://picsum.photos/id/60/1200/900"
              alt="Organized desk with documents and notebook"
              className="aspect-[4/3] w-full border border-[#c5c6cc] object-cover grayscale-[15%] contrast-125"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
