import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";

import {
  rightArrowBowIconPurpleFrame14,
  rightArrowIconBonusList,
} from "@constants/imageKitURL";
import clsx from "clsx";
import { getImageUri } from "./utils";
import { RouteKeys } from "@routes/MainStack";
import { useNavigation } from "@react-navigation/native";
import {
  handleNutritionClick,
  handleWorkoutClick,
} from "@modules/HomeScreen/MyPlanV2/utils";
import { useAppointmentCheck } from "@hooks/appointment/useScheduledAppointment";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useAppointmentPermission } from "@hooks/appointment/useAppointmentPermission";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { getStartTime } from "@modules/Nutrition/V2/DaySelector/provider/utils";
interface Props {
  iconImg: string;
  heading?: string;
  mainText?: string;
  headingColor?: string;
  highlightFirstItem?: boolean;
  showNoTick?: boolean;
  navTo?: RouteKeys;
}
const FeatureListCardV3: React.FC<Props> = ({
  heading,
  iconImg,
  mainText,
  headingColor,
  highlightFirstItem,
  showNoTick,
  navTo,
}) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const {
    badgeIdEnrolled,
    badgeId,
    nutritionBadgeIdEnrolled,
    nutritionBadgeId,
    start,
    nutritionStart,
    badgeConfig,
  } = useUserStore((state) => {
    return {
      badgeIdEnrolled: state.user?.badgeIdEnrolled,
      badgeId: state.user?.badgeId,
      nutritionBadgeIdEnrolled: state.user?.nutritionBadgeIdEnrolled,
      nutritionBadgeId: state.user?.nutritionBadgeId,
      start: state.user?.recommendationConfig?.start,
      nutritionStart: state.user?.recommendationConfig?.nutritionStart,
      badgeConfig: state.user?.recommendationConfig?.badgeConfig,
    };
  }, shallow);

  const uriImg = getImageUri(
    highlightFirstItem,
    showNoTick,
    rightArrowIconBonusList,
    rightArrowBowIconPurpleFrame14,
    rightArrowIconBonusList
  );

  const { docStatus } = useAppointmentPermission();
  const { appointment } = useAppointmentCheck();

  // console.log("docStatus", docStatus);

  const onPress = () => {
    weEventTrack("proSection_clickItem", { heading: heading ? heading : "" });
    if (navTo === "Workout") {
      handleWorkoutClick(
        navigation,
        badgeIdEnrolled,
        badgeId,
        getStartTime(badgeConfig, badgeId, "workout", start, nutritionStart)
      );
    } else if (navTo === "NutritionScreen") {
      handleNutritionClick(
        navigation,
        nutritionBadgeIdEnrolled,
        nutritionBadgeId,
        getStartTime(
          badgeConfig,
          nutritionBadgeId,
          "nutrition",
          start,
          nutritionStart
        )
      );
    } else if (navTo === "DoctorConsultation") {
      if (docStatus === "CONTACT_US" || docStatus === "UNKNOWN") {
        navigation.navigate("DoctorConsultation");
      } else if (appointment) {
        navigation.navigate("AppointmentsScreen", {});
      } else {
        navigation.navigate("MedicalProfileScreen");
      }
    } else {
      // take to checkin section
      navigation.navigate("SheduleAmaGatewayScreen");
    }
  };

  return (
    <View className="flex-1 pb-2">
      <Pressable
        onPress={onPress}
        className={clsx(
          "flex flex-row  px-2.5 mx-4   items-center ",
          "rounded-[20px]     bg-[#343150]"
        )}
      >
        <View style={{ width: width * 0.112 }} className="">
          <Image
            source={{
              uri: iconImg,
            }}
            className="w-full aspect-square rounded-full"
          />
        </View>
        <View className="flex-1  p-2.5  ">
          {heading ? (
            <Text
              className={clsx(
                "text-xs iphoneX:text-sm ",
                headingColor ? headingColor : "text-white"
              )}
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              {heading}
            </Text>
          ) : null}
          {mainText ? (
            <Text
              className="text-xs text-[#FFFFFF]/70"
              style={{ fontFamily: "Nunito-Light" }}
            >
              {mainText}
            </Text>
          ) : null}
        </View>
        <View className=" ">
          <Image
            source={{ uri: uriImg }}
            className={clsx(
              "w-5 iphoneX:w-7 aspect-square",
              highlightFirstItem && "w-6 iphoneX:8"
            )}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default FeatureListCardV3;
