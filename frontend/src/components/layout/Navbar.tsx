import { Link } from "react-router-dom";
import { FolderArchive } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FolderArchive className="h-5 w-5 fill-current" />

          <span className="font-mono text-3xl font-bold tracking-tight">
            Application Tracker
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          <Button
            variant="outline"
            className="rounded-none border-foreground px-6 font-mono text-xs uppercase tracking-widest"
          >
            <Link to="/login">Log In</Link>
          </Button>

          <Button
            variant="outline"
            className="rounded-none border-foreground px-6 font-mono text-xs uppercase tracking-widest"
          >
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
