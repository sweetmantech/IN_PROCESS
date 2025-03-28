import { CHAIN_ID } from "../consts";
import { DuneDecodedEvent } from "@/types/dune";
import mintCommentEventTopics from "./mintCommentEventTopics";
import getSmartWallet from "../getSmartWallet";

const getSmartWalletMintCommentEvents = async (
  tokenContract: string,
  tokenId: string,
): Promise<DuneDecodedEvent[]> => {
  const smartWallet = await getSmartWallet();
  if (!smartWallet) return [];
  const options = {
    method: "GET",
    headers: { "X-Dune-Api-Key": process.env.DUNE_API_KEY as string },
  };
  const params: any = {
    decode: "true",
    chain_ids: `${CHAIN_ID}`,
    topic0: mintCommentEventTopics({
      tokenContract,
      tokenId,
    }),
  };

  const urlSearchParams = new URLSearchParams(params);

  const response = await fetch(
    `https://api.dune.com/api/echo/v1/transactions/evm/${smartWallet.address}?${urlSearchParams}`,
    options,
  );
  if (!response.ok) throw Error("failed to call Dune API.");

  const data = await response.json();
  const transactions: DuneDecodedEvent[] = data.transactions;
  return transactions;
};

export default getSmartWalletMintCommentEvents;
