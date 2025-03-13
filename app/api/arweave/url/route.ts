import uploadPfpToArweave from "@/lib/arweave/uploadToArweave";
import getBlob from "@/lib/getBlob";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) {
      return Response.json({ message: "No URI provided" }, { status: 400 });
    }
    const { blob, type } = await getBlob(url);
    const file = new File([blob], "uploadedFile", { type });
    const uri = await uploadPfpToArweave(file);
    return Response.json(uri);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to upload image";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
