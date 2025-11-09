import { twMerge } from "tailwind-merge";
import { useDispatch } from "react-redux";
import { Button } from "../../UI/button";
import Tags from "./Tags";
import { buttonTextColor } from "./types";
import NextIcon from "../../UI/NextIcon";
import { usePomodoro } from "@/hooks/usePomodoro";
import { setVariantTime } from "../features/pomodoroSlice";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const Timer = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings.settings);
  const { activeBg, time, isRunning, handleNext } = usePomodoro();

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");

  return (
    <div className="bg-[#FFFEFF19] px-17 py-3 rounded-md flex flex-col items-center justify-center mt-10 transition-colors duration-500">
      <Tags
        activeBg={activeBg}
        onChange={(newPhase) =>
          dispatch(setVariantTime({ variant: newPhase, settings }))
        }
      />
      <h1 className="text-9xl font-semibold m-4">
        {minutes}:{seconds}
      </h1>

      <div className="relative m-4 flex justify-center w-full">
        <Button
          className={twMerge(
            "bg-white font-semibold cursor-pointer transition-colors",
            buttonTextColor[activeBg],
            isRunning ? "border-none" : ""
          )}
          onClick={() => dispatch({ type: "pomodoro/toggleRunning" })}
        >
          {isRunning ? "Pause" : "Start"}
        </Button>

        {isRunning && (
          <Button
            onClick={handleNext}
            variant="next"
            className="absolute top-0 right-[-50px]"
          >
            <NextIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Timer;
