import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Address } from "viem";

interface Profile {
  username: string;
  bio: string;
}
async function fetchArtistProfile(artistAddress: Address): Promise<Profile> {
  const response = await fetch(`/api/profile?walletAddress=${artistAddress}`);
  const data = await response.json();
  return data;
}

export function useArtistProfile() {
  const { artistAddress } = useParams();
  return useQuery({
    queryKey: ["artist_profile", artistAddress],
    queryFn: () => fetchArtistProfile(artistAddress as Address),
    staleTime: 1000 * 60 * 5,
    enabled: !!artistAddress,
    refetchOnMount: true,
  });
}
