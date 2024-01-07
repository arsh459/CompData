import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { Achiever } from "@models/Awards/interface";
import { useUnseenAwards } from "./hook/useUnseenAwards";
import Confetti from "@components/Confetti";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { updateUserUnseenAwards } from "./hook/utils";
import { RootStackParamList } from "@routes/MainStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import AwardMedia from "./AwardMedia";
import Loading from "@components/loading/Loading";
import clsx from "clsx";
import Header from "@modules/Header";
import StreakComp from "./StreakComp";

const { width, height } = Dimensions.get("window");

const CongratulationMain: React.FC<{ idArr: string[] }> = ({ idArr }) => {
  const [renderItemHeight, setRenderItemHeight] = useState<number>();

  const { uid, name } = useUserStore((state) => {
    return {
      uid: state.user?.uid,
      name: state.user?.name,
    };
  }, shallow);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { awards, wonAwardsData, awardsAnimated, setAwardsAnimatedTrue } =
    useUnseenAwards(idArr);

  const gotoHome = async () => {
    await updateUserUnseenAwards(uid);
    navigation.goBack();
  };

  // const viewReport = async (id: string) => {
  //   await updateUserUnseenAwards(uid);
  //   navigation.navigate("AwardReport", { achivementId: id });
  // };

  const renderItem = ({ item, index }: { item: Achiever; index: number }) => {
    const award = awards[item.awardId];
    const noStreak =
      !item.steps ||
      item.steps === -1 ||
      !item.stepSize ||
      item.stepSize === -1;

    // console.log(wonAwardsData[0].progress, noStreak);

    return (
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
            media={item.unlockOn ? award?.img : award.lockedImg}
            themeColor={item.unlockOn ? award?.themeColor : undefined}
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
            {award?.name}
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
            Nice work {name || "User"}, You achived {award?.name}!
          </Text>

          {noStreak ? (
            <View className="w-full aspect-[4/1]" />
          ) : (
            <StreakComp achiever={item} award={award} />
          )}

          {selectedIndex === index &&
          typeof awardsAnimated[item.id] === "boolean" &&
          !awardsAnimated[item.id] &&
          item.unlockOn ? (
            <Confetti
              customColor={award?.themeColor ? [award.themeColor] : undefined}
              callback={() => setAwardsAnimatedTrue(item.id)}
            />
          ) : null}
        </View>
      </View>
    );
  };

  const keyExtractor = (item: Achiever) => item.id;

  const getItemLayout = (_: any, index: number) => {
    return {
      length: width,
      offset: width * index,
      index,
    };
  };

  return (
    <View className="flex-1 bg-black relative z-0" style={{ width, height }}>
      <Header back={true} tone="dark" headerType="transparent" />

      {renderItemHeight ? (
        <FlatList
          data={wonAwardsData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          horizontal={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          onMomentumScrollEnd={(e) =>
            setSelectedIndex(Math.ceil(e.nativeEvent.contentOffset.x / width))
          }
        />
      ) : (
        <View>
          <Loading />
        </View>
      )}

      <View
        onLayout={(e) =>
          setRenderItemHeight(height - e.nativeEvent.layout.height)
        }
        className="absolute left-0 right-0 bottom-0 p-4"
      >
        {wonAwardsData.length > 1 ? (
          <Text className="text-base text-white/80 text-center pb-4">
            {"<<<   Swipe   >>>"}
          </Text>
        ) : null}
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
        {/* {wonAwardsData[selectedIndex] &&
        wonAwardsData[selectedIndex].containsReport ? (
          <TouchableOpacity
            onPress={() => viewReport(wonAwardsData[selectedIndex].id || "")}
            className="bg-[#7E62F0] rounded-xl py-3 mt-4"
          >
            <Text
              className="text-base text-center text-white"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              View My Report
            </Text>
          </TouchableOpacity>
        ) : null} */}
      </View>
    </View>
  );
};

export default CongratulationMain;
