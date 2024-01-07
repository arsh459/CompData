import Loading from "@components/loading/Loading";
import MediaTile from "@components/MediaCard/MediaTile";
import usePrizes from "@hooks/badges/usePrizes";
import { SBPrize } from "@models/Prizes/Prizes";
import BadgeSelector from "@modules/Community/Prizes/Badges/BadgeSelector";
import PrizesModal from "@modules/Community/Prizes/PrizesModal";
import { useGameContext } from "@providers/game/GameProvider";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

const BadgesContainer = () => {
  const { game } = useGameContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [prizesArr, setPrizesArr] = useState<SBPrize[][]>([]);
  const { badges, prizes, isFetched } = usePrizes(game?.id, undefined);
  const pinnedBadges = badges.filter((each) => each.pinned);

  useEffect(() => {
    const temp = [...prizes];
    const tempArr: SBPrize[][] = [];
    while (temp.length > 0) {
      tempArr.push(temp.splice(0, 2));
    }
    setPrizesArr(tempArr);
  }, [prizes]);

  return (
    <>
      <Text className="text-white text-xl iphoneX:text-3xl font-bold px-4 pt-10 iphoneX:pt-20 text-center">
        What you can win?
      </Text>

      <View className="mx-4 my-8 flex">
        {pinnedBadges.map((badge) => (
          <View
            key={badge.badgeId}
            className="flex flex-row items-center border border-[#CDCDCD] rounded-2xl p-2.5 iphoneX:p-4"
          >
            <View className="w-20 h-20 mr-2.5 iphoneX:mr-4">
              <BadgeSelector badgeType={badge.badgeId} />
            </View>
            <View className="flex-1 iphoneX:text-xl">
              <Text className="text-white font-semibold">{badge.name}</Text>
              <Text className="text-white">{badge.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text className="text-white text-xl iphoneX:text-3xl font-bold px-4 pb-4 text-center">
        You can also win
      </Text>

      {isFetched ? (
        <View className="bg-[#1F1F1F]/25 my-4 py-2 iphoneX:py-4 border-y border-[#949494]">
          <ScrollView horizontal={true}>
            {prizesArr.map((each, index) => (
              <View
                key={`prize-array-${index}`}
                className={clsx(
                  "flex justify-evenly",
                  index === 0 && "pb-2 iphoneX:pb-4"
                )}
              >
                {each.map((item, ind) => (
                  <View
                    key={`${item.name}-${ind}`}
                    className={clsx(
                      "flex py-2 justify-around items-center px-2 iphoneX:px-4"
                    )}
                  >
                    <View className="w-32" style={{ aspectRatio: 1.5 }}>
                      <MediaTile media={item.media} fluid={true} />
                    </View>
                    <Text className="text-white text-[10px] break-all text-center iphoneX:text-sm pt-2 line-clamp-1">
                      {item.name}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
          <View className="border-t border-[#949494] my-2 iphoneX:my-4" />
          <View className="flex justify-center items-center">
            <Text
              className="text-[#F8F8F8] text-sm iphoneX:text-lg"
              onPress={() => setIsOpen(true)}
            >
              Explore All Rewards
            </Text>
          </View>
        </View>
      ) : (
        <View className="flex items-center justify-center h-56">
          <Loading fill="#ff735c" height="h-10" width="w-10" />
        </View>
      )}
      <PrizesModal isOpen={isOpen} setIsOpen={setIsOpen} prizes={prizes} />
    </>
  );
};

export default BadgesContainer;
