import truncateAddress from "@/lib/truncateAddress";
import { Address } from "viem";
import Social from "./Social";
import {
  FarcasterIcon,
  InstagramIcon,
  TikTokIcon,
  TwitterIcon,
} from "../ui/icons";
import { useParams } from "next/navigation";
import { useArtistProfile } from "@/hooks/useArtistProfile";
import { Skeleton } from "../ui/skeleton";

const ArtistProfile = () => {
  const { artistAddress } = useParams();
  const { data, isLoading } = useArtistProfile();

  if (isLoading) return <Skeleton />;

  return (
    <div>
      <p className="text-xl md:text-5xl font-archivo-medium tracking-[-1px]">
        {data?.displayName || truncateAddress(artistAddress as Address)}
      </p>
      <p className="text-lg md:text-xl font-spectral pt-2 md:pt-4">
        {data?.description || ""}
      </p>
      <div className="flex gap-2 items-center pt-2 md:pt-6">
        {data?.socialAccounts.instagram && (
          <Social
            link={`https://instagram.com/${data.socialAccounts.instagram.username}`}
            icon={<InstagramIcon />}
          />
        )}
        {data?.socialAccounts.twitter && (
          <Social
            link={`https://x.com/@${data.socialAccounts.twitter.username}`}
            icon={<TwitterIcon />}
          />
        )}
        {data?.socialAccounts.farcaster && (
          <Social
            link={`https://warpcast.com/${data.socialAccounts.farcaster.username}`}
            icon={<FarcasterIcon />}
          />
        )}
        {data?.socialAccounts.tiktok && (
          <Social
            link={`https://tiktok.com/${data.socialAccounts.tiktok.username}`}
            icon={<TikTokIcon />}
          />
        )}
      </div>
    </div>
  );
};

export default ArtistProfile;
