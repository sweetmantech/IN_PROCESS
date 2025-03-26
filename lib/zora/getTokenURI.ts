import { Address } from "viem";
import { publicClient } from "../viem/publicClient";

const abi = [
  {
    type: "function",
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "uri",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
];
const getTokenURI = async (collection: Address, tokenId: number) => {
  try {
    const uri: any = publicClient.readContract({
      address: collection,
      abi,
      functionName: "uri",
      args: [tokenId],
    });

    return uri as string;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export default getTokenURI;
