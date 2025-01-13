"use client";

import { useAccount } from "wagmi";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import Spinner from "@/components/ui/spinner";
import MediaUpload from "@/components/MediaUpload/MediaUpload";
import LoginButton from "@/components/LoginButton";
import Title from "./Title";
import CreateButton from "./CreateButton";

export default function CreatePage() {
  const { creating, name } = useZoraCreateProvider();
  const { address } = useAccount();

  if (creating) {
    return (
      <>
        <Spinner />
        <span>Creating Post!</span>
      </>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <LoginButton />
      <div className="mt-8 md:flex md:space-x-8">
        <div className="md:w-1/2 flex flex-col items-center gap-5">
          <MediaUpload />
        </div>
        {name && (
          <div className="mt-4 md:mt-0 md:w-1/2 flex flex-col items-center gap-3">
            <div className="w-full flex flex-col items-start gap-4">
              <Title />
            </div>
            {address ? <CreateButton /> : <LoginButton />}
          </div>
        )}
      </div>
    </div>
  );
}
