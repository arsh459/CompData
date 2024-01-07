import useDietPlanStage from "@modules/Nutrition/store/useDietPlanStage";
import { shallow } from "zustand/shallow";
import { View, Text } from "react-native";
import NotSubScriberComp from "./NotSubScribedComp";
import StageCtaCard from "./StageCtaCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";

interface Props {}
const NutritionStageComp: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const onNext = () => {
    navigation.navigate("DietFormInitiatorScreen");
    weEventTrack("Nutrition_DietFormInitiatorScreen", {});
  };
  const onPro = () => {
    weEventTrack("nutrition_clickPro", {});
    navigation.navigate("ProScreen", { planType: "pro" });
  };
  const { planStage } = useDietPlanStage(
    (state) => ({
      planStage: state.planStage,
    }),
    shallow
  );

  const { badge } = useSignleBadgeContext();
  const isDieticianBadge = badge?.creatorIds?.length ? true : false;
  const { bottom } = useSafeAreaInsets();

  return (
    <View className="">
      {planStage === "notSubscribed" && (
        <View className="" style={{ paddingBottom: bottom + 28 }}>
          <View className="px-6">
            <Text
              className="text-white/90 text-base leading-none"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              Create Plan
            </Text>
          </View>
          <StageCtaCard
            title="Want to join our PCOS Treatment Plan?"
            imageUri="https://ik.imagekit.io/socialboat/1%202079505805_kvHJp3PoZ.png?updatedAt=1701329720276"
            onNext={onPro}
          />
        </View>
      )}
      {!isDieticianBadge && <NotSubScriberComp />}
      {planStage === "subscribedFormNotFilled" && (
        <StageCtaCard
          title="Help us with a few questions For your diet plan"
          imageUri="https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Frame%201000001381_WJj-SlPiE.png?updatedAt=1701263570497"
          onNext={onNext}
        />
      )}
    </View>
  );
};

export default NutritionStageComp;
