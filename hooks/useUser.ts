import { usePrivy } from "@privy-io/react-auth";
import useConnectedWallet from "./useConnectedWallet";
import { useFrameProvider } from "@/providers/FrameProvider";
import { useAccount, useConnect } from "wagmi";
import { config } from "@/providers/WagmiProvider";

const useUser = () => {
  const { user, login } = usePrivy();
  const { connectedWallet } = useConnectedWallet();
  const { context } = useFrameProvider();
  const { isConnected } = useAccount();
  const { connect } = useConnect();

  const isPrepared = () => {
    if (context) {
      if (!isConnected) {
        connect({ connector: config.connectors[0] });
        return false;
      }
      return true;
    }
    if (!connectedWallet) {
      login();
      return false;
    }
    return true;
  };

  return {
    email: user?.email?.address,
    isPrepared,
  };
};

export default useUser;
