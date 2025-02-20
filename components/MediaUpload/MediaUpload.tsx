import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import useFileUpload from "@/hooks/useFileUpload";
import { cn } from "@/lib/utils";
import Spinner from "@/components/ui/spinner";
import { getIpfsLink } from "@/lib/utils";
import { useRef, useState } from "react";
import NoFileSelected from "./NoFileSelected";
import AudioPlayer from "./AudioPlayer";
import Image from "next/image";

const MediaUpload = () => {
  const { imageUri, animationUri, mimeType } = useZoraCreateProvider();
  const { fileUpload, loading, error, blurImageUrl } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [textInputActive, setTextInputActive] = useState(false)

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const renderMedia = () => {
    if (loading) {
      return (
        <div className="absolute inset-0 flex items-center justify-center left-0 top-0">
          <Spinner />
        </div>
      );
    }

    if (mimeType.includes("audio")) {
      return <AudioPlayer onClick={handleImageClick} />;
    }

    if (mimeType.includes("video")) {
      return (
        <video controls className="w-full rounded-md">
          <source src={getIpfsLink(animationUri)} type={mimeType} />
          Your browser does not support the video element.
        </video>
      );
    }

    if (imageUri) {
      return (
        <div className="relative w-[296px] aspect-[1/1]">
          <Image
            src={blurImageUrl || getIpfsLink(imageUri)}
            alt="Image Preview"
            onClick={handleImageClick}
            blurDataURL={blurImageUrl}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      );
    }

    return <NoFileSelected onClick={handleImageClick} />;
  };

  return (
    <div className="w-[300px] aspect-[1/1] relative">
      <textarea className="size-full" onFocus={() => setTextInputActive(true)}/>
      <input
        ref={fileInputRef}
        id="media"
        type="file"
        className="hidden"
        onChange={fileUpload}
      />
      {textInputActive ? <></> : <NoFileSelected onClick={handleImageClick} />}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default MediaUpload;
