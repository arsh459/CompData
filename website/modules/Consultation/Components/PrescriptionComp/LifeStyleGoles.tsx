import { doctorFitnessGoal, lifestyleSuggestions } from "@models/Appintment";
import TextDivider from "../TextDivider";
import TextInputField from "../TextInputField";

export const doctorFitnessGoalObj: { [key in doctorFitnessGoal]: string } = {
  lose_weight: "🔥 Weight loss",
  gain_weight: "💪🏻 Weight Gain",
  keep_fit: "🤸🏻‍♀️ Keep Fit",
};

interface Props {
  lifeStyleData?: lifestyleSuggestions;
  setLifeStyleData: (val: lifestyleSuggestions) => void;
}
export const getDeltaWeighLable = (goal?: doctorFitnessGoal) => {
  if (goal === "lose_weight") {
    return "How much to lose (kg):";
  } else if (goal === "gain_weight") {
    return "How much to gain (kg):";
  } else {
    return "Maintain weight:";
  }
};
const LifeStyleGoles: React.FC<Props> = ({
  lifeStyleData,
  setLifeStyleData,
}) => {
  const getDoctorFitnessGoal = (goal: doctorFitnessGoal) => {
    return (
      <div
        key={goal}
        onClick={() => setLifeStyleData({ ...lifeStyleData, goal })}
        className="flex-1 flex justify-center items-center cursor-pointer rounded-lg p-2"
        style={{
          backgroundColor:
            lifeStyleData?.goal === goal ? "#FFFFFF" : "transparent",
        }}
      >
        <p className="capitalize whitespace-nowrap text-xs sm:text-sm text-center">
          {doctorFitnessGoalObj[goal]}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <TextDivider text="Lifestyle goals" />
      <div className="flex flex-col lg:flex-row gap-4">
        <div
          className="w-full lg:w-1/4 flex lg:flex-col gap-2 p-2 rounded-xl"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
        >
          {Object.keys(doctorFitnessGoalObj).map((each) =>
            getDoctorFitnessGoal(each as doctorFitnessGoal)
          )}
        </div>
        <div
          className="flex-1 flex flex-col gap-4 p-4 rounded-xl"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
        >
          <TextInputField
            type="number"
            startAdornmentText={getDeltaWeighLable(lifeStyleData?.goal)}
            placeholder="Specify in kg"
            value={lifeStyleData?.weightDelta || ""}
            onChange={(e) =>
              setLifeStyleData({
                ...lifeStyleData,
                weightDelta: parseFloat(e.target.value),
              })
            }
            InputProps={{ style: { backgroundColor: "transparent" } }}
          />
          <TextInputField
            startAdornmentText="# Times to exercise/week :"
            placeholder="Type here"
            value={lifeStyleData?.weeklyExerciseGoal || ""}
            onChange={(e) =>
              setLifeStyleData({
                ...lifeStyleData,
                weeklyExerciseGoal: e.target.value,
              })
            }
            InputProps={{ style: { backgroundColor: "transparent" } }}
          />
        </div>
      </div>
      <div>
        <TextInputField
          label="Note for Workout coach"
          multiline={true}
          placeholder="For example - include cardio, running, Has back injury"
          value={lifeStyleData?.noteForWorkoutCoach || ""}
          onChange={(e) =>
            setLifeStyleData({
              ...lifeStyleData,
              noteForWorkoutCoach: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};

export default LifeStyleGoles;
