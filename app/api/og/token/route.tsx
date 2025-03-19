import OgBackground from "@/components/Og/token/OgBackground";
import OgFooter from "@/components/Og/token/OgFooter";
import OgHeader from "@/components/Og/token/OgHeader";
import getArtistInfo from "@/lib/getArtistInfo";
import getOwner from "@/lib/zora/getOwner";
import { Address } from "viem";
import { NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const VERCEL_OG = "https://in-process-seven.vercel.app";

const archivoFont = fetch(
  new URL(`${VERCEL_OG}/fonts/Archivo-Regular.ttf`, import.meta.url),
).then((res) => res.arrayBuffer());

const spectralFont = fetch(
  new URL(`${VERCEL_OG}/fonts/Spectral-Regular.ttf`, import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;
  const collection: any = queryParams.get("collection");
  const tokenId: any = queryParams.get("tokenId");

  if (!tokenId || !collection)
    throw Error("collection or tokenId should be provided.");

  const owner = await getOwner(collection);
  const artistInfo = await getArtistInfo(owner as Address);

  const { ImageResponse } = await import("@vercel/og");

  const [archivoFontData, spectralFontData] = await Promise.all([
    archivoFont,
    spectralFont,
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <OgBackground backgroundUrl="https://arweave.net/v4oi_743N_ZlPiPbHyGyy9nhqyZsE_lLhzeHrmEHUG0" />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            zIndex: 2,
            width: "100%",
            height: "100%",
            padding: 12,
          }}
        >
          <OgHeader
            ensAvatar={artistInfo.ensAvatar}
            ensName={artistInfo.ensName}
            comments={1}
          />
          <OgFooter />
        </div>
      </div>
    ),
    {
      width: 500,
      height: 180,
      fonts: [
        {
          name: "Archivo",
          data: archivoFontData,
          weight: 400,
        },
        {
          name: "Spectral",
          data: spectralFontData,
          weight: 400,
        },
      ],
    },
  );
}
