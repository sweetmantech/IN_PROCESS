import { Dispatch, SetStateAction } from "react";
import { GridIcon, TimeLineIcon } from "../ui/icons";

interface AltToggleProps {
  alt: "timeline" | "grid";
  setAlt: Dispatch<SetStateAction<"timeline" | "grid">>;
}
const AltToggle = ({ alt, setAlt }: AltToggleProps) => {
  return (
    <div className="grid grid-cols-2 absolute top-[15vh] right-20 border-[1px] border-black rounded-sm overflow-hidden">
      <button
        type="button"
        className={`col-span-1 flex items-center justify-center p-2 ${alt === "timeline" ? "bg-black" : "bg-[#E5D19ECC]"}`}
        onClick={() => setAlt("timeline")}
      >
        <TimeLineIcon
          fill="none"
          stroke={`${alt === "timeline" ? "#E5D19ECC" : "#000000"}`}
        />
      </button>
      <button
        type="button"
        className={`col-span-1 flex items-center justify-center p-2 ${alt === "grid" ? "bg-black" : "bg-[#E5D19ECC]"}`}
        onClick={() => setAlt("grid")}
      >
        <GridIcon
          fill="none"
          stroke={`${alt === "grid" ? "#E5D19ECC" : "#000000"}`}
        />
      </button>
    </div>
  );
};

export default AltToggle;
