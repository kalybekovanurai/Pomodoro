export type BgVariants = "pomodoro" | "shortBreak" | "longBreak";

export const bgColor: Record<BgVariants, string> = {
  pomodoro: "bg-[#BA4949]",
  shortBreak: "bg-[#38858A]",
  longBreak: "bg-[#397097]",
};

export const buttonTextColor: Record<BgVariants, string> = {
  pomodoro: "text-[#BA4949]",
  shortBreak: "text-[#38858A]",
  longBreak: "text-[#397097]",
};

export interface PomodoroSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
}
