import { weEventTrack } from "@analytics/webengage/user/userLog";
import { fitnessGoalTypes, LocalUser } from "@models/User/User";
import clsx from "clsx";

interface Props {
  localUser?: LocalUser | undefined;
  onGoalUpdate: (val: fitnessGoalTypes) => void;
}

const SetGoal: React.FC<Props> = ({ localUser, onGoalUpdate }) => {
  const hasVal = (key: fitnessGoalTypes) => {
    if (localUser?.fitnessGoal?.includes(key)) {
      return true;
    }
    return false;
  };

  const onGoalUpdateFunc = (goal: fitnessGoalTypes) => {
    weEventTrack("fScanGoal_changeGoal", { goal: goal });
    onGoalUpdate(goal);
  };

  return (
    <div className="grid auto-rows-max gap-6">
      <div
        className={clsx(
          "px-8 py-4 rounded-2xl flex flex-row items-center",
          hasVal("lose_weight") ? "bg-[#F1F1F1]" : "bg-[#262630]"
        )}
        onClick={() => onGoalUpdateFunc("lose_weight")}
      >
        <p
          className={clsx(
            "flex-1 text-xl iphoneX:text-2xl capitalize",
            hasVal("lose_weight") ? "text-[#100F1A]" : "text-[#F1F1F1]"
          )}
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          Lose Weight
        </p>
        <img
          src="https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Vector_rho83m8Ts.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666001190124"
          alt="icon for weight measurement"
          className="h-12 iphoneX:h-16 aspect-1 object-contain"
        />
      </div>
      <div
        className={clsx(
          "px-8 py-4 rounded-2xl flex flex-row items-center",
          hasVal("gain_muscle") ? "bg-[#F1F1F1]" : "bg-[#262630]"
        )}
        onClick={() => onGoalUpdateFunc("gain_muscle")}
      >
        <p
          className={clsx(
            "flex-1 text-xl iphoneX:text-2xl capitalize",
            hasVal("gain_muscle") ? "text-[#100F1A]" : "text-[#F1F1F1]"
          )}
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          Gain Muscle
        </p>
        <img
          src="https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Vector_511_BoX1lT5KQ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666001190109"
          alt="muscle icon"
          className="h-12 iphoneX:h-16 object-contain aspect-[80/70]"
        />
      </div>
    </div>
  );
};

export default SetGoal;
