"use client";

import { FC } from "react";
import Feed from "./Feed";
import Slider from "../Slider";
import { Token } from "@/types/token";
import { useHorizontalFeedAnimationProvider } from "@/providers/HorizontalFeedAnimationProvider";
import { useStepCalculation } from "@/hooks/useStepCalculation";
import Controls from "./Controls";

interface HorizontalFeedProps {
  feeds: Token[];
}

const HorizontalFeed: FC<HorizontalFeedProps> = ({ feeds }) => {
  const {
    getHeight,
    isHovered,
    handleMouseMove,
    setActiveIndex,
    setFeedEnded,
    setSwiper,
    containerRef,
    timelineRef,
  } = useHorizontalFeedAnimationProvider();
  const { calculateStep } = useStepCalculation();

  return (
    <div
      className="pt-[120px] pb-[20px] md:py-0 md:grow md:size-full flex items-center overflow-hidden md:overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => handleMouseMove({ clientX: null } as any)}
      ref={containerRef}
    >
      <div
        className="relative w-fit"
        ref={timelineRef}
        style={{
          maxWidth: containerRef.current?.offsetWidth,
        }}
      >
        <div className="bg-black w-full h-[0.5px] absolute left-0 bottom-[68px] md:bottom-1/2" />
        <Controls />
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
            onSlideChange(swiper) {
              setActiveIndex(swiper.activeIndex + 1);
            },
            onProgress(_, progress) {
              setFeedEnded(progress === 1);
            },
          }}
          className="w-full !overflow-visible my-4 !pl-24"
          slideClassName="!w-fit !m-0"
        >
          {feeds.map((feed: Token, i) => (
            <Feed
              key={i}
              feed={feed}
              hovered={isHovered(i)}
              step={calculateStep(i, feeds)}
              height={getHeight(i)}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HorizontalFeed;
