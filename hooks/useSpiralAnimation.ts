import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SpiralConfig, TextPoint } from "@/types/spiral";
import { createPathData } from "@/lib/utils/spiralPath";
import { Collection } from "@/types/token";
import truncateAddress from "@/lib/truncateAddress";

export const useSpiralAnimation = (
  config: SpiralConfig,
  feeds: Collection[],
): TextPoint[] => {
  const [textPoints, setTextPoints] = useState<TextPoint[]>([]);
  const pathRef = useRef<SVGPathElement | null>(null);
  const animationFrameRef = useRef<number>();
  const offsetRef = useRef(0);
  const [chunkStart, setChunkStart] = useState(0);

  const pathData = useMemo(
    () => createPathData(config.points),
    [config.points],
  );

  const speedMultiplier = 1;

  const calculateRotation = useCallback(
    (path: SVGPathElement, distance: number, totalLength: number): number => {
      const before = path.getPointAtLength(
        (distance - 1 + totalLength) % totalLength,
      );
      const current = path.getPointAtLength(distance);
      const after = path.getPointAtLength((distance + 1) % totalLength);

      const dx1 = current.x - before.x;
      const dy1 = current.y - before.y;
      const dx2 = after.x - current.x;
      const dy2 = after.y - current.y;

      const dx = (dx1 + dx2) / 2;
      const dy = (dy1 + dy2) / 2;

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      return angle > 90 || angle < -90 ? angle + 180 : angle;
    },
    [],
  );

  useEffect(() => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    pathRef.current = path;

    return () => {
      pathRef.current = null;
    };
  }, [pathData]);

  const updateTextPoints = () => {
    const path = pathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    const wordsPerLoop = Math.floor(totalLength / config.spacing);
    const offset = offsetRef.current * (config.baseSpeed * speedMultiplier);

    let feedsChunk = feeds.slice(chunkStart, chunkStart + wordsPerLoop);
    if (feedsChunk.length < wordsPerLoop) {
      feedsChunk = [
        ...feedsChunk,
        ...feeds.slice(0, wordsPerLoop - feedsChunk.length),
      ];
    }
    const newPoints: TextPoint[] = [];

    let lastPointX = 0;
    for (let i = 0; i < wordsPerLoop; i++) {
      const word = `${truncateAddress(feedsChunk[i].creator)} - ${new Date(feedsChunk[i].released_at).toLocaleString().toLowerCase()}`;
      const letters = word.split("");
      const spacing = config.spacing / letters.length;

      for (let j = 0; j < letters.length; j++) {
        const distance =
          (i * config.spacing + j * spacing + offset) % totalLength;
        const point = path.getPointAtLength(distance);
        const rotation = calculateRotation(path, distance, totalLength);
        if (i === wordsPerLoop - 1 && j === 0) lastPointX = point.x;
        newPoints.push({
          position: [point.x, point.y],
          rotation,
          text: letters[j],
          index: chunkStart + i,
        });
      }
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      setChunkStart((chunkStart + 1) % feeds.length);
    }
    setTextPoints(newPoints);
  };

  useEffect(() => {
    if (!pathRef.current) return;

    let lastTime = 0;
    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      offsetRef.current +=
        (deltaTime / 1000) * (config.baseSpeed * speedMultiplier);

      updateTextPoints();
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [config, feeds, pathData, chunkStart, animationFrameRef.current]);

  return textPoints;
};
