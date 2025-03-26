"use client";

import { useState } from "react";
import { useAccount, useSwitchChain, useWriteContract } from "wagmi";
import { CHAIN_ID } from "@/lib/consts";
import { useParams } from "next/navigation";
import { Address } from "viem";
import useZoraCreateParameters from "./useZoraCreateParameters";
import { getContractAddressFromReceipt } from "@/lib/protocolSdk/create/1155-create-helper";
import { publicClient } from "@/lib/viem/publicClient";
import { useMask } from "./useMask";
import useBalance from "./useBalance";

const createOnSmartWallet = async (parameters: any) => {
  const response = await fetch(`/api/smartwallet/collection/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parameters,
    }),
  });
  const data = await response.json();
  return data.transactionHash;
};

export default function useZoraCreate() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();
  const [creating, setCreating] = useState<boolean>(false);
  const params = useParams();
  const chainId = Number(params.chainId) || CHAIN_ID;
  const collection = params.collection as Address | undefined;
  const [createdContract, setCreatedContract] = useState("");
  const { fetchParameters, createMetadata } = useZoraCreateParameters(
    chainId,
    collection,
  );
  const mask = useMask();
  const { balance } = useBalance();

  const create = async (uri: string) => {
    try {
      setCreating(true);
      if (!address) {
        throw new Error("No wallet connected");
      }
      await switchChainAsync({ chainId });
      const parameters = await fetchParameters(uri);
      if (!parameters) {
        throw new Error("Parameters not ready");
      }

      let hash: Address | null = null;

      if (balance === 0) hash = await createOnSmartWallet(parameters);
      else
        hash = await writeContractAsync({
          ...parameters,
        });
      if (!hash) throw Error();
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      const contractAddress = getContractAddressFromReceipt(receipt);
      setCreating(false);
      setCreatedContract(contractAddress);
      return { contractAddress };
    } catch (err) {
      setCreating(false);
      console.error(err);
      throw err;
    }
  };

  return {
    createdContract,
    setCreatedContract,
    create,
    creating,
    ...createMetadata,
    ...mask,
  };
}
