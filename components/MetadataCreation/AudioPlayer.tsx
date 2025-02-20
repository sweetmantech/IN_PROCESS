import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";

const AudioPlayer = ({ onClick }: { onClick: () => void }) => {
  const { imageUri, animationUri } = useZoraCreateProvider();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      const time = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(value[0]);
    }
  };

  return (
    <div className="size-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative w-full h-3/4" onClick={onClick}>
        <Image
          src={getFetchableUrl(imageUri) || ""}
          alt="Audio cover"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="p-1">
        <audio
          ref={audioRef}
          src={getFetchableUrl(animationUri) || ""}
          onTimeUpdate={handleTimeUpdate}
        />
        <div className="text-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
            className="text-primary hover:text-primary-dark"
          >
            {isPlaying ? (
              <Pause className="size-6" />
            ) : (
              <Play className="size-6" />
            )}
          </Button>
        </div>
        <Slider
          value={[progress]}
          onValueChange={handleSliderChange}
          max={100}
          step={1}
          className="w-full bg-black"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
