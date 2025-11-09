import {
  decrementTime,
  setVariantTime,
  toggleRunning,
  incrementPomodoroCount,
} from "@/components/features/pomodoroSlice";
import type { RootState } from "@/store/store";
import type { PomodoroSettings } from "@/components/pomodoro/types";
import type { BgVariants } from "@/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function usePomodoro() {
  const dispatch = useDispatch();
  const { activeBg, time, isRunning, completedPomodoros } = useSelector(
    (state: RootState) => state.pomodoro
  );
  const settings: PomodoroSettings = useSelector(
    (state: RootState) => state.settings.settings
  );

  const handleNext = () => {
    let next: BgVariants;

    if (activeBg === "pomodoro") {
      dispatch(incrementPomodoroCount());

      const isLongBreak =
        (completedPomodoros + 1) % settings.longBreakInterval === 0;
      next = isLongBreak ? "longBreak" : "shortBreak";
    } else {
      next = "pomodoro";
    }

    dispatch(setVariantTime({ variant: next, settings }));

    const isBreak = next === "shortBreak" || next === "longBreak";
    const isPomodoro = next === "pomodoro";

    if (
      (isBreak && settings.autoStartBreaks) ||
      (isPomodoro && settings.autoStartPomodoros)
    ) {
      dispatch(toggleRunning());
    }
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => dispatch(decrementTime()), 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, dispatch]);

  useEffect(() => {
    if (time === 0) handleNext();
  }, [time]);

  const maxTime = (() => {
    switch (activeBg) {
      case "pomodoro":
        return settings.pomodoro * 60;
      case "shortBreak":
        return settings.shortBreak * 60;
      case "longBreak":
        return settings.longBreak * 60;
      default:
        return 0;
    }
  })();

  return { activeBg, time, isRunning, handleNext, maxTime, completedPomodoros };
}
