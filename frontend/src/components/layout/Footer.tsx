import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t bg-[#0A192F] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 py-5 md:flex-row">
        {/* Left */}
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/80">
          Job Application Tracker
        </p>

        {/* Center */}
        <p className="font-mono text-[11px] uppercase tracking-wider text-white/60">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>

        {/* Right */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-white/60">
            Built by Nawaraj Neupane
          </span>

          <a
            href="https://github.com/nawaraaaj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 transition-colors hover:text-white"
            aria-label="GitHub"
          >
            <FaGithub className="h-4 w-4" />
          </a>

          <a
            href="https://www.linkedin.com/in/nawaraj-neupane-8977a32a8/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 transition-colors hover:text-white"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}