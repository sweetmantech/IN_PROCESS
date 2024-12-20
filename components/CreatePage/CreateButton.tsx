"use client";

import { Button } from "@/components/ui/button";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const CreateButton = () => {
  const { create } = useZoraCreateProvider();

  return (
    <Button
      onClick={() => create()}
      className="bg-white text-black p-3 transform hover:scale-105 transition-transform duration-150 hover:shadow-lg"
    >
      Create
    </Button>
  );
};

export default CreateButton;
