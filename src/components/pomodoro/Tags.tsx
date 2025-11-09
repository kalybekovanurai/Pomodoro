import type { BgVariants } from "@/types";
import { twMerge } from "tailwind-merge";

interface TagsProps {
  activeBg: BgVariants;
  onChange: (newPhase: BgVariants) => void;
}

const tags: BgVariants[] = ["pomodoro", "shortBreak", "longBreak"];

const Tags = ({ activeBg, onChange }: TagsProps) => {
  return (
    <div className="flex gap-3 p-2 rounded-full">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          className={twMerge(
            "px-3 py-1 rounded-xs text-white font-normal transition cursor-pointer",
            activeBg === tag ? "bg-[rgba(0,0,0,0.3)] font-bold" : ""
          )}
        >
          {tag === "pomodoro"
            ? "Pomodoro"
            : tag === "shortBreak"
            ? "Short Break"
            : "Long Break"}
        </button>
      ))}
    </div>
  );
};

export default Tags;
