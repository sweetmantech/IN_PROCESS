import { ReactNode } from "react";

const CommentsContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full mt-10">
      <p className="text-lg font-archivo">comments</p>
      <div className="min-h-[300px] rounded-md mt-4 py-5 px-6 relative rounded-md overflow-hidden bg-tan-opacity-300">
        {children}
      </div>
    </div>
  );
};

export default CommentsContainer;
