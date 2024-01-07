import { ScrollView, View } from "react-native";
import { useState } from "react";
import CourseShortInfo from "./Components/CourseShortInfo";
import CreatedByCoach from "./Components/CreatedByCoach";
import WhatWillWeTeach from "./Components/WhatWillWeTeach";
import BadgesYouCanWin from "./Components/BadgesYouCanWin";
import EquipmentRequired from "./Components/EquipmentRequired";
import AboutMyCoaches from "@modules/HomeScreen/AboutMyCoaches";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useNavigation } from "@react-navigation/native";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import {
  pinNutrition,
  pinWorkout,
  startAndPinNutrition,
  startAndPinWorkout,
  startWithoutPin,
} from "@models/User/updateUtils";
import DosDonts from "./Components/DosDonts";
import { getButtonStatus } from "./utils";
import WarningModal from "@modules/CourseMain/Components/WarningModal";
import MediaCard from "@components/MediaCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  type: "nutrition" | "workout";
}

const CourseMain: React.FC<Props> = ({ type }) => {
  const { bottom } = useSafeAreaInsets();
  const { badge } = useSignleBadgeContext();
  const navigation = useNavigation();
  const [modalText, setModalText] = useState<string>();

  const {
    userId,
    start,
    nutritionStart,
    badgeConfig,
    pinnedBadgeId,
    pinnedDietId,
  } = useUserStore((state) => {
    return {
      userId: state.user?.uid,
      start: state.user?.recommendationConfig?.start,
      nutritionStart: state.user?.recommendationConfig?.nutritionStart,
      badgeConfig: state.user?.recommendationConfig?.badgeConfig,
      pinnedBadgeId: state.user?.badgeId,
      pinnedDietId: state.user?.nutritionBadgeId,
    };
  }, shallow);

  const { buttonText, action } = getButtonStatus(
    type,
    badge?.id,
    start,
    nutritionStart,
    badgeConfig,
    pinnedBadgeId,
    pinnedDietId
  );

  const onProceed = async () => {
    if (userId && badge?.id) {
      await startAndPinWorkout(userId, badge.id);
      setModalText("");

      setTimeout(() => {
        navigation.navigate("WorkoutStartScreen", {
          badgeId: badge.id,
          noModal: true,
        });
      }, 200);
    }
  };

  const onViewPlan = () => {
    if (badge) {
      weEventTrack("course_viewPlan", {});
      navigation.navigate("ViewWorkout", { badgeId: badge.id });
    }
  };

  const onStartPlan = async () => {
    weEventTrack("course_startPlan", {});

    if (badge?.id && userId && type === "workout") {
      if (action === "GO_TO_PLAN") {
        userId && pinWorkout(userId, badge.id);
        navigation.navigate("Workout", { badgeId: badge.id });
      } else if (!start) {
        await startAndPinWorkout(userId, badge.id);
        navigation.navigate("WorkoutStartScreen", {
          badgeId: badge.id,
          noModal: true,
        });
      } else if (
        action === "START_PLAN_AND_PIN" ||
        action === "CHANGE_PLAN" ||
        action === "START_PLAN"
      ) {
        setModalText("Are you sure you want to change your plan?");
      }
    } else if (badge?.id && userId && type === "nutrition") {
      if (action === "GO_TO_PLAN") {
        userId && pinNutrition(userId, badge.id);
        navigation.navigate("NutritionScreen", { badgeId: badge.id });
      } else if (action === "START_PLAN") {
        await startWithoutPin(userId, badge.id);
        navigation.navigate("NutritionScreen", { badgeId: badge.id });
      } else if (action === "START_PLAN_AND_PIN") {
        await startAndPinNutrition(userId, badge.id);
        navigation.navigate("NutritionScreen", { badgeId: badge.id });
      } else if (action === "CHANGE_PLAN") {
        navigation.navigate("NutritionScreen", { badgeId: badge.id });
      }
    }
  };

  // console.log("modalText", modalText);

  const { user } = useUserV2(
    badge?.creatorIds?.length ? badge.creatorIds[0].trim() : ""
  );

  return (
    <View className="bg-[#13121E] flex-1">
      <ScrollView className="flex-1">
        <View className="w-full aspect-[375/201]">
          <MediaCard
            fluid={true}
            thumbnail={badge?.bgImageFemale}
            playbackId={badge?.playbackId}
            autoplay={true}
            // evpoAv={false}
            forcePause={modalText ? true : false}
            media={badge?.badgeBGImage}
          />
        </View>

        <CourseShortInfo type={type} badge={badge} />

        <CreatedByCoach
          media={user?.profileImage}
          primaryText={badge?.description}
          secondaryText={badge?.courseGoal}
          createdByString={`Created by ${
            user?.name ? user.name : type === "workout" ? "Coach" : "Dietician"
          }`}
        />

        {type === "nutrition" ? null : (
          <EquipmentRequired
            equipmentString={badge?.equipmentNeeded?.join(" , ")}
          />
        )}

        <WhatWillWeTeach whatWeTeach={badge?.weTeach} />
        <BadgesYouCanWin />
        <DosDonts dos={badge?.dos} donts={badge?.donts} />
        <AboutMyCoaches />
      </ScrollView>

      {!buttonText ? null : (
        <View
          className="flex flex-row justify-between p-4"
          style={{ paddingBottom: bottom || 16 }}
        >
          {type === "workout" ? (
            <View className="w-[48%]">
              <StartButton
                title="View Workouts"
                bgColor="bg-transparent border-2 border-[#6D55D1]"
                textColor="text-[#6D55D1]"
                roundedStr="rounded-xl"
                fontFamily="BaiJamjuree-Bold"
                textStyle="py-2.5 text-center text-base iphoneX:text-base font-bold rounded-md"
                onPress={onViewPlan}
              />
            </View>
          ) : null}
          <View className={type === "workout" ? "w-[48%]" : "w-full"}>
            <StartButton
              title={buttonText}
              bgColor="bg-[#6D55D1]"
              textColor="text-white"
              roundedStr="rounded-xl"
              fontFamily="BaiJamjuree-Bold"
              textStyle="py-3 text-center text-base iphoneX:text-base font-bold rounded-md"
              onPress={onStartPlan}
            />
          </View>
        </View>
      )}
      {modalText ? (
        <WarningModal
          visible={modalText ? true : false}
          onClose={() => setModalText(undefined)}
          heading={modalText}
          subtitle="This plan will be added to your home screen"
          onNext={onProceed}
          loading={false}
        />
      ) : null}
    </View>
  );
};

export default CourseMain;
