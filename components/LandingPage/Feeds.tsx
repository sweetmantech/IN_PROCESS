import { useLatestFeed } from "@/hooks/useLatestFeed";
import { Skeleton } from "../ui/skeleton";
import FeedTable from "../FeedTable";
import SpiralFeeds from "../SprialFeeds";
import ArtSlider from "./ArtSlider";
import LatestFeeds from "./LatestFeeds";
import { HorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import HorizontalFeed from "../HorizontalFeed";
import useIsMobile from "@/hooks/useIsMobile";

const Feeds = () => {
  const { error, isLoading, data } = useLatestFeed();
  const isMobile = useIsMobile();

  if (error)
    return <p className="text-center text-red-500 py-4">Failed to load feed</p>;
  if (isLoading) return <Skeleton className="w-full h-20" />;
  return (
    <div className="pt-16 md:pt-20">
      <p className="font-archivo text-2xl px-4 pt-6 pb-4 block md:hidden">
        today 31 artists have <br />
        shared their moments
      </p>
      <SpiralFeeds className="relative z-[2] md:pr-20" feeds={data || []} />
      <div className="w-full space-y-4 md:grid md:grid-cols-12 pb-6 gap-10 relative z-[1]">
        <div className="w-full hidden md:block md:col-span-8">
          <FeedTable feeds={data || []} />
        </div>
        <LatestFeeds feeds={data?.slice(0, 3) || []} />
        <div className="hidden md:block col-span-4 relative">
          <div className="w-full absolute bottom-0 flex flex-col gap-6">
            <ArtSlider feeds={data || []} />
          </div>
        </div>
        {isMobile && (
          <HorizontalFeedAnimationProvider totalFeeds={data?.length || 0}>
            <HorizontalFeed feeds={data || []} />
          </HorizontalFeedAnimationProvider>
        )}
      </div>
    </div>
  );
};

export default Feeds;
