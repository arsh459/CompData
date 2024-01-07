import { View, Text, FlatList, useWindowDimensions } from "react-native";
import ImageWithURL from "@components/ImageWithURL";
import {
  awardLocked,
  fpIconBlueBadge,
  greenBgRightTic,
  rewardMissed,
} from "@constants/imageKitURL";
import clsx from "clsx";
import { dailyReward, pointsArray } from "@models/Rounds/interface";
import { startOfDay } from "date-fns";
import { updateDailyRewards } from "./utils";
import MarqueeButton from "@components/MarqueeButton";
import { LinearGradient } from "expo-linear-gradient";
import { rewardData } from "@hooks/rounds/useDailyRewards";
import { useNavigation } from "@react-navigation/native";
export interface claimCard {
  id: string;
  day: number;
  status: "claimed" | "unclaimed";
  fp: number;
}
interface Props {
  data?: pointsArray[];
  dailyReward?: dailyReward;
  dailyRewardConfigId?: string;
  uid?: string;
  rewardData?: rewardData;
}
const spacing = 16;
const separatorHeight = spacing;

const RewardCard: React.FC<{
  cardWidth: number;
  item: pointsArray;
  isToday: boolean;
  isClaimed?: boolean;
  isLocked?: boolean;
}> = ({ cardWidth, item, isToday, isClaimed, isLocked }) => {
  // console.log(isLocked, isToday);
  const isMissed = !isToday && !isClaimed && !isLocked;
  const uri = isClaimed
    ? greenBgRightTic
    : isMissed
    ? rewardMissed
    : awardLocked;
  return (
    <View
      className={clsx(
        isToday
          ? "bg-[#FFBB35] aspect-[89/111] border border-white/50"
          : isMissed
          ? "# bg-[#E6DCEF] aspect-[85/105]"
          : "bg-[#FFFFFF4A] aspect-[85/105]",
        "   flex justify-between items-center rounded-3xl py-2"
      )}
      style={{ width: isToday ? cardWidth + 5 : cardWidth }}
    >
      <Text
        className={clsx(
          isToday || isMissed ? "text-[#4223BF]" : "text-white",
          "text-center  text-xs"
        )}
        style={{ fontFamily: isToday ? "Nunito-ExtraBold" : "Nunito-SemiBold" }}
      >
        Day {item.day + 1}
      </Text>
      <View className="relative z-0" style={{ width: cardWidth * 0.4 }}>
        <ImageWithURL
          source={{ uri: fpIconBlueBadge }}
          className="w-full aspect-square"
        />
        <View className="w-4 rounded-full aspect-square absolute -right-1 bottom-0">
          {isToday ? null : (
            <ImageWithURL source={{ uri }} className="w-full h-full " />
          )}
        </View>
      </View>
      <Text
        className={clsx(
          isToday ? "text-[#4223BF]" : "text-white",
          "text-center  text-xs"
        )}
        style={{ fontFamily: isToday ? "Nunito-ExtraBold" : "Nunito-SemiBold" }}
      >
        {isClaimed ? "Claimed" : isMissed ? "" : `${item.fp}FP`}
      </Text>
      {isMissed ? (
        <Text
          className={clsx(
            isMissed ? "text-[#4223BF]" : "text-white",
            "text-center  text-xs"
          )}
          style={{
            fontFamily: isToday ? "Nunito-ExtraBold" : "Nunito-SemiBold",
          }}
        >
          Missed
        </Text>
      ) : null}
    </View>
  );
};

const ClamCardList: React.FC<Props> = ({
  data,
  dailyReward,
  dailyRewardConfigId,
  uid,
  rewardData,
}) => {
  const { width } = useWindowDimensions();
  const cardWidth = (width - spacing * 6) / 3;
  const startOfDayValue = startOfDay(new Date()).getTime();
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: pointsArray }) => {
    // const val =
    //   dailyReward && dailyReward?.date && item.fp / dailyReward.fp === 1;

    const isToday = dailyReward
      ? item.day === dailyReward?.day + (rewardData?.dayDiff || 0)
      : item.day === 0;
    const isClaimed = dailyReward && item.day <= dailyReward?.day;
    const isFuture = dailyReward
      ? item.day > dailyReward?.day + (rewardData?.dayDiff || 0)
      : item.day > 0;

    return (
      <RewardCard
        cardWidth={cardWidth}
        item={item}
        isToday={isToday}
        isClaimed={isClaimed}
        isLocked={isFuture}
      />
    );
  };
  const onClaimReward = async () => {
    console.log("rewardData", rewardData);
    if (rewardData) {
      await updateDailyRewards(
        uid,
        startOfDayValue,
        dailyRewardConfigId,
        rewardData?.dayToUpdate,
        rewardData?.fpToUpdate
      );
    }
    navigation.goBack();
  };

  const keyExtractor = (item: pointsArray, index: number) =>
    `${index}_${item.day}_${item.fp}`;
  const missed = rewardData?.missed;

  return (
    <>
      <LinearGradient
        colors={["#5B25A9", "#9C59CE"]}
        className=" rounded-b-2xl h-2/3"
      >
        <View className="flex-1 rounded-b-2xl p-4 border-4 border-[#FFBB35]">
          {data?.length ? (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              numColumns={3}
              ItemSeparatorComponent={() => (
                <View style={{ height: separatorHeight }} />
              )}
              columnWrapperStyle={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            />
          ) : null}
        </View>
      </LinearGradient>
      {missed ? (
        <Text
          className="text-white w-3/4 mx-auto pt-2 text-lg"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Well you <Text className=" text-[#ff6069]">missed</Text>{" "}
          {rewardData?.dayDiff && rewardData.dayDiff > 1
            ? `${rewardData.dayDiff} Days`
            : `${rewardData?.dayDiff}Day`}
          . Don’t Worry start over again
        </Text>
      ) : null}
      <View className="absolute bottom-4 left-4 right-4">
        {rewardData?.todayClaimed ? (
          <Text
            className="text-white text-sm text-center pb-5"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Come back tomorrow to claim{" "}
          </Text>
        ) : (
          <MarqueeButton
            onPress={onClaimReward}
            text={missed ? "Restart Daily Reward" : "Claim Reward"}
            containerStyleTw={clsx(
              missed ? "bg-[#5B25A9]" : "bg-[#ffbb35]",
              " w-full  py-3.5"
            )}
            textStyleTw={clsx(
              missed ? "text-white text-lg" : "text-[#232136] text-lg"
            )}
            iconUri={missed ? "" : fpIconBlueBadge}
          />
        )}
      </View>
    </>
  );
};

export default ClamCardList;
