"use client";

import Token from "@/components/Token";
import { CHAIN_ID, COLLECTION_ADDRESS } from "@/lib/consts";
import { Address } from "viem";
import { TokenProvider } from "@/providers/TokenProvider";
import { getTokensOfContract } from "@/lib/viem/getTokensOfContract";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

const TokenPage = ({
  chainId = CHAIN_ID,
  address = COLLECTION_ADDRESS,
  tokenId,
}: {
  chainId?: number;
  address?: Address;
  tokenId: Address;
}) => {
  const { data: tokens = [], isLoading } = useQuery({
    queryKey: ["tokens", chainId, address],
    queryFn: () => getTokensOfContract(chainId, address),
  });

  const token = tokens?.find((t) => t.token.tokenId === tokenId);

  return (
    <main className="w-screen pt-12 md:pt-24 mt-10 px-2 md:px-10">
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-14 w-1/3" />
          <Skeleton className="h-14 w-1/2" />
          <Skeleton className="h-14 w-3/4" />
          <Skeleton className="h-14 w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
          {token && (
            <TokenProvider
              key={token?.token?.tokenId}
              token={token}
              tokenId={token?.token?.tokenId}
            >
              <Token />
            </TokenProvider>
          )}
        </div>
      )}
    </main>
  );
};

export default TokenPage;
