import { Address, privateKeyToAccount } from "viem/accounts";
import {
  Coinbase,
  createSmartWallet,
  SmartWallet,
  toSmartWallet,
} from "@coinbase/coinbase-sdk";
import { CHAIN_ID } from "./consts";
import isDeployedSmartWallet from "./isDeploySmartWallet";
import deploySmartWallet from "./deploySmartWallet";

Coinbase.configure(JSON.parse(process.env.COINBASE_CONFIGURATION as string));

async function getSmartWallet(): Promise<SmartWallet | null> {
  try {
    const owner = privateKeyToAccount(process.env.PRIVATE_KEY as Address);
    const response = await fetch(
      `https://api.wallet.coinbase.com/rpc/v3/scw/getAccountMetadata?eoaAddress=${owner.address}`,
    );
    const data = await response.json();
    const smartwallet = data?.accounts?.[0];

    if (smartwallet.baseContractAddress) {
      const wallet = toSmartWallet({
        signer: owner,
        smartWalletAddress: smartwallet.baseContractAddress,
      });
      const isDeployed = await isDeployedSmartWallet(wallet.address);
      if (!isDeployed)
        await deploySmartWallet(
          owner,
          smartwallet?.deploymentMeta?.factoryAddress,
          smartwallet?.deploymentMeta?.factoryCalldata,
        );
      return wallet;
    }
    const wallet = await createSmartWallet({
      signer: owner,
    });
    wallet.useNetwork({
      chainId: CHAIN_ID,
    });
    return wallet;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getSmartWallet;
