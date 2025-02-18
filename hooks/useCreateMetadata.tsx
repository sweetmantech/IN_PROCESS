import { uploadJson } from "@/lib/arweave/uploadJson";
import { useState } from "react";

const useCreateMetadata = () => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [isTimedSale, setIsTimedSale] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string>("");
  const [mimeType, setMimeType] = useState<string>("");
  const [animationUri, setAnimationUri] = useState<string>("");

  const getUri = async () =>
    await uploadJson({
      name,
      description: "",
      image: imageUri,
      animation_url: animationUri,
      content: {
        mime: mimeType,
        uri: animationUri,
      },
    });

  return {
    animationUri,
    setAnimationUri,
    getUri,
    imageUri,
    setImageUri,
    mimeType,
    setMimeType,
    name,
    isTimedSale,
    setName,
    setIsTimedSale,
  };
};

export default useCreateMetadata;
