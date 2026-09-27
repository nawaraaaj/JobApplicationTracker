import { profile, userKeys } from "@/api/authApi";
import { useQuery } from "@tanstack/react-query";


export function useProfile() {
    return useQuery({
        queryKey: userKeys.profile(),
        queryFn: profile,
    });
}