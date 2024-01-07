import Loading from "@components/loading/Loading";
import { useForcePortrait } from "@hooks/orientation/useForcePortrait";
// import { useUnlockAsync } from "@hooks/orientation/useUnlockAsync";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import CongratulationsMain from "@modules/CongratulationsMain";
import { useWorkoutVideoStore } from "@modules/Workout/ProgramDetails/TaskSubmitV3/utils/useWorkoutVideoStore";
import { useRoute } from "@react-navigation/native";
import { WorkoutDoneScreenTypes } from "@screens/Workout/WorkoutDoneScreen";
import { View } from "react-native";

export interface CongratulationsParams {
  // earnedFP: number;
  // totalFP: number;
  // type: "workout" | "nutrition";
  workoutProp: WorkoutDoneScreenTypes;
}

const Congratulations = () => {
  const route = useRoute();
  const params = route.params as CongratulationsParams;

  const { earnedFP, totalFP } = useWorkoutVideoStore((state) => {
    return {
      earnedFP: state.fpAward,
      totalFP: state.task?.fitPoints ? state.task?.fitPoints : 0,
    };
  });

  const { state } = useForcePortrait();
  // useUnlockAsync();
  console.log("State", state);

  useScreenTrack();

  if (!state) {
    return (
      <View className="w-full h-full bg-black flex justify-center items-center">
        <Loading />
      </View>
    );
  }

  // return (
  //   <View className="w-full h-full bg-black flex justify-center items-center"></View>
  // );

  return (
    <CongratulationsMain
      earnedFP={earnedFP}
      totalFP={totalFP}
      type="workout"
      workoutProp={params.workoutProp}
    />
  );
};

export default Congratulations;
