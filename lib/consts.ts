export const COLLECTION_ADDRESS = "0xf0b2ab81056c8e2fdc40e46e32fae895f809c90d";
export const MINT_FEE_RECIPIENT = "0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38";
export const JSON_EXTENSION_REGISTRY =
  "0xabcdefed93200601e1dfe26d6644758801d732e8";
import { baseSepolia, base } from "viem/chains";

export const IS_TESTNET =
  process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? true : false;

// Wagmi
export const CHAIN = IS_TESTNET ? baseSepolia : base;
export const CHAIN_ID = CHAIN.id;
// Zora
export const REFERRAL_RECIPIENT = "0x749B7b7A6944d72266Be9500FC8C221B6A7554Ce";
// IPFS
export const ONE_MB = 1024 * 1024;
export const MAX_FILE_SIZE = 5 * ONE_MB;
