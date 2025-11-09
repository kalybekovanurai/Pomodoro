import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PomodoroSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
}

export interface SettingsState {
  isOpen: boolean;
  settings: PomodoroSettings;
}

const initialState: SettingsState = {
  isOpen: false,
  settings: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    longBreakInterval: 4,
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    openSettings(state) {
      state.isOpen = true;
    },
    closeSettings(state) {
      state.isOpen = false;
    },
    updateSettings(state, action: PayloadAction<Partial<PomodoroSettings>>) {
      state.settings = { ...state.settings, ...action.payload };
    },
    saveSettings(state, action: PayloadAction<PomodoroSettings>) {
      state.settings = action.payload;
      state.isOpen = false;
    },
  },
});

export const { openSettings, closeSettings, updateSettings, saveSettings } =
  settingsSlice.actions;
export default settingsSlice.reducer;
