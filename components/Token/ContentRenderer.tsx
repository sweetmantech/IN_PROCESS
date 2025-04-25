import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Metadata } from "@/types/token";
import Image from "next/image";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "../Renderers/VideoPlayer";
import AudioPlayer from "../Renderers/AudioPlayer";

interface ContentRendererProps {
  metadata: Metadata;
}

const ContentRenderer = ({ metadata }: ContentRendererProps) => {
  const mimeType = metadata?.content?.mime || "";

  if (mimeType.includes("pdf"))
    return (
      <PdfViewer fileUrl={getFetchableUrl(metadata.animation_url) || ""} />
    );
  if (mimeType.includes("audio")) {
    return (
      <AudioPlayer
        thumbnailUrl={getFetchableUrl(metadata.image) || ""}
        audioUrl={getFetchableUrl(metadata.animation_url) || ""}
      />
    );
  }
  if (mimeType.includes("video"))
    return (
      <div className="size-full flex justify-center">
        <VideoPlayer url={getFetchableUrl(metadata.animation_url) || ""} />
      </div>
    );
  if (mimeType.includes("html"))
    return (
      <div className="size-full flex justify-center">
        <iframe
          src={getFetchableUrl(metadata.animation_url) || ""}
          className="w-full"
        />
      </div>
    );
  return (
    <div className="grow relative size-full">
      <Image
        src={getFetchableUrl(metadata.image) || "/images/placeholder.png"}
        alt="Token Image."
        layout="fill"
        objectFit="contain"
        objectPosition="center"
        blurDataURL={
          getFetchableUrl(metadata.image) || "/images/placeholder.png"
        }
        unoptimized
      />
    </div>
  );
};

export default ContentRenderer;
