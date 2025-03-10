"use client";

import { useParams } from "next/navigation";
import Feed from "./Feed";
import { useArtistProfile } from "@/hooks/useArtistProfile";
import { Skeleton } from "../ui/skeleton";
import truncateAddress from "@/lib/truncateAddress";
import { Address } from "viem";
import Social from "./Social";
import {
  FarcasterIcon,
  InstagramIcon,
  TikTokIcon,
  TwitterIcon,
} from "../ui/icons";

const ArtistPage = () => {
  const { artistAddress } = useParams();
  const { isLoading, data } = useArtistProfile();
  if (isLoading) return <Skeleton />;

  return (
    <div className="w-screen grow flex flex-col pt-16 md:pt-[20vh]">
      <div className="px-2 md:px-10">
        <p className="text-4xl md:text-5xl font-archivo-medium tracking-[-1px]">
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
      <div className="md:grow flex flex-col px-2 md:px-0 md:pt-20 md:mr-10">
        <Feed />
      </div>
    </div>
  );
};

export default ArtistPage;
