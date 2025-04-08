import { Token } from "@/types/token";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

async function fetchArtistFeeds(
  artistAddress: string | string[] | undefined,
): Promise<Token[]> {
  const response = await fetch(
    `/api/dune/artist?artistAddress=${artistAddress || ""}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch artist feeds");
  }
  const data = await response.json();
  return data;
}

export function useArtistFeeds() {
  const { artistAddress } = useParams();
  return useQuery({
    queryKey: ["artistFeeds", artistAddress],
    queryFn: () => fetchArtistFeeds(artistAddress),
    refetchInterval: 4000,
    refetchOnMount: true,
  });
}
