"use client";

import { Button } from "@/components/ui/button";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { useAccount } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";

const CreateButton = () => {
  const {
    create,
    name,
    imageUri,
    animationUri,
    textInputRef,
    uploadTextRefAsImage,
    creating,
  } = useZoraCreateProvider();
  const { address } = useAccount();
  const { login } = usePrivy();

  const canCreate = Boolean(
    !creating &&
      name &&
      (imageUri || animationUri || textInputRef?.current?.value),
  );

  const handleCreate = async () => {
    try {
      if (!address) {
        login();
        return;
      }
      const uri = await uploadTextRefAsImage();
      await create(uri);
    } catch (error) {
      console.error("Error creating:", error);
    }
  };

  return (
    <Button
      onClick={handleCreate}
      disabled={!canCreate}
      className="md:!mt-6 !font-archivo bg-black hover:bg-grey-moss-300 text-tan-primary w-full px-3 py-6 md:h-[60px] !text-xl !rounded-sm transform transition-transform duration-150 disabled:opacity-1 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
    >
      {creating ? "creating..." : "create"}
    </Button>
  );
};

export default CreateButton;
