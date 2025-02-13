import { LatestFeed, NftMetadata } from "@/lib/viem/getUris";
import { useQuery } from "@tanstack/react-query";

async function fetchMetadata(feed: LatestFeed): Promise<NftMetadata> {
  const response = await fetch(`/api/ipfs/metadata?uri=${feed.uri}`);
  if (!response.ok) {
    return {
      name: "",
      image: "",
      description: "",
    };
  }
  const data = await response.json();
  return data;
}
export function useMetadata(feed: LatestFeed) {
  return useQuery({
    queryKey: ["metadata", feed],
    queryFn: () => fetchMetadata(feed),
    staleTime: 1000 * 60 * 5,
    enabled: !!feed,
    refetchOnMount: true,
  });
}
