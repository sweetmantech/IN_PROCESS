import { CollectionsResponse, PageParam } from "@/types/fetch-collections";
import { Collection } from "@/types/token";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

async function fetchCollections(
  param?: PageParam,
): Promise<CollectionsResponse> {
  const response = await fetch("/api/collections", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(param || {}),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch all collections");
  }
  const data = await response.json();
  return data;
}

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isFetchingCollections, setIsFetchingCollections] =
    useState<boolean>(true);

  const { hasNextPage, fetchNextPage, data, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["collectons"],
      queryFn: ({ pageParam }) => fetchCollections(pageParam),
      getNextPageParam: (lastPage: CollectionsResponse) => {
        if (
          Boolean(
            !lastPage.nextOffsets?.factory && !lastPage.nextOffsets.smartWallet,
          )
        )
          return undefined;
        return {
          offsets: lastPage.nextOffsets,
        };
      },
      initialPageParam: undefined,
      staleTime: 1000 * 60 * 5,
      refetchInterval(query) {
        const pages = query.state.data?.pages;
        if (!pages) return Infinity;
        if (
          Boolean(
            pages[pages.length - 1]?.nextOffsets.factory ||
              pages[pages.length - 1]?.nextOffsets.smartWallet,
          )
        )
          return Infinity;
        return 1000 * 5;
      },
      refetchOnWindowFocus: false,
      retry: (failureCount) => {
        return failureCount < 4;
      },
    });

  useEffect(() => {
    if (data?.pages.length) {
      setCollections([
        ...(data?.pages?.reduce((acc: Collection[], page) => {
          return [...acc, ...page.collections];
        }, []) ?? []),
      ]);
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      if (!hasNextPage) setIsFetchingCollections(false);
    }
  }, [hasNextPage, fetchNextPage, data?.pages, isFetchingNextPage]);

  return {
    collections,
    isFetchingCollections,
  };
}
