import { uploadJson } from "@/lib/arweave/uploadJson";
import { RefObject, useRef, useState } from "react";
import useFileUpload from "./useFileUpload";
import domtoimage from "dom-to-image";
import { uploadFile } from "@/lib/arweave/uploadFile";

const useCreateMetadata = () => {
  const [createModeActive, setCreateModeActive] = useState(false);
  const [link, setLink] = useState<string>("");
  const [name, setName] = useState<string>("this is time when...");
  const [priceUnit, setPriceUnit] = useState<"eth" | "usd" | "base" | "usdc">(
    "eth",
  );
  const [price, setPrice] = useState("0.01");
  const [description, setDescription] = useState<string>("");
  const [isTimedSale, setIsTimedSale] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string>("");
  const [mimeType, setMimeType] = useState<string>("");
  const [animationUri, setAnimationUri] = useState<string>("");
  const textInputRef = useRef() as RefObject<HTMLTextAreaElement>;
  const fileUpload = useFileUpload({
    setName,
    setImageUri,
    setAnimationUri,
    setMimeType,
    animationUri,
  });

  const uploadTextRefAsImage = async () => {
    if (!createModeActive || !textInputRef.current) return "";
    fileUpload.setFileUploading(true);
    const blob = await domtoimage.toBlob(textInputRef.current);
    const fileName = "image.png";
    const fileType = "image/png";
    const textImage = new File([blob], fileName, { type: fileType });
    const uri = await uploadFile(textImage);
    setImageUri(uri);
    fileUpload.setFileUploading(false);
    return uri;
  };

  const reset = () => {
    if (textInputRef.current) textInputRef.current.value = "";
    setCreateModeActive(false);
    setName("");
    setLink("");
    setDescription("");
    setImageUri("");
    setMimeType("");
    setAnimationUri("");
  };

  const getUri = async (textRefUri: string) =>
    await uploadJson({
      name,
      description,
      external_url: link,
      image: textRefUri || imageUri,
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
    reset,
    textInputRef,
    ...fileUpload,
    uploadTextRefAsImage,
    setDescription,
    description,
    link,
    setLink,
    priceUnit,
    setPriceUnit,
    price,
    setPrice,
    createModeActive,
    setCreateModeActive,
  };
};

export default useCreateMetadata;
