import { Link } from "react-router-dom";

interface AuthLayoutProps {
  activeTab: "login" | "register";
  heading: string;
  description: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  activeTab,
  heading,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#fcf9f9] text-[#1b1b1c] blueprint-grid flex items-center justify-center p-6 font-['IBM_Plex_Sans']">
      <style>{`
        .blueprint-grid {
          background-size: 40px 40px;
          background-image:
            linear-gradient(to right, rgba(117, 119, 124, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(117, 119, 124, 0.05) 1px, transparent 1px);
        }
        .folder-tab {
          clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 100%, 0 100%);
        }
        .stacked-shadow {
          box-shadow: 4px 4px 0px 0px rgba(5, 14, 26, 0.05);
        }
      `}</style>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center relative h-full min-h-[400px]">
          <div className="relative w-64 h-80">
            <div className="absolute inset-0 bg-[#fcf9f9] border border-[#c5c6cc] stacked-shadow rotate-[-6deg] rounded-sm" />
            <div className="absolute inset-0 bg-[#fcf9f9] border border-[#c5c6cc] stacked-shadow rotate-[-2deg] rounded-sm" />
            <div className="absolute inset-0 bg-[#fcf9f9] border border-[#75777c] stacked-shadow overflow-hidden flex flex-col rounded-sm">
              <div className="h-8 border-b border-[#c5c6cc] bg-[#f0edee] flex items-center px-2 gap-1">
                <span className="w-3 h-3 rounded-full bg-[#c5c6cc]" />
                <span className="w-3 h-3 rounded-full bg-[#c5c6cc]" />
              </div>
              <div className="p-4 flex-1 flex flex-col gap-2">
                <div className="h-4 bg-[#e4e2e3] w-3/4 rounded-sm" />
                <div className="h-4 bg-[#e4e2e3] w-full rounded-sm" />
                <div className="h-4 bg-[#e4e2e3] w-5/6 rounded-sm" />
                <div className="mt-auto h-32 bg-[#eae7e8] rounded-sm" />
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <h1 className="font-['IBM_Plex_Mono'] text-3xl font-semibold tracking-tight text-[#050e1a] mb-1">
              Application Tracker
            </h1>
            <p className="font-['IBM_Plex_Mono'] text-xs text-[#44474c] uppercase tracking-widest">
              Apply smarter. Track better.
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="w-full max-w-md mx-auto">
          <div className="flex">
            <Link
              to="/login"
              className={`folder-tab border border-b-0 px-6 py-2 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider transition-opacity ${
                activeTab === "login"
                  ? "bg-[#fcf9f9] text-[#050e1a] border-[#75777c] z-10 relative"
                  : "bg-[#e4e2e3] text-[#44474c] border-[#c5c6cc] opacity-70 hover:opacity-100 z-0"
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`folder-tab border border-b-0 px-6 py-2 -ml-4 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider transition-opacity ${
                activeTab === "register"
                  ? "bg-[#fcf9f9] text-[#050e1a] border-[#75777c] z-10 relative"
                  : "bg-[#e4e2e3] text-[#44474c] border-[#c5c6cc] opacity-70 hover:opacity-100 z-0"
              }`}
            >
              Register
            </Link>
          </div>

          <div className="bg-[#fcf9f9] border border-[#75777c] p-8 stacked-shadow relative z-20 rounded-tr-sm rounded-b-sm">
            <div className="mb-8">
              <h2 className="font-['IBM_Plex_Mono'] text-xl font-semibold text-[#050e1a] mb-1">
                {heading}
              </h2>
              <p className="text-sm text-[#44474c]">{description}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
