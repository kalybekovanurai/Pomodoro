import { configureStore } from "@reduxjs/toolkit";
import pomodoroReducer from "../components/features/pomodoroSlice";
import settingsReducer from "../components/features/settingsSlice";

export const store = configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
