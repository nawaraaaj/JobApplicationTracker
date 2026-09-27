import { useProfile } from "@/hooks/userProfile";
import { formatDateTime } from "@/lib/dateUtil";


export function ProfilePage() {
  const { data: user, isPending: isLoading, isError } = useProfile();

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="border border-[#050e1a]/15 px-6 py-8 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#050e1a]/50">
            Retrieving case file...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="p-6">
        <div className="border border-dashed border-[#050e1a]/20 px-6 py-10 text-center">
          <p className="font-mono text-[13px] uppercase tracking-[0.08em] text-[#050e1a]/60">
            Profile could not be loaded
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1 border-b border-[#050e1a]/15 pb-4">
        <h1 className="font-mono text-[22px] font-semibold leading-tight tracking-[0.02em] text-[#050e1a]">
          Profile
        </h1>
        <span className="font-mono text-[13px] text-[#050e1a]/60">
          Your account details
        </span>
      </div>

      <div className="max-w-md border border-[#050e1a]/15 bg-[#fcf9f9] p-5">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#050e1a]/60">
          Details
        </span>

        <div className="mt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#050e1a]/60">
              Name
            </span>
            <span className="font-mono text-[13px] font-medium text-[#050e1a]">
              {user.name}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#050e1a]/60">
              Email
            </span>
            <span className="font-mono text-[13px] font-medium text-[#050e1a]">
              {user.email}
            </span>
          </div>

          <div className="flex flex-col gap-1 border-t border-dashed border-[#050e1a]/15 pt-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#050e1a]/55">
              Member since {formatDateTime(user.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}