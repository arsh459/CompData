import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { BodyTypeData } from "@constants/Avatar/BodyTypeData";
import {
  defailt_bodyType,
  getFitnessGoal,
} from "@modules/SubscribedMain/utils";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { useTodaysGoal } from "@providers/streak/hooks/useTodaysGoal";
import HexaPercent from "@components/HexaPercent";
import ImageWithURL from "@components/ImageWithURL";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import AppointmentSection from "./AppointmentSection";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  showOnlyFitpoint?: boolean;
  hideAppointment?: boolean;
}
const TodayFp: React.FC<Props> = ({ showOnlyFitpoint, hideAppointment }) => {
  const { illustration, dailyFPTarget } = useUserStore((state) => {
    const gender = state.user?.gender === "male" ? "male" : "female";
    const fitnessGoal = getFitnessGoal(state.user?.fitnessGoal);
    const bodyType =
      fitnessGoal === "lose_weight" && state.user?.desiredBodyType
        ? state.user?.desiredBodyType
        : defailt_bodyType;
    return {
      illustration: BodyTypeData[bodyType].image[gender],
      dailyFPTarget: state.user?.dailyFPTarget,
    };
  }, shallow);

  const { todaysObj } = useTodaysGoal();

  const { width: WIDTH } = useWindowDimensions();
  const size = WIDTH * 0.26;

  const navigation = useNavigation();

  const onClickChangeBodyType = () => {
    weEventTrack("home_clickTodayTarget", {});
    navigation.navigate("TodayFpScreen");
  };

  return (
    <View className="bg-[#C5FF49] rounded-2xl">
      <View className="bg-[#232136] rounded-2xl">
        <TouchableOpacity
          onPress={onClickChangeBodyType}
          className="relative overflow-hidden rounded-2xl border border-white/50"
        >
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/Frame_1765_QMxOrb8vE.png?updatedAt=1686821475103",
            }}
            className="w-full aspect-[1.8]"
          />
          {showOnlyFitpoint ? null : (
            <View className="absolute top-4 right-4 w-6 aspect-square bg-black/10 rounded-full p-1.5">
              <ArrowIcon direction="right" color="#FFFFFF" />
            </View>
          )}

          {showOnlyFitpoint ? null : (
            <View className="absolute left-2/3 top-4  -bottom-14 right-4 flex justify-end items-center">
              <ImageWithURL
                source={{ uri: illustration }}
                className="w-[110%] aspect-[73/149]"
              />
            </View>
          )}

          <View className="absolute h-full flex flex-row justify-between p-4 pt-4">
            <View className="flex justify-start items-start">
              {showOnlyFitpoint ? (
                <View />
              ) : (
                <View className=" pl-1">
                  <Text
                    className="text-xl text-left text-white"
                    style={{ fontFamily: "Nunito-SemiBold" }}
                  >
                    Today's Fitpoints
                  </Text>
                </View>
              )}

              <View className="flex pt-6 items-center justify-center">
                {dailyFPTarget ? (
                  <HexaPercent
                    width={size}
                    height={size}
                    base={dailyFPTarget}
                    percent={
                      (todaysObj?.achievedFP ? todaysObj.achievedFP : 0) /
                      (dailyFPTarget || 35)
                    }
                    activeColor={"#fff"}
                    inActiveColor={"#00000033"}
                    hideWaterMark={true}
                  >
                    <View className="w-full h-full flex justify-center items-center ">
                      <Text
                        className="text-base iphoneX:text-lg text-white"
                        style={{ fontFamily: "Nunito-Bold" }}
                      >
                        {`${todaysObj?.achievedFP ? todaysObj.achievedFP : 0}/${
                          dailyFPTarget || 35
                        }`}
                      </Text>
                      <Text
                        className="text-[10px] iphoneX:text-xs text-white"
                        style={{ fontFamily: "Nunito-Regular" }}
                      >
                        Fitpoints
                      </Text>
                    </View>
                  </HexaPercent>
                ) : (
                  <View className="w-full h-full" />
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {hideAppointment ? null : <AppointmentSection />}
    </View>
  );
};

export default TodayFp;
