import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    FolderKanban,
    Settings,
    Plus,
    HelpCircle,
    LogOut,
    X,
    Kanban,
    UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/applications", label: "Applications", icon: FolderKanban },
    { to: "/pipeline", label: "Pipeline", icon: Kanban },
    { to: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
    userName?: string;
    isOpen: boolean;
    onClose: () => void;
    onNewEntry?: () => void;
    onLogout?: () => void;
}

export function Sidebar({
    isOpen,
    onClose,
    onNewEntry,
    onLogout,
}: SidebarProps) {
    return (
        <nav
            className={cn(
                "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-slate-950 px-4 py-4 text-slate-100 transition-transform duration-200 ease-in-out",
                isOpen ? "translate-x-0" : "-translate-x-full",
                "lg:translate-x-0",
            )}
        >
            {/* Header */}
            <div className="mb-8 flex items-center gap-3">
                <div className="min-w-0 flex-1">
                    <h2 className="mono text-lg font-bold uppercase leading-tight tracking-wider text-amber-500">
                        Application Tracker
                    </h2>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="shrink-0 p-1 text-slate-400 hover:text-amber-400 lg:hidden"
                    aria-label="Close menu"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <Button
                variant="outline"
                onClick={onNewEntry}
                className="mono mb-6 w-full justify-center gap-2 border-slate-600 bg-transparent text-xs uppercase tracking-widest text-slate-100 hover:bg-white/10 hover:text-slate-100"
            >
                <Plus className="h-4 w-4" />
                New Entry
            </Button>

            <ul className="flex flex-1 flex-col gap-2">
                {navItems.map(({ to, label, icon: Icon }) => (
                    <li key={to}>
                        <NavLink
                            to={to}
                            onClick={onClose}
                            className={({ isActive }) =>
                                cn(
                                    "group flex items-center gap-4 border-l-2 py-2 pl-2 transition-all duration-150",
                                    isActive
                                        ? "border-amber-500 text-amber-500"
                                        : "border-transparent text-slate-400 hover:text-amber-400",
                                )
                            }
                        >
                            <Icon className="h-5 w-5 shrink-0" />
                            <span className="mono text-lg font-semibold">{label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-4">
                <NavLink
                    to="/profile"
                    onClick={onClose}
                    className={({ isActive }) =>
                        cn(
                            "flex items-center gap-4 py-1 pl-2 transition-colors",
                            isActive
                                ? "text-amber-500"
                                : "text-slate-400 hover:text-amber-400",
                        )
                    }
                >
                    <UserCircle className="h-4 w-4" />
                    <span className="mono text-xs font-semibold uppercase tracking-wider">
                        Profile
                    </span>
                </NavLink>
                <NavLink
                    to="/help"
                    onClick={onClose}
                    className={({ isActive }) =>
                        cn(
                            "flex items-center gap-4 py-1 pl-2 transition-colors",
                            isActive
                                ? "text-amber-500"
                                : "text-slate-400 hover:text-amber-400",
                        )
                    }
                >
                    <HelpCircle className="h-4 w-4" />
                    <span className="mono text-xs font-semibold uppercase tracking-wider">
                        Help
                    </span>
                </NavLink>
                <button
                    type="button"
                    onClick={onLogout}
                    className="flex items-center gap-4 py-1 pl-2 text-left text-slate-400 transition-colors hover:text-amber-400"
                >
                    <LogOut className="h-4 w-4" />
                    <span className="mono text-xs font-semibold uppercase tracking-wider">
                        Logout
                    </span>
                </button>
            </div>
        </nav>
    );
}
