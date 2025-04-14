import { SaleConfig } from "@/hooks/useTokenSaleConfig";
import { TokenInfo } from "@/types/token";
import {
  erc20MinterABI,
  zoraCreator1155ImplABI,
} from "@zoralabs/protocol-deployments";
import { Address, encodeAbiParameters, parseAbiParameters } from "viem";
import { CHAIN, CHAIN_ID, USDC_ADDRESS } from "./consts";
import { MintType } from "@/types/zora";
import {
  erc20MinterAddresses,
  zoraCreatorFixedPriceSaleStrategyAddress,
} from "./protocolSdk/constants";

const getCollectRequest = (
  token: TokenInfo,
  sale: SaleConfig | undefined,
  account: Address,
  comment: string,
) => {
  if (!sale) return null;

  const minterArguments = encodeAbiParameters(
    parseAbiParameters("address, string"),
    [account as Address, comment],
  );

  if (sale.type === MintType.ZoraErc20Mint)
    return {
      address: erc20MinterAddresses[CHAIN_ID],
      account: account,
      abi: erc20MinterABI,
      functionName: "mint",
      args: [
        account,
        1,
        token.token.contract.address,
        token.token.tokenId,
        sale.pricePerToken,
        USDC_ADDRESS,
        account,
        comment,
      ],
      chain: CHAIN,
    };
  return {
    address: token.token.contract.address,
    account: account as Address,
    abi: zoraCreator1155ImplABI as any,
    functionName: "mint",
    args: [
      zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID],
      BigInt(token.token.tokenId),
      BigInt(1),
      [],
      minterArguments,
    ],
    chain: CHAIN,
  };
};

export default getCollectRequest;
