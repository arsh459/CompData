import { Text, TouchableOpacity, Image, View } from "react-native";
import Header from "@modules/Header";
import { infoBtnRing, settingDietIcon } from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useEffect } from "react";
import useDietPlanStage from "./store/useDietPlanStage";
import { shallow } from "zustand/shallow";
interface Props {
  showSetting: boolean;
}
const NutritionHeader: React.FC<Props> = ({ showSetting }) => {
  const { badge } = useSignleBadgeContext();
  const navigation = useNavigation();
  const isDeitician = badge?.creatorIds?.length ? true : false;

  const { setBadge } = useDietPlanStage(
    (state) => ({
      setBadge: state.setBadge,
    }),
    shallow
  );
  useEffect(() => {
    setBadge(badge);
  }, [badge]);
  return (
    <Header
      back={true}
      tone="dark"
      titleNode={
        <View className="flex flex-row items-center">
          <View className="flex flex-grow">
            <Text
              numberOfLines={2}
              className="text-white text-sm iphoneX:text-base mr-2"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {badge?.name ? `${badge.name}` : "My Nutrition Plan"}
            </Text>
          </View>
        </View>
      }
      optionNode={
        <>
          {badge && isDeitician ? (
            <TouchableOpacity
              className="pr-2"
              onPress={() => {
                navigation.navigate("CoursePageScreen", {
                  badgeId: badge?.id,
                  type: "nutrition",
                });
                weEventTrack("nutrition_clickIButton", {});
              }}
            >
              <Image
                source={{ uri: infoBtnRing }}
                className="w-5 aspect-square"
              />
            </TouchableOpacity>
          ) : null}

          {showSetting ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("NutritionSettingScreen");
              }}
            >
              <Image
                source={{ uri: settingDietIcon }}
                className="w-4 iphoneX:w-5 aspect-square"
              />
            </TouchableOpacity>
          ) : null}
        </>
      }
      gradientColors={["#FF9A02", "#F97C20"]}
    />
  );
};

export default NutritionHeader;
