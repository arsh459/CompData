import {
  Achiever,
  Award,
  achieverProgressItem,
} from "@models/Awards/interface";
import { FlashList } from "@shopify/flash-list";
import { View, Text } from "react-native";
import { arrayRange } from "./hook/utils";
import SvgIcons from "@components/SvgIcons";
import MediaTile from "@components/MediaCard/MediaTile";
import { MutableRefObject } from "react";

interface Props {
  achiever: Achiever;
  award: Award;
  dayRef: MutableRefObject<number>;
}

const StreakCompV2: React.FC<Props> = ({ achiever, award, dayRef }) => {
  const renderAchieverProgressItem = (
    target: achieverProgressItem,
    index: number
  ) => (
    <View className="flex justify-center items-center ">
      <Text
        className="text-white/60 text-xs"
        style={{ fontFamily: "Nunito-Regular" }}
      >
        {target.label}
      </Text>
      <View
        className="w-6 aspect-square rounded-full mt-4"
        style={{ backgroundColor: target.isBadge ? undefined : "#343150" }}
      >
        {target.isBadge ? (
          <MediaTile
            media={target.tickStatus === "HIT" ? award.img : award.lockedImg}
            fluid={true}
          />
        ) : target.tickStatus === "HIT" ? (
          <SvgIcons iconType="tick" color={award.themeColor} />
        ) : target.tickStatus === "MISS" ? (
          <View className="p-1.5 w-full h-full">
            <SvgIcons iconType="closeIcon" color={"#fff"} />
          </View>
        ) : null}
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: number }) => {
    const start = item * (achiever.stepSize || 0);
    const end = start + (achiever.stepSize || 0);

    console.log("item", item, arrayRange(start, end, 1), dayRef?.current);

    return (
      <View className="border border-white/30 rounded-2xl flex  flex-row p-4 ">
        {arrayRange(start, end, 1).map((each, index) => {
          const targetNum = each + 1;
          const target =
            achiever.totalCount &&
            targetNum <= achiever.totalCount &&
            achiever.progress &&
            achiever.progress[`${targetNum}`]
              ? achiever.progress[`${targetNum}`]
              : ({
                  label: "-", // `${targetNum}`,
                  container: targetNum,
                  tickStatus: "PENDING",
                  isBadge: targetNum === achiever.totalCount,
                } as achieverProgressItem);

          // console.log("target", achiever.totalCount);

          dayRef.current =
            target.tickStatus === "HIT" ? dayRef?.current + 1 : 0;

          //   if()
          return (
            <View
              key={`stepItem-${each + 1}`}
              className={index !== 0 ? "ml-4" : ""}
            >
              {renderAchieverProgressItem(target, index)}
            </View>
          );
        })}
      </View>
    );
  };

  const keyExtractor = (item: number) => `step-${item}`;

  // console.log("arrayRange(0, achiever.steps || 1, 1)", achiever.steps);

  return (
    <View className="w-full flex-[0.7] ">
      <Text
        className="w-3/4 text-center text-white/90 text-lg py-4 mx-auto"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {achiever.mainLabel}
      </Text>

      <FlashList
        data={arrayRange(0, achiever.steps || 1, 1)}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={100}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        ListHeaderComponent={<View className="w-8 aspect-square" />}
        ListFooterComponent={<View className="w-8 aspect-square" />}
        ItemSeparatorComponent={() => <View className="w-4 aspect-square" />}
      />
    </View>
  );
};

export default StreakCompV2;