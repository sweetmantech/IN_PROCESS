import { NextRequest } from "next/server";
import OgFooter from "@/components/Og/artist/OgFooter";
import OgHeader from "@/components/Og/artist/OgHeader";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;
  const artistAddress: any = queryParams.get("artistAddress");

  const { ImageResponse } = await import("@vercel/og");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: 12,
          display: "flex",
          flexDirection: "column",
          background:
            "url('https://arweave.net/gy-nRfHfMpRN7mFefZ8CO3UH0GdO_Pn2ff5LRhw7VTU')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <OgHeader />
        <OgFooter address={artistAddress} />
      </div>
    ),
    {
      width: 500,
      height: 175,
    },
  );
}
