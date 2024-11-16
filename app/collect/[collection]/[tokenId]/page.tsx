"use client";

import FeedPage from "@/components/FeedPage";
import { ZoraChains } from "@/lib/zora/zoraToViem";
import { ZORA_TO_VIEM } from "@/lib/zora/zoraToViem";
import { Address } from "node:cluster";
import { useParams } from "next/navigation";
import * as chains from "viem/chains";

export default function TokenPage() {
  const params = useParams();
  const collection = params.collection as string;
  const [chain, address] = collection.split("%3A");
  const viemChainName = ZORA_TO_VIEM[chain as ZoraChains];
  const viemChain = chains[viemChainName];
  return <FeedPage chainId={viemChain.id} address={address as Address} />;
}
