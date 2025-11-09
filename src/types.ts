// src/types.ts

// Фазы Pomodoro
export type BgVariants = "pomodoro" | "shortBreak" | "longBreak";

// Цвета фона под каждую фазу
export const bgColor: Record<BgVariants, string> = {
  pomodoro: "bg-[#C15C5C]",
  shortBreak: "bg-[#4C9196]",
  longBreak: "bg-[#4D7FA2]",
};
