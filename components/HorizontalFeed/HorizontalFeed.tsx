"use client";

import { FC, useState } from "react";
import { LatestFeed } from "@/lib/viem/getUris";
import Feed from "./Feed";
import Slider from "../Slider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper } from "swiper/types";

interface HorizontalFeedProps {
  feeds: LatestFeed[];
  shouldCollect?: boolean;
}

const HorizontalFeed: FC<HorizontalFeedProps> = ({
  feeds,
  shouldCollect = false,
}) => {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [swiper, setSwiper] = useState<Swiper | null>(null);

  return (
    <div className="relative">
      <button className="absolute bottom-1/3 z-[2] rounded-full bg-black text-white p-1">
        <ArrowLeft className="size-6" onClick={() => swiper?.slidePrev()} />
      </button>
      <button className="absolute bottom-1/3 right-0 z-[2] rounded-full bg-black text-white p-1">
        <ArrowRight className="size-6" onClick={() => swiper?.slideNext()} />
      </button>
      <Slider
        sliderProps={{
          slidesPerView: "auto",
          grabCursor: true,
          mousewheel: {
            sensitivity: 1,
          },
          onSwiper(swiper) {
            setSwiper(swiper);
          },
        }}
        className="w-full max-w-4xl mx-auto !overflow-visible my-4"
        slideClassName="!w-fit !m-0"
      >
        {feeds.map((feed: LatestFeed, i) => (
          <Feed
            key={i}
            feed={feed}
            onHover={() => setHoveredEvent(i)}
            onLeave={() => setHoveredEvent(null)}
            hovered={hoveredEvent === i}
            shouldCollect={shouldCollect}
            step={
              (new Date(feeds[i === 0 ? 0 : i - 1].release_date).getTime() -
                new Date(feed.release_date).getTime()) /
              1000 /
              60 /
              60 /
              24
            }
          />
        ))}
      </Slider>
    </div>
  );
};

export default HorizontalFeed;
