import { useState } from "react";
import { Link } from "react-router-dom";
import { FolderArchive, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#050e1a] bg-[#fcf9f9]">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setMobileOpen(false)}
        >
          <FolderArchive className="h-5 w-5 fill-current text-[#050e1a]" />
          <span className="font-mono text-xl font-bold tracking-tight text-[#050e1a] sm:text-2xl md:text-3xl">
            Application Tracker
          </span>
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          <Button
            variant="outline"
            className="rounded-none border-[#050e1a] px-6 font-mono text-xs uppercase tracking-widest text-[#050e1a]"
          >
            <Link to="/login">Log In</Link>
          </Button>

          <Button
            variant="outline"
            className="rounded-none border-[#050e1a] px-6 font-mono text-xs uppercase tracking-widest text-[#050e1a]"
          >
            <Link to="/register">Register</Link>
          </Button>
        </div>

        <button
          type="button"
          className="flex items-center justify-center border border-[#050e1a] p-2 text-[#050e1a] md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {mobileOpen && (
          <div className="absolute left-0 right-0 top-full z-50 flex flex-col gap-3 border-b border-[#050e1a] bg-[#fcf9f9] px-4 py-4 shadow-[0px_4px_0px_0px_#050e1a] md:hidden">
            <Button
              variant="outline"
              className="w-full rounded-none border-[#050e1a] font-mono text-xs uppercase tracking-widest text-[#050e1a]"
              onClick={() => setMobileOpen(false)}
            >
              <Link to="/login">Log In</Link>
            </Button>

            <Button
              variant="outline"
              className="w-full rounded-none border-[#050e1a] font-mono text-xs uppercase tracking-widest text-[#050e1a]"
              onClick={() => setMobileOpen(false)}
            >
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
