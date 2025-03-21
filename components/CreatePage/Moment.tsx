import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const Moment = () => {
  const { titleRef } = useZoraCreateProvider();

  return (
    <div className="pl-20 h-fit">
      <div ref={titleRef} className="flex items-end gap-3 w-fit">
        <div className="w-full">
          <p className="font-archivo-medium text-5xl">new moment</p>
        </div>
      </div>
    </div>
  );
};

export default Moment;
