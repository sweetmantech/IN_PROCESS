"use client";

import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import Spinner from "@/components/ui/spinner";
import MetadataCreation from "@/components/MetadataCreation";
import Title from "./Title";
import CreateButton from "./CreateButton";
import Description from "./Description";
import Price from "./Price";

export default function CreatePage() {
  const { creating } = useZoraCreateProvider();

  return (
    <main className="w-screen grow">
      {creating ? (
        <div className="flex flex-col gap-2 items-center justify-center">
          <Spinner />
          <span>Creating Post!</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center pt-[200px]">
          <div className="w-full px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mt-4">
              <div className="pl-10">
                <p className="font-archivo text-5xl font-bold">new moment</p>
              </div>
              <div className="flex flex-col items-center gap-5">
                <MetadataCreation />
              </div>
              <div className="w-full flex flex-col items-start gap-6">
                <Title />
                <Description />
                <Price />
                <CreateButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
