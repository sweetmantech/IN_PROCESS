import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "@xyflow/react";
import { XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CustomData {
  isEditing: boolean;
}

declare global {
  interface Window {
    onEdgeLabelChange: (edgeId: string, newLabel: string) => void;
  }
}

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
  data,
}: EdgeProps) => {
  const edgeData = data as CustomData | undefined;
  const [editValue, setEditValue] = useState<string>((label as string) || "");
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue((label as string) || "");
  }, [label]);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  useEffect(() => {
    if (edgeData?.isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [edgeData?.isEditing]);

  const onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter" || evt.key === "Escape") {
      evt.preventDefault();
      window.onEdgeLabelChange(id, editValue);
    }
  };

  if (!isVisible)
    return <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />;

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          className="absolute pointer-events-auto nodrag nopan group"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <button
            onClick={() => setIsVisible(false)}
            className="absolute -top-1 -right-1 bg-gray-700 rounded-full text-white items-center justify-center hidden group-hover:flex hover:bg-gray-900"
          >
            <XIcon className="size-2" />
          </button>
          {edgeData?.isEditing ? (
            <input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={onKeyDown}
              className="text-[7px] bg-white outline-none text-center w-[20px]"
            />
          ) : (
            <div className="text-[7px] px-1 bg-white">{label}</div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
