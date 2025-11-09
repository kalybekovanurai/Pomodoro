import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import type { RootState } from "../../store/store";
import { closeSettings, saveSettings } from "../features/settingsSlice";
import { setVariantTime } from "../features/pomodoroSlice";
import { Switch } from "../../UI/switch";
import { Button } from "../../UI/button";
import TimerIcon from "../../UI/TimerIcon";
import type { BgVariants, PomodoroSettings } from "./types";

export default function SettingsModal() {
  const dispatch = useDispatch();
  const { isOpen, settings } = useSelector(
    (state: RootState) => state.settings
  );
  const { activeBg } = useSelector((state: RootState) => state.pomodoro);

  const [localSettings, setLocalSettings] =
    useState<PomodoroSettings>(settings);

  useEffect(() => {
    if (isOpen) setLocalSettings(settings);
  }, [isOpen, settings]);

  if (!isOpen) return null;

  const handleSave = () => {
    dispatch(saveSettings(localSettings));

    dispatch(
      setVariantTime({
        variant: activeBg,
        settings: localSettings,
      })
    );

    dispatch(closeSettings());
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-lg shadow-xl relative">
        <div className="border-b border-gray-200 py-3 flex justify-center relative">
          <h2 className="text-gray-400 font-semibold tracking-wide">
            SETTINGS
          </h2>
          <button
            onClick={() => dispatch(closeSettings())}
            className="absolute right-4 top-2 p-1 text-gray-400 hover:bg-gray-300 hover:rounded-md text-md"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <h3 className="text-gray-400 font-semibold text-sm flex items-center gap-2 mb-3">
              <TimerIcon /> TIMER
            </h3>
            <h2 className="text-black font-semibold">Time (minutes)</h2>
            <div className="grid grid-cols-3 gap-3">
              {(["pomodoro", "shortBreak", "longBreak"] as const).map(
                (key: BgVariants) => (
                  <div key={key}>
                    <label className="text-sm text-gray-400 block mb-1 font-semibold">
                      {key === "pomodoro"
                        ? "Pomodoro"
                        : key === "shortBreak"
                        ? "Short Break"
                        : "Long Break"}
                    </label>
                    <input
                      type="number"
                      className="w-full bg-gray-100 text-gray-700 rounded-md text-center p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      value={localSettings[key]}
                      onChange={(e) =>
                        setLocalSettings({
                          ...localSettings,
                          [key]: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-gray-700 font-semibold">
              Auto Start Breaks
            </span>
            <Switch
              checked={localSettings.autoStartBreaks}
              onCheckedChange={(checked) =>
                setLocalSettings({ ...localSettings, autoStartBreaks: checked })
              }
            />
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-700 font-semibold">
              Auto Start Pomodoros
            </span>
            <Switch
              checked={localSettings.autoStartPomodoros}
              onCheckedChange={(checked) =>
                setLocalSettings({
                  ...localSettings,
                  autoStartPomodoros: checked,
                })
              }
            />
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-gray-700 font-semibold">
              Long Break Interval
            </span>
            <input
              type="number"
              min={1}
              className="w-16 bg-gray-100 text-gray-700 rounded-md text-center p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={localSettings.longBreakInterval}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  longBreakInterval: Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-3 flex justify-end rounded-b-lg">
          <Button variant="ghost" size="xs" onClick={handleSave}>
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
