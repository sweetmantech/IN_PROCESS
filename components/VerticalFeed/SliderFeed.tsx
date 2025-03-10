import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Collection } from "@/types/token";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

interface SliderFeedProps {
  feed: Collection;
}

const SliderFeed = ({ feed }: SliderFeedProps) => {
  const { data, isLoading } = useMetadata(feed.contractURI);

  return (
    <div className="w-full h-[250px] md:h-auto overflow-hidden relative">
      {isLoading ? (
        <Skeleton className="size-full" />
      ) : (
        <div className="gap-2 flex flex-col size-full">
          <div className="grow overflow-hidden w-full relative rounded-[0px]">
            <Image
              src={getFetchableUrl(data?.image) || "/images/placeholder.png"}
              objectFit="cover"
              objectPosition="top left"
              layout="fill"
              alt="not found"
              blurDataURL={
                getFetchableUrl(data?.image) || "/images/placeholder.png"
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 pl-2">
              <div className="rotate-[45deg] w-[9px] aspect-[1/1] bg-black" />
              <p className="font-spectral text-sm">{data?.name}</p>
            </div>
            <p className="font-archivo text-sm">
              {new Date(feed.released_at).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default SliderFeed;
