import { Token } from "@/types/token";

export const useStepCalculation = () => {
  const calculateStep = (currentIndex: number, feeds: Token[]): number => {
    if (currentIndex === 0) return 0;

    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const previousDate = new Date(feeds[currentIndex - 1].released_at);
    const currentDate = new Date(feeds[currentIndex].released_at);

    return (previousDate.getTime() - currentDate.getTime()) / MS_PER_DAY;
  };

  return { calculateStep };
};
