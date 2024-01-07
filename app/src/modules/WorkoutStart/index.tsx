import { View, Text, ScrollView } from "react-native";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useNavigation } from "@react-navigation/native";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import DatePicker from "@modules/WorkoutOnboardingMain/OnboardingDatePicker";
import { useWorkoutStartOfBadge } from "@hooks/task/useWorkoutStartOfBadge";
import { makeGeneratorCall } from "@hooks/dayRecs/generatorCall";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useState } from "react";
import Loading from "@components/loading/Loading";
import WarningModal from "@modules/CourseMain/Components/WarningModal";
import { format } from "date-fns";
import { BadgeConfig } from "@models/User/User";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  goBack?: boolean;
  noModal?: boolean;
}

const getSavedDate = (
  badgeConfig?: { [badgeId: string]: BadgeConfig },
  badgeId?: string
) => {
  return badgeId && badgeConfig && badgeConfig[badgeId]
    ? badgeConfig[badgeId].start
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

const WorkoutStart: React.FC<Props> = ({ goBack, noModal }) => {
  const navigation = useNavigation();
  const { badge } = useSignleBadgeContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<Date>();
  const { state, todayUnix } = useAuthContext();
  const badgeConfig = useUserStore(
    (state) => state.user?.recommendationConfig?.badgeConfig,
    shallow
  );

  const {
    workoutStartOfBadge,
    setWorkoutStartOfBadge,
    onSaveWorkoutStartOfBadge,
  } = useWorkoutStartOfBadge(badge?.id);

  const onNav = () => {
    if (goBack) {
      navigation.goBack();
    } else {
      if (badge?.liveBadge) {
        navigation.navigate("Workout", { badgeId: badge.id });
      } else if (badge) {
        navigation.navigate("WorkoutOnboardingScreen", { badgeId: badge.id });
      }
    }
  };

  const onSave = async (val: Date) => {
    if (state.uid) {
      setLoading(true);
      setWorkoutStartOfBadge(val);
      await onSaveWorkoutStartOfBadge(val);

      await makeGeneratorCall(state.uid, "workout", true, true, badge?.id);
      onNav();
      setLoading(false);
      setVisible(undefined);
    }
  };

  const onNext = async (val: Date) => {
    const editing = hasDateChanged(val, getSavedDate(badgeConfig, badge?.id));

    if (editing && !noModal) {
      setLoading(true);
      setTimeout(() => {
        setVisible(val);
        setLoading(false);
      }, 500);
    } else if (editing && noModal) {
      await onSave(val);
    } else {
      onNav();
    }
  };

  return (
    <View className="flex-1 bg-[#232136]">
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4"
      >
        <Text
          className="text-2xl iphoneX:text-3xl text-white "
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Select your date of {"\n"}starting your program
        </Text>
        <Text
          className="text-base text-white py-4"
          style={{ fontFamily: "Nunito-Light" }}
        >
          {badge?.liveBadge
            ? "If you would like to start in future. Note, this will not extend your membership."
            : `This will help us create a day wise workout\nplan for you. You can change it anytime.`}
        </Text>

        <View className="h-16 aspect-square" />
        {visible ? null : loading ? (
          <View className="flex items-center justify-center">
            <Loading width="w-12" height="h-12" />
          </View>
        ) : (
          <DatePicker
            minimumDate={new Date(todayUnix)}
            // minimumDate={undefined}
            value={workoutStartOfBadge}
            onChange={onNext}
          />
        )}
      </ScrollView>

      {loading || visible ? null : (
        <View className="p-4">
          <StartButton
            title={"Next"}
            bgColor="bg-[#fff]"
            textColor="text-[#5D588C] "
            roundedStr="rounded-full"
            textStyle="py-4 text-center text-base rounded-full"
            fontFamily="Nunito-Bold"
            onPress={() => onNext(workoutStartOfBadge)}
          />
        </View>
      )}
      {visible ? (
        <WarningModal
          onNext={() => onSave(visible)}
          visible={!!visible}
          onClose={() => setVisible(undefined)}
          heading="Are you sure you want to change the start date?"
          subtitle="Your program will start fresh from this date"
          loading={loading}
          ctaProceed="Yes, Change date"
          ctaCancel="Cancel"
        />
      ) : null}
    </View>
  );
};

export default WorkoutStart;
