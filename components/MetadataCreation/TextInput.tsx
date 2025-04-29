import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { ChangeEvent, useState } from "react";

type ScrollPosition = "top" | "mid" | "bottom" | null;

const TextInput = () => {
  const { writingRef, fileUploading, write, writingText, creating } =
    useZoraCreateProvider();
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>(null);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const { scrollTop, scrollHeight, clientHeight } =
      e.target as HTMLTextAreaElement;
    const position: ScrollPosition =
      scrollTop === 0
        ? "top"
        : scrollHeight - scrollTop - clientHeight <= 5
          ? "bottom"
          : "mid";
    setScrollPosition(position);
  };

  return (
    <div className="overflow-hidden size-full !font-spectral shadow-lg bg-white disabled:cursor-not-allowed relative">
      <textarea
        className="relative z-[2] size-full !outline-none p-2 md:p-4 bg-grey-moss-100"
        value={writingText}
        disabled={Boolean(fileUploading || creating)}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          write(e.target.value);
        }}
        onScroll={handleScroll}
      />
      {scrollPosition && (
        <>
          {scrollPosition !== "top" && (
            <div className="pointer-events-none absolute z-[3] left-0 top-0 bg-gradientTopBottom w-full h-24" />
          )}
          {scrollPosition !== "bottom" && (
            <div className="pointer-events-none absolute z-[3] left-0 bottom-0 bg-gradientBottomTop w-full h-24" />
          )}
        </>
      )}
      <div
        className="z-[1] p-2 md:p-4 absolute min-h-full left-0 top-0 bg-grey-moss-100 border border-grey-moss-100 flex items-center"
        ref={writingRef}
      >
        <div
          className="w-full"
          dangerouslySetInnerHTML={{
            __html: writingText.replaceAll("\n", "<br/>"),
          }}
        />
      </div>
    </div>
  );
};

export default TextInput;
