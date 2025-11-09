import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BgVariants, PomodoroSettings } from "../pomodoro/types";

interface PomodoroState {
  activeBg: BgVariants;
  time: number;
  isRunning: boolean;
  completedPomodoros: number;
}

const initialState: PomodoroState = {
  activeBg: "pomodoro",
  time: 25 * 60,
  isRunning: false,
  completedPomodoros: 0,
};

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState,
  reducers: {
    decrementTime: (state) => {
      if (state.isRunning && state.time > 0) state.time -= 1;
    },
    toggleRunning: (state) => {
      state.isRunning = !state.isRunning;
    },
    setVariantTime: (
      state,
      action: PayloadAction<{
        variant: BgVariants;
        settings?: PomodoroSettings;
      }>
    ) => {
      const s = action.payload.settings;
      state.activeBg = action.payload.variant;

      switch (action.payload.variant) {
        case "pomodoro":
          state.time = (s?.pomodoro ?? 25) * 60;
          break;
        case "shortBreak":
          state.time = (s?.shortBreak ?? 5) * 60;
          break;
        case "longBreak":
          state.time = (s?.longBreak ?? 15) * 60;
          break;
      }

      state.isRunning = false;
    },
    incrementPomodoroCount: (state) => {
      state.completedPomodoros += 1;
    },
    resetPomodoroCount: (state) => {
      state.completedPomodoros = 0;
    },
  },
});

export const {
  decrementTime,
  toggleRunning,
  setVariantTime,
  incrementPomodoroCount,
  resetPomodoroCount,
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
