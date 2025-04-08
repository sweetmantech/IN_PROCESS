import { Address } from "viem";

export interface TokenMetadata {
  name?: string;
  description?: string;
  image?: string;
  content?: {
    mime: string;
    uri: string;
  };
  canvas_url?: string;
}

export interface TokenInfo {
  token: {
    tokenId: string;
    tokenURI: string;
    contract: {
      address: Address;
    };
  };
}

export interface Metadata {
  image: string;
  name: string;
  description: string;
  external_url?: string;
  content: {
    mime: string;
    uri: string;
  };
  animation_url?: string;
}

export interface Collection {
  contractURI: string;
  creator: Address;
  defaultAdmin: Address;
  defaultRoyaltyConfiguration: [string, string, string];
  name: string;
  newContract: Address;
  released_at: number;
  chain: string;
  chainId: number;
}

export interface Token {
  collectionAddress: Address;
  creator: Address;
  released_at: number;
  chainId: number;
  chain: string;
  tokenId: number;
  uri: string;
}

export interface MintCommentEvent {
  blockNumber: number;
  chain: string;
  chainId: number;
  comment: string;
  quantity: string;
  sender: Address;
  timestamp: number;
  tokenId: string;
  transactionHash: string;
  tokenContract?: string;
  collection?: Address;
}
