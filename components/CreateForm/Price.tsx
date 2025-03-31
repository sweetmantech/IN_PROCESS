"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

export default function Price() {
  const { price, setPrice, priceUnit, fileUploading, creating } =
    useZoraCreateProvider();

  return (
    <div className="w-full space-y-2">
      <Label htmlFor="price" className="font-archivo text-md">
        price
      </Label>
      <div className="flex overflow-hidden border border-grey-secondary">
        <Input
          id="price"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="flex-grow !font-medium !rounded-[0px] !border-none bg-white focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          step="0.01"
          disabled={Boolean(fileUploading || creating)}
        />
        <div className="bg-white">
          <div className="w-[1px] h-6 bg-grey-secondary my-2" />
        </div>
        <p className="bg-white px-3 flex items-center justify-center font-archivo">
          {priceUnit}
        </p>
      </div>
    </div>
  );
}
