import { SETUP_NEW_CONTRACT_EVENT_SIGNATURE } from "@/lib/events";
import { CHAIN_ID } from "../consts";
import { FACTORY_ADDRESSES } from "@/lib/protocolSdk/create/factory-addresses";
import { DuneDecodedEvent } from "@/types/dune";

const getCreatedContractEvents = async (): Promise<DuneDecodedEvent[]> => {
  const options = {
    method: "GET",
    headers: { "X-Dune-Api-Key": process.env.DUNE_API_KEY as string },
  };
  const params: any = {
    decode: "true",
    chain_ids: `${CHAIN_ID}`,
    topic0: SETUP_NEW_CONTRACT_EVENT_SIGNATURE,
  };

  const urlSearchParams = new URLSearchParams(params);

  const response = await fetch(
    `https://api.dune.com/api/echo/v1/transactions/evm/${FACTORY_ADDRESSES[CHAIN_ID]}?${urlSearchParams}`,
    options,
  );
  if (!response.ok) throw Error("failed to call Dune API.");

  const data = await response.json();
  const transactions: DuneDecodedEvent[] = data.transactions;
  return transactions;
};

export default getCreatedContractEvents;
