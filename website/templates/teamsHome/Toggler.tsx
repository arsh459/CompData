import { Switch } from "@headlessui/react";
import { getLevelColorV2 } from "@templates/LandingPage/levelColor";
import clsx from "clsx";

interface Props {
  enabled: boolean;
  setEnabled: (val: boolean) => void;
}

const Toggler: React.FC<Props> = ({ enabled, setEnabled }) => {
  const levelData = getLevelColorV2(4);

  return (
    <div className="p-4">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="relative z-0 w-full rounded-xl bg-[#C2C2C2]/10 flex justify-around items-center py-4"
      >
        <span
          className={clsx(
            "text-lg font-extrabold relative z-50 transition-all",
            enabled ? "opacity-50" : "opacity-100"
          )}
          style={{ color: levelData.color }}
        >
          Last 30 days
        </span>
        <span
          className={clsx(
            enabled ? "translate-x-full" : "translate-x-0",
            "absolute left-1 top-0 bottom-0 right-1/2 z-20 transition-all",
            "rounded-xl bg-[#1A1A1A]/40 my-1 overflow-hidden"
          )}
        >
          <span
            className="absolute inset-0 z-10 rounded-xl blur-[80px]"
            style={{ backgroundColor: levelData.color }}
          />
        </span>
        <span
          className={clsx(
            "text-lg font-extrabold relative z-50 transition-all",
            enabled ? "opacity-100" : "opacity-50"
          )}
          style={{ color: levelData.color }}
        >
          Last week
        </span>
      </Switch>
    </div>
  );
};

export default Toggler;
