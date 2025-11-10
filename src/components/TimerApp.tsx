import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import Header from "../components/pomodoro/Header";
import type { RootState } from "../store/store";
import Timer from "../components/pomodoro/Timer";
import SettingsModal from "../components/pomodoro/SettingsModal";
import { bgColor } from "../components/pomodoro/types";
import { usePomodoro } from "../hooks/usePomodoro";

function TimerApp() {
  const { activeBg } = useSelector((state: RootState) => state.pomodoro);
  const { completedPomodoros } = usePomodoro();
  return (
    <div
      className={twMerge(
        bgColor[activeBg],
        "flex flex-col items-center justify-start h-screen w-full text-white transition-colors duration-500"
      )}
    >
      <Header />
      <main className="flex flex-col items-center mt-10 w-full">
        <Timer />
      </main>
      <p className="text-sm text-gray-300 m-4 text-center font-normal">
        #{completedPomodoros}
      </p>
      <SettingsModal />
    </div>
  );
}

export default TimerApp;
