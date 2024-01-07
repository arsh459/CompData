import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Achiever, Award } from "@models/Awards/interface";
import Confetti from "@components/Confetti";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { updateUserUnseenAwards } from "./hook/utils";
import { RootStackParamList } from "@routes/MainStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import AwardMedia from "./AwardMedia";
import clsx from "clsx";
import Header from "@modules/Header";
import StreakComp from "./StreakComp";

const { width, height } = Dimensions.get("window");

interface Props {
  achiever: Achiever;
  award: Award;
}

const CongratulationMainV2: React.FC<Props> = ({ achiever, award }) => {
  const [renderItemHeight, setRenderItemHeight] = useState<number>();

  const { uid } = useUserStore((state) => {
    return {
      uid: state.user?.uid,
    };
  }, shallow);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  //   const { awards, wonAwardsData, awardsAnimated, setAwardsAnimatedTrue } =
  //     useUnseenAwards(idArr);

  const gotoHome = async () => {
    await updateUserUnseenAwards(uid);
    navigation.goBack();
  };

  const noStreak =
    !achiever.steps ||
    achiever.steps === -1 ||
    !achiever.stepSize ||
    achiever.stepSize === -1 ||
    (achiever.steps === 1 && achiever.stepSize === 1);

  // console.log("achiever.unlockOn", achiever.unlockOn, achiever.awardStatus);

  return (
    <View className="flex-1 bg-black relative z-0" style={{ width, height }}>
      <Header back={true} tone="dark" headerType="transparent" />
      <View
        style={{
          width,
          height,
          backgroundColor: `${award?.themeColor || "#000000"}1A`,
        }}
        className="flex justify-center items-center"
      >
        <View
          style={{
            width,
            height: renderItemHeight,
          }}
          className="flex justify-center items-center"
        >
          <AwardMedia
            media={achiever.unlockOn ? award?.img : award.lockedImg}
            themeColor={achiever.unlockOn ? award?.themeColor : undefined}
            size={noStreak ? "large" : undefined}
          />

          <Text
            className={clsx(
              "w-3/4 text-center py-4",
              noStreak ? "text-2xl" : "text-xl"
            )}
            style={{
              color: award.themeColor || "#FFFFFF",
              fontFamily: "Nunito-Bold",
            }}
          >
            {achiever?.title}
          </Text>

          <Text
            className={clsx(
              "w-3/4 text-center text-white/70",
              noStreak ? "text-lg" : "text-sm"
            )}
            style={{
              fontFamily: "Nunito-Light",
            }}
          >
            {achiever.subtitle}
          </Text>

          {noStreak ? (
            <View className="w-full aspect-[4/1]" />
          ) : (
            <StreakComp achiever={achiever} award={award} />
          )}

          {achiever.unlockOn ? (
            <Confetti
              customColor={award?.themeColor ? [award.themeColor] : undefined}
              callback={() => {}}
            />
          ) : null}
        </View>
      </View>
      <View
        onLayout={(e) =>
          setRenderItemHeight(height - e.nativeEvent.layout.height)
        }
        className="absolute left-0 right-0 bottom-0 p-4"
      >
        <TouchableOpacity
          onPress={gotoHome}
          className="border border-[#7E62F0] rounded-xl py-3"
        >
          <Text
            className="text-base text-center text-[#7E62F0]"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CongratulationMainV2;
