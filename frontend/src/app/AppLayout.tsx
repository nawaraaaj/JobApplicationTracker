import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAuth } from "@/lib/Auth/AuthContext";

export function AppLayout() {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        userName={user?.name}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={logout}
      />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="p-1 text-slate-700"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <span className="mono text-xs font-bold uppercase tracking-wider text-slate-900">
          Dossier Archival
        </span>
      </header>

      <div className="min-h-screen p-6 lg:ml-64">
        <Outlet />
      </div>
    </div>
  );
}