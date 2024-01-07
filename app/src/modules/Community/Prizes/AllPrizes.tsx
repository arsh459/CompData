import MediaTile from "@components/MediaCard/MediaTile";
import { SBPrize } from "@models/Prizes/Prizes";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Text, View } from "react-native";
import PrizesModal from "./PrizesModal";

interface Props {
  prizes: SBPrize[];
  badgeName: string;
  isGoalWidget?: boolean;
}

const AllPrizes: React.FC<Props> = ({ prizes, badgeName, isGoalWidget }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [prizeWidth, setPrizeWidth] = useState<number>(0);

  return (
    <>
      <LinearGradient
        colors={["#242424", "#1A1A1A"]}
        className={clsx(
          isGoalWidget ? "p-1 iphoneX:p-2" : "p-2 iphoneX:p-4",
          "min-h-[80px] iphoneX:min-h-[100px] flex flex-row justify-evenly items-center rounded-xl overflow-hidden relative z-0"
        )}
        onLayout={(e) =>
          setPrizeWidth(e.nativeEvent.layout.width / prizes.length)
        }
      >
        {prizes.map((each, index) => (
          <View
            key={`${each.name}-${index}`}
            className={clsx(
              prizes.length === 1
                ? "flex flex-row items-center justify-around"
                : ""
            )}
          >
            <View
              className="max-w-[100px] max-h-[100px]"
              style={{
                width: prizeWidth,
                height: prizeWidth,
              }}
            >
              <MediaTile media={each.media} fluid={true} />
            </View>
            {prizes.length === 1 ? (
              <View className="flex-1 ml-4 text-sm iphoneX:text-base">
                <Text className="text-white font-medium">{each.name}</Text>
                <Text className="text-gray-50">{each.description}</Text>
              </View>
            ) : null}
          </View>
        ))}
        {prizes.length > 1 ? (
          <LinearGradient
            colors={["#24242480", "#1A1A1A80"]}
            className="absolute left-0 right-0 top-0 bottom-0 z-10 flex backdrop-blur justify-center items-center"
          >
            <LinearGradient
              colors={["#6AA0D1", "#5FABC2"]}
              className="rounded-md"
            >
              <Text
                className={clsx(
                  "text-white",
                  isGoalWidget
                    ? "text-[10px] xs:text-xs iphoneX:text-sm px-2.5 py-1"
                    : "text-sm iphoneX:text-base px-4 py-2"
                )}
                onPress={() => setIsOpen(true)}
              >
                View All Rewards
              </Text>
            </LinearGradient>
          </LinearGradient>
        ) : null}
      </LinearGradient>
      <PrizesModal isOpen={isOpen} setIsOpen={setIsOpen} prizes={prizes} />
    </>
  );
};

export default AllPrizes;
