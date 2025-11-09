import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../UI/button";
import { openSettings } from "../features/settingsSlice";
import { SettingsIcon } from "lucide-react";
import { Progress } from "../../UI/progress";
import type { RootState } from "../../store/store";
import PomofocusIcon from "../../UI/PomofocusIcon";

const Header = () => {
  const dispatch = useDispatch();
  const { time, activeBg } = useSelector((state: RootState) => state.pomodoro);
  const settings = useSelector((state: RootState) => state.settings.settings);

  const totalTime = settings[activeBg];

  const progressValue = ((totalTime * 60 - time) / (totalTime * 60)) * 100;

  return (
    <>
      <header className="flex items-center justify-between w-full max-w-3xl py-6 px-8">
        <div className="flex items-center justify-center gap-1">
          <PomofocusIcon />
            <h1 className="text-2xl font-semibold">Pomofocus</h1>
        </div>
      
        <Button
          variant="pomodoro"
          size="sm"
          onClick={() => dispatch(openSettings())}
        >
          <SettingsIcon />
          Settings
        </Button>
      </header>

      <div className="w-full max-w-3xl px-8">
        <Progress value={progressValue} />
      </div>
    </>
  );
};

export default Header;
