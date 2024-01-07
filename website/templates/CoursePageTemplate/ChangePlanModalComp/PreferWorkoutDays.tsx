import { DAYS } from "@hooks/myProgram/useWorkoutPreference";
import StartButton from "./StartButton";
import { UserInterface } from "@models/User/User";
import Checkbox from "./Checkbox";
import { useWorkoutPreference } from "./hooks/useWorkoutPreference";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { NetworkErrorProps } from "@modules/MyProgram/Components/NetworkErrorModal";

interface Props {
  user: UserInterface;
  setLoading: (sec: boolean) => void;
  onProceed: () => Promise<void>;
  setNetworkErrorProps: (val: NetworkErrorProps) => void;
}

const PreferWorkoutDays: React.FC<Props> = ({
  user,
  setLoading,
  onProceed,
  setNetworkErrorProps,
}) => {
  const { workoutDays, workoutDaysUpdate, onSaveWorkoutDays } =
    useWorkoutPreference(user, setLoading);

  const onSubmit = async () => {
    try {
      await onSaveWorkoutDays();
      onProceed();
    } catch (error) {
      setLoading(false);
      setNetworkErrorProps({ onRetry: onSubmit });
    }
  };

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full h-full flex flex-col px-4">
      <div onClick={handleBack} className="h-[72px] flex items-center">
        <ArrowLeftIcon className="w-8 aspect-1 text-white" />
      </div>

      <div className="flex-1">
        <p
          className="text-lg iphoneX:text-xl text-white"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Choose your days and time you want prefer working out
        </p>
        <div className="bg-black/30 p-4 my-4 rounded-2xl">
          {DAYS.map((day, index) => {
            return (
              <div key={day} className="">
                <Checkbox
                  label={day}
                  checked={workoutDays.includes(day)}
                  onPress={() => workoutDaysUpdate(day)}
                />
                {index !== DAYS.length - 1 && (
                  <div className="h-px w-full bg-[#ffffff1a] my-4" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="py-4">
        <StartButton
          title="Next"
          bgColor="bg-[#fff]"
          textColor="text-[#5D588C] "
          roundedStr="rounded-full"
          textStyle="py-4 text-center text-base rounded-full"
          fontFamily="Nunito-Bold"
          onPress={onSubmit}
        />
      </div>
    </div>
  );
};
export default PreferWorkoutDays;
