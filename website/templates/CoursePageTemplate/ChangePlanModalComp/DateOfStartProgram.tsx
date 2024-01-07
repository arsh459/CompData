import { format } from "date-fns";
import { UserInterface } from "@models/User/User";
import { Badge } from "@models/Prizes/PrizeV2";
import { makeGeneratorCall } from "@hooks/myProgram/generatorCall";
import { ConfirmationProps } from "./Confirmation";
import { useWorkoutStartOfBadge } from "./hooks/useWorkoutStartOfBadge";
import { sectionTypes } from "../useChangePlan";
import StartButton from "./StartButton";
import { useTodayDate } from "@hooks/myProgram/useTodayDate";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { NetworkErrorProps } from "@modules/MyProgram/Components/NetworkErrorModal";

interface Props {
  badge: Badge;
  user: UserInterface;
  setModalProps: (val: ConfirmationProps | undefined) => void;
  noModal?: boolean;
  setLoading: (sec: boolean) => void;
  onGoToSection: (sec: sectionTypes) => void;
  setNetworkErrorProps: (val: NetworkErrorProps) => void;
}

const getSavedDate = (user?: UserInterface, badge?: Badge) => {
  return badge?.id &&
    user?.recommendationConfig?.badgeConfig &&
    user?.recommendationConfig?.badgeConfig[badge.id]
    ? user?.recommendationConfig?.badgeConfig[badge?.id].start
    : undefined;
};

const hasDateChanged = (selectedDate: Date, originalDate?: number) => {
  if (!originalDate) {
    return true;
  }

  const originalDateStr = format(new Date(originalDate), "yyyy-MM-dd");
  const currDateStr = format(selectedDate, "yyyy-MM-dd");

  if (currDateStr === originalDateStr) {
    return false;
  }

  return true;
};

const DateOfStartProgram: React.FC<Props> = ({
  badge,
  user,
  setModalProps,
  noModal,
  setLoading,
  onGoToSection,
  setNetworkErrorProps,
}) => {
  const { todayUnix } = useTodayDate();
  const {
    workoutStartOfBadge,
    setWorkoutStartOfBadge,
    onSaveWorkoutStartOfBadge,
  } = useWorkoutStartOfBadge(badge, user);

  const onClose = () => {
    const savedUnix = getSavedDate(user, badge);
    if (savedUnix) {
      setWorkoutStartOfBadge(new Date(savedUnix));
    }

    setModalProps(undefined);
  };

  const editing = hasDateChanged(
    workoutStartOfBadge,
    getSavedDate(user, badge)
  );

  const onNav = () => {
    onGoToSection("preferWorkoutDays");
  };

  const onSave = async () => {
    try {
      if (user.uid) {
        setModalProps(undefined);
        setLoading(true);
        await onSaveWorkoutStartOfBadge();

        await makeGeneratorCall(user.uid, "workout", true, true, badge?.id);
        onNav();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setNetworkErrorProps({ onRetry: onSave });
    }
  };

  const onNext = async () => {
    if (editing && !noModal) {
      setModalProps({
        heading: "Are you sure you want to change the start date?",
        subtitle: "Your program will start fresh from this date",
        onClose,
        onNext: onSave,
      });
    } else if (editing && noModal) {
      await onSave();
    } else {
      onNav();
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
      <div className="flex-1 flex flex-col">
        <p
          className="text-2xl iphoneX:text-3xl text-white "
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Select your date of {"\n"}starting your program
        </p>
        <p
          className="text-base text-white py-4"
          style={{ fontFamily: "Nunito-Light" }}
        >
          This will help us create a day wise workout {"\n"}plan for you. You
          can change it anytime.
        </p>

        <div className="h-16 aspect-1" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            renderInput={(props) => <TextField {...props} />}
            minDate={new Date(todayUnix)}
            value={workoutStartOfBadge}
            onChange={(newValue) => {
              newValue && setWorkoutStartOfBadge(new Date(newValue));
            }}
            OpenPickerButtonProps={{ sx: { color: "#FFFFFF" } }}
            InputProps={{ sx: { color: "#FFFFFF" } }}
            className="DateOfStartProgram"
          />
        </LocalizationProvider>
      </div>
      <div className="p-4">
        <StartButton
          title={editing ? "Save and Next" : "Next"}
          bgColor="bg-[#fff]"
          textColor="text-[#5D588C] "
          roundedStr="rounded-full"
          textStyle="py-4 text-center text-base rounded-full"
          fontFamily="Nunito-Bold"
          onPress={onNext}
        />
      </div>
    </div>
  );
};

export default DateOfStartProgram;
