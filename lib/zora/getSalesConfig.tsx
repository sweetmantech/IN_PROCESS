import {
  Erc20ParamsType,
  FixedPriceParamsType,
  TimedSaleParamsType,
} from "@/lib/protocolSdk";
import { maxUint64, parseEther, parseUnits } from "viem";
import { USDC_ADDRESS } from "../consts";
import { MintType } from "@/types/zora";

const getSalesConfig = (
  saleStrategy: string,
  price: string,
  saleStart: Date | undefined,
) => {
  const timedSaleConfig = {
    type: "timed",
    erc20Name: "CC0 Music",
    erc20Symbol: "CC0",
  } as TimedSaleParamsType;
  const erc20MintSaleConfig = {
    type: "erc20Mint",
    pricePerToken: parseUnits(price, 6),
    saleStart: saleStart
      ? BigInt(Number(saleStart.getTime() / 1000).toFixed(0))
      : BigInt(0),
    saleEnd: maxUint64,
    currency: USDC_ADDRESS,
  } as Erc20ParamsType;
  const fixedPriceSaleConfig = {
    type: "fixedPrice",
    pricePerToken: parseEther(price),
    saleStart: saleStart
      ? BigInt(Number(saleStart.getTime() / 1000).toFixed(0))
      : BigInt(0),
    saleEnd: maxUint64,
  } as FixedPriceParamsType;

  if (price === "0") return fixedPriceSaleConfig;

  switch (saleStrategy) {
    case MintType.ZoraFixedPriceMint:
      return fixedPriceSaleConfig;
    case MintType.ZoraTimedMint:
      return timedSaleConfig;
    case MintType.ZoraErc20Mint:
      return erc20MintSaleConfig;
    default:
      return erc20MintSaleConfig;
  }
};

export default getSalesConfig;
